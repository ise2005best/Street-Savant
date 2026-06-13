import { NextRequest, NextResponse } from "next/server";

interface Item {
  VariantId: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); 
    const items: Item[] = body.items;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }


    const invalidItems = items.filter(
      (item: Item) => !item.VariantId || !item.quantity
    );
    if (invalidItems.length > 0) {
      return NextResponse.json(
        { error: "Missing required fields for some items" },
        { status: 400 }
      );
    }

    const shopifyStore = process.env.SHOPIFY_STORE;
    // Build item string for URL
    const queryItems = (items: { VariantId: string; quantity: number }[]) => {
        return items
          .map((item) => {
            const id = item.VariantId.split('/').pop(); // Extract numeric ID
            return `items[][id]=${id}&items[][quantity]=${item.quantity}`;
          })
          .join('&');
      };
      
    const queryString = queryItems(items);

    // Encode the cart add URL and redirect to checkout
    const returnTo = encodeURIComponent(
      `/cart/add?${queryString}&return_to=/checkout`
    );
    const fullUrl = `https://${shopifyStore}.myshopify.com/cart/clear?return_to=${returnTo}`;

    return NextResponse.json({ checkoutUrl: fullUrl }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate checkout URL" },
      { status: 500 }
    );
  }
}
