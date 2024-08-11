import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/Blog/detail";
import Page404 from "./pages/404";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
/* import Register from "./pages/Register"; */
import CartProvider from "./providers/Cart";
import SiteProvider from "./providers/Site";
import ServiceProvider from "./providers/Service";
import ProductDetail from "./pages/Product/detail";
import Product from "./pages/Product";
import AuthProvider from "./providers/Auth";
import SecretProduct from "./pages/Secret/Product";
import SecretProductAdd from "./pages/Secret/Product/add";
import SecretPost from "./pages/Secret/Post";
import SecretPostAdd from "./pages/Secret/Post/add";
import SecretProductUpdate from "./pages/Secret/Product/update";
import SecretPostUpdate from "./pages/Secret/Post/update";

function App() {
  return (
    <Router>
      <SiteProvider>
        <AuthProvider>
          <ServiceProvider>
            <CartProvider>
              <Routes>
                <Route path="" element={<Home />} />

                <Route
                  path="blog/*"
                  element={
                    <Routes>
                      <Route path="" element={<Blog />} />
                      <Route path=":uuid" element={<BlogDetail />} />
                      <Route path="*" element={<Page404 />} />
                    </Routes>
                  }
                />

                <Route
                  path="training/*"
                  element={
                    <Routes>
                      <Route path="" element={<Product />} />
                      <Route path=":uuid" element={<ProductDetail />} />
                      <Route path="*" element={<Page404 />} />
                    </Routes>
                  }
                />

                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="login" element={<Login />} />
                {/* <Route path="register" element={<Register />} /> */}

                <Route
                  path="s/*"
                  element={
                    <Routes>
                      <Route
                        path="training/*"
                        element={
                          <Routes>
                            <Route path="" element={<SecretProduct />} />
                            <Route path="add" element={<SecretProductAdd />} />
                            <Route
                              path="update/:uuid"
                              element={<SecretProductUpdate />}
                            />
                            <Route path="*" element={<Page404 />} />
                          </Routes>
                        }
                      />
                      <Route
                        path="post/*"
                        element={
                          <Routes>
                            <Route path="" element={<SecretPost />} />
                            <Route path="add" element={<SecretPostAdd />} />
                            <Route
                              path="update/:uuid"
                              element={<SecretPostUpdate />}
                            />
                            <Route path="*" element={<Page404 />} />
                          </Routes>
                        }
                      />
                      <Route path="*" element={<Page404 />} />
                    </Routes>
                  }
                />
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
