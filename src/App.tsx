import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import AppProvider from "./store/AppProvider";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
