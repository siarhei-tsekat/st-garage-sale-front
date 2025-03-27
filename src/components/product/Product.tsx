import { FaExclamationTriangle } from "react-icons/fa";
import { useAllUseProducts } from "../../service/useProductMutation";
import Loader from "../shared/Loader";
import ProductCard from "./ProductCard";

const Products = () => {
  const { data: products, isLoading, error } = useAllUseProducts();

  return (
    <div className="w-full h-[calc(100vh-4rem)] m-0 p-0 overflow-auto bg-gray-800">
      <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
        {/* <Filter categories={categories ? categories : []}/> */}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="flex justify-center items-center h-[200px]">
            <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
            <span className="text-slate-800 text-lg font-medium">{error.message}</span>
          </div>
        ) : (
          <div className="min-h-[700px]">
            <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
              {products && products.map((item, i) => <ProductCard key={i} productId={item.productId.toString()} description={item.description} images={item.images} price={item.price} productName={item.productName} quantity={item.quantity} />)}
            </div>
            {/* <div className="flex justify-center pt-10">
                        <Paginations 
                            numberOfPage = {pagination?.totalPages}
                            totalProducts = {pagination?.totalElements}/>
                    </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
