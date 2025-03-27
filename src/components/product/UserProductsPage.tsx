import { FaExclamationTriangle } from "react-icons/fa";
import { useAllUseProducts } from "../../service/useProductMutation";
import Loader from "../shared/Loader";
import AddProductForm from "./AddProductForm";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import ListProductPagination from "./ListProductPagination";
import { MdModeEdit } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../service/productservice";


const UserProductsPage = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const { data: products, isLoading, error, refetch } = useAllUseProducts();

  const totalPages = products ? Math.ceil(products.length / itemsPerPage) : 0;

  const displayedProducts = products ? products.slice((page - 1) * itemsPerPage, page * itemsPerPage) : [];

  useEffect(() => {
    refetch();
  }, []);

  const mutation = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error('Error deleting product:', error);
    },
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div className="flex justify-items-stretch overflow-hidden min-h-[calc(100vh-64px)] ">
      <div className="flex w-full bg-gray-800 overflow-hidden">
        <div className="w-1/3 bg-gray-800 p-4 border-r border-gray-700">
          <h2 className="text-xl text-slate-200 font-bold mb-4 flex justify-center">Products I'm selling</h2>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className="flex justify-center items-center h-[200px]">
              <FaExclamationTriangle className="text-red-400 text-3xl mr-2" />
              <span className="text-slate-200 text-lg font-medium">{error.message}</span>
            </div>
          ) : (
            <div className="w-full space-y-4 border p-2 rounded-lg border-gray-700 flex flex-col">
              <ul>
                {displayedProducts &&
                  displayedProducts.map((product) => (
                    <li key={product.productId} className="mb-4 p-2 bg-gray-700 shadow rounded-lg flex justify-between">
                      <div className="">
                        <h3 className="text-lg text-slate-200 font-semibold">{product.productName}</h3>
                        <p className="text-slate-200">{product.description}</p>
                      </div>
                      <div className="flex justify-end">
                      <button onClick={() => {}} className="text-gray-200 hover:text-gray-400 px-3 py-1">
                          <MdModeEdit size={24} />
                        </button>
                        <button onClick={() => mutation.mutate(product.productId)} className="text-red-200 hover:text-red-400 px-3 py-1">
                          <RiDeleteBin6Line size={24} />
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
              <div className="flex justify-center pt-10">
                <ListProductPagination numberOfPage={totalPages} page={page} handleChange={handleChange} totalProducts={products?.length || 0} />
              </div>
            </div>
          )}
        </div>
        <div className="w-2/3">
          <AddProductForm onProductAddedListener={refetch} />
        </div>
      </div>
    </div>
  );
};

export default UserProductsPage;
