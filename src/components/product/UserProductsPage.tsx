import AddProductForm from "./AddProductForm";

interface Product {
  id: number;
  name: string;
  description: string;
}

const products: Product[] = [
  { id: 1, name: "Product A", description: "This is the description for Product A." },
  { id: 2, name: "Product B", description: "This is the description for Product B." },
  { id: 3, name: "Product C", description: "This is the description for Product C." },
];

const UserProductsPage = () => {
  return (
    <div className="flex justify-items-stretch overflow-hidden min-h-[calc(100vh-64px)] ">
      <div className="flex w-full bg-gray-800 overflow-hidden">
        <div className="w-1/3 bg-gray-800 p-4 border-r border-gray-700">
          <h2 className="text-xl text-slate-200 font-bold mb-4 flex justify-center">Products</h2>
          <ul>
            {products.map((product) => (
              <li key={product.id} className="mb-4 p-2 bg-gray-700 shadow rounded-lg">
                <h3 className="text-lg text-slate-200 font-semibold">{product.name}</h3>
                <p className="text-slate-200">{product.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-2/3">
          <AddProductForm />
        </div>
      </div>
    </div>
  );
};

export default UserProductsPage;
