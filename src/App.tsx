import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import LogIn from "./components/auth/Login";
import Register from "./components/auth/Register";
import Products from "./components/product/Product";
import UserProductsPage from "./components/product/UserProductsPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />

          <Route path="/" element={<PrivateRoute />}>
            <Route path="/me/products/" element={<UserProductsPage />} />
          </Route>

          <Route path="/" element={<PrivateRoute publicPage />}>
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
        <Toaster position="top-center" />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
