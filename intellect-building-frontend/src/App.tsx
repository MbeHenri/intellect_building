import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/Blog/detail";
import Page404 from "./pages/404";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartProvider from "./providers/Cart";
import SiteProvider from "./providers/Site";
import ServiceProvider from "./providers/Service";
import ProductDetail from "./pages/Product/detail";
import Product from "./pages/Product";
import AuthProvider from "./providers/Auth";

function App() {
  return (
    <Router>
      <SiteProvider>
        <AuthProvider>
          <ServiceProvider>
            <CartProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:uuid" element={<BlogDetail />} />
                <Route path="/training" element={<Product />} />
                <Route path="/training/:uuid" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Page404 />} />
              </Routes>
            </CartProvider>
          </ServiceProvider>
        </AuthProvider>
      </SiteProvider>
    </Router>
  );
}

export default App;
