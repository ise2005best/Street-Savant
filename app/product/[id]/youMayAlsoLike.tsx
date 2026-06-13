import ProductCard from "@/app/components/product-card";
import { Products } from "@/app/lib/interfaces/products.interface";

interface Props {
  products: Products;
}

const YouMayAlsoLike = ({ products }: Props) => {
  return (
    <div className="max-w-md px-6 py-12 ">
      <div className="md:py-4 py-2 px-3 text-black md:text-base text-xs  w-fit font-secondary font-bold tracking-wide uppercase">
       OTHER PRODUCTS
      </div>

      <div className="w-full">
        {" "}
        {/* control card width */}
        <ProductCard product={products} cursor={products.node.id} />
      </div>
    </div>
  );
};

export default YouMayAlsoLike;
