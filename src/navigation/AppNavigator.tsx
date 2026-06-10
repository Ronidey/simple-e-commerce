import { BrowserRouter, Route, Routes } from "react-router";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";

export default function AppNavigator() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
