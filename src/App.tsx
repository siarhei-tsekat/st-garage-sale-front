import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import LogIn from "./components/auth/Login";
import { Toaster } from "react-hot-toast";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import Products from "./components/product/Product";
import UserProductsPage from "./components/product/UserProductsPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/me/products/" element={<UserProductsPage />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/" element={<PrivateRoute publicPage />}>
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
      <Toaster position="top-center" />
    </Router>
  );
}

export default App;
