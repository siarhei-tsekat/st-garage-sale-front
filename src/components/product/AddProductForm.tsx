import { Button, IconButton } from "@mui/material";
import { Upload, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateProduct } from "../../service/useProductMutation";
import InputField from "../shared/InputField";

interface IFormInput {
  productname: string;
  description: string;
  price: string;
  specialPrice: string;
  quantity: string;
}

const AddProductForm: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);

  const createProduct = useCreateProduct(() => successCallback());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({ mode: "onTouched" });

  const successCallback = () => {
    reset();
    setImages([]);
  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files).slice(0, 5 - images.length);
      setImages((prev) => [...prev, ...selectedFiles]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: IFormInput) => {
    createProduct.mutate({ productName: data.productname, description: data.description, price: data.price, quantity: data.quantity, images: images });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 m-12 bg-gray-700 shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-slate-300 flex justify-center">Add Product</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <InputField label="Product Name" required id="productname" type="text" message="Product Name is required" placeholder="Enter your product name" register={register} errors={errors} />
        <InputField label="Description" required id="description" type="text" message="Description is required" placeholder="Enter your description" register={register} errors={errors} />
        <InputField label="Price" required id="price" type="number" message="Price is required" placeholder="Enter your price" register={register} errors={errors} defaultValue="0" />
        <InputField label="Quantity" required id="quantity" type="number" message="Quantity is required" placeholder="Enter your quantity" register={register} errors={errors} defaultValue="1" />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Upload Images (up to 5)</label>
          <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg flex flex-col items-center">
            <Upload className="w-10 h-10 text-gray-500" />
            <input type="file" multiple accept="image/*" className="hidden" id="imageUpload" onChange={handleImageUpload} />
            <label htmlFor="imageUpload" className="mt-2 cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg text-sm">
              Select Images
            </label>
          </div>
          <div className="grid grid-cols-5 gap-2 mt-2 pb-5">
            {images.map((image, index) => (
              <div key={index} className="relative w-16 h-16">
                <img src={URL.createObjectURL(image)} alt="preview" className="w-full h-full object-cover rounded" />
                <IconButton size="small" className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full" onClick={() => handleRemoveImage(index)}>
                  <X size={12} />
                </IconButton>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </div>
  );
};
export default AddProductForm;
