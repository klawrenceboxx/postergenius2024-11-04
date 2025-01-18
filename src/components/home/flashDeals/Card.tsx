import Link from "next/link";
import { MdFlashOn } from "react-icons/md";

interface product {
  link: string;
  image: string;
  discount: number;
  price: number;
  sold: number;
}

interface FlashCardProps {
  product: product;
}

const FlashCard: React.FC<FlashCardProps> = ({ product }) => {
  const discountedPrice = (
    product.price -
    product.price * (product.discount / 100)
  ).toFixed(2);
  const originalPrice = product.price.toFixed(2);

  return (
    <div className="bg-white text-gray-900 rounded shadow p-3 hover:shadow-lg transition duration-300">
      <div>
        <Link href={product.link}>
          <img src={product.image} alt="" className="w-full" />
        </Link>
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-yellow-500 text-white px-2 py-1 text-sm rounded">
          <MdFlashOn />
          <span className="font-bold">-{product.discount}%</span>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-1">
        <span className="text-lg font-semibold text-yellow-600">
          USD {discountedPrice}
        </span>
        <span className="text-sm line-through text-gray-400">
          USD {originalPrice}
        </span>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        {" "}
        {product.sold} sold
        <div className="bg-red-500 h-2" style={{ width: `${product.sold}%` }} />
      </div>
    </div>
  );
};

export default FlashCard;
