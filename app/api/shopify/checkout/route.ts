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

    // Cart permalink format: /cart/VARIANT_ID:QTY,VARIANT_ID:QTY
    // This is universally supported by Shopify as a GET URL (unlike items[][] which is POST-only)
    const cartPermalink = items
      .map((item) => {
        const id = item.VariantId.split("/").pop();
        return `${id}:${item.quantity}`;
      })
      .join(",");

    const fullUrl = `https://${shopifyStore}.myshopify.com/cart/${cartPermalink}`;

    return NextResponse.json({ checkoutUrl: fullUrl }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate checkout URL" },
      { status: 500 }
    );
  }
}
