import { FaShoppingCart } from "react-icons/fa";
import truncateText from "../utils";
import ProductViewModal from "./ProductViewModal";
import { useState } from "react";

export interface Product {
  productId: string;
  productName: string;
  description: string;
  price: number;
  specialPrice?: number;
  quantity: number;
  images: string[];
}

interface ProductCardParams {
  productId: string;
  productName: string;
  description: string;
  price: number;
  specialPrice?: number;
  quantity: number;
  images: string[];
  about?: boolean;
}

const ProductCard = ({ productId, productName, images, description, price, specialPrice, quantity, about = false }: ProductCardParams) => {
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const [selectedViewProduct, setSelectedViewProduct] = useState<Product | null>(null);
  const isAvailable: boolean = quantity && Number(quantity) > 0 || false;
  const btnLoader = false;

  const handleProductView = (product: any) => {
    if (!about) {
      setSelectedViewProduct(product);
      setOpenProductViewModal(true);
    }
  };
  return (
    <div className="border rounded-lg shadow-xl  border-gray-500 overflow-hidden transition-shadow duration-300">
      <div
        onClick={() => {
          handleProductView({
            id: productId,
            productName,
            images,
            description,
            quantity,
            price,
            specialPrice,
          });
        }}
        className="w-full overflow-hidden aspect-[3/2]"
      >
        <img className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105" src={`data:image/png;base64;${images[0]}`} alt={productName}></img>
      </div>
      <div className="p-4">
        <h2 onClick={() => {}} className="text-lg font-semibold mb-2 cursor-pointer text-gray-200">
          {truncateText(productName, 50)}
        </h2>

        <div className="min-h-20 max-h-20">
          <p className="text-gray-400 text-sm">{truncateText(description, 80)}</p>
        </div>

        {!about && (
          <div className="flex items-center justify-between">
            {specialPrice ? (
              <div className="flex flex-col">
                <span className="text-gray-100 line-through">${Number(price).toFixed(2)}</span>
                <span className="text-xl font-bold text-slate-300">${Number(specialPrice).toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-xl font-bold text-slate-300">
                {"  "}${Number(price).toFixed(2)}
              </span>
            )}

            <button
              disabled={!isAvailable || btnLoader}
              onClick={() => {}}
              className={`bg-cyan-600 ${isAvailable ? "opacity-100 hover:bg-cyan-500" : "opacity-50"}
                    text-gray-200 py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center`}
            >
              <FaShoppingCart className="mr-2" />
              {isAvailable ? "Add to Cart" : "Stock Out"}
            </button>
          </div>
        )}
      </div>
      {selectedViewProduct && <ProductViewModal open={openProductViewModal} setOpen={setOpenProductViewModal} product={selectedViewProduct} isAvailable={isAvailable}/>}
    </div>
  );
};

export default ProductCard;
