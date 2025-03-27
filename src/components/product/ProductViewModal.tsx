import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { Divider } from "@mui/material";
import { MdClose, MdDone } from "react-icons/md";
import Status from "../shared/Status";
import ProductImageSwiper from "./ProductImageSwiper";
import { Product } from "./ProductCard";

interface ProductViewParams {
  open: any;
  setOpen: any;
  product: Product;
  about?: boolean;
  isAvailable: boolean;
}

function ProductViewModal(params: ProductViewParams) {
  const { open, setOpen, about, isAvailable } = params;
  const { productId, productName, images, description, quantity, price, specialPrice } = params.product;
  
  const handleClickOpen = () => {
    setOpen(true);
  };



  return (
    <>
      <Dialog open={open} as="div" className="fixed inset-0 flex items-center justify-center p-4 z-50" onClose={close}>
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all min-w-[200px] max-w-[1200px] mx-auto w-full  h-auto">
              <ProductImageSwiper images={images}/>
              <div className="px-6 pt-10 pb-2">
           
                <DialogTitle as="h1" className="lg:text-3xl sm:text-2xl text-xl font-semibold leading-6 text-gray-800 mb-4">
                  {productName}
                </DialogTitle>

                <div className="space-y-2 text-gray-700 pb-4">
                  <div className="flex items-center justify-between gap-2">
                    {specialPrice ? (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 line-through">${Number(price).toFixed(2)}</span>
                        <span className="sm:text-xl font-semibold text-slate-700">${Number(specialPrice).toFixed(2)}</span>
                      </div>
                    ) : (
                      <span className="text-xl font-bold"> ${Number(price).toFixed(2)}</span>
                    )}

                    {isAvailable ? <Status text="In Stock" icon={MdDone} bg="bg-teal-200" color="text-teal-900" /> : <Status text="Out-Of-Stock" icon={MdClose} bg="bg-rose-200" color="text-rose-700" />}
                  </div>

                  <Divider />

                  <p>{description}</p>
                </div>
              </div>

              <div className="px-6 py-4 flex justify-end gap-4">
          
                <button onClick={() => setOpen(false)} type="button" className="px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-700 hover:text-slate-800 hover:border-slate-800 rounded-md ">
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default ProductViewModal;
