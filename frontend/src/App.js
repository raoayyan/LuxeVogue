import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Switch,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/NavBar";
import Cart from "./components/Cart";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import CheckoutSuccess from "./components/CheckOutSuccess";
import Dashboard from "./components/admin/Dashboard";
import Summary from "./components/admin/Summary";

import Products from "./components/admin/Products";
import CreateProduct from "./components/admin/CreareProduct";
import ProductList from "./components/admin/list/ProductList";
import Users from "./components/admin/Users";
import Orders from "./components/admin/Order";
import Product from "./components/details/Products";
import Order from "./components/details/Order";
import UserProfile from "./components/details/IserProfile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/checkout-success" element={<CheckoutSuccess />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path="/order/:id" element={<Order />}></Route>
          <Route path="/user/:id" element={<UserProfile />}></Route>
          <Route path="/admin" element={<Dashboard />}>
            <Route path="products" element={<Products />}>
              <Route index element={<ProductList />} />
              <Route path="create-product" element={<CreateProduct />} />
            </Route>
            <Route path="summary" element={<Summary />} />
            <Route path="users" element={< Users/>} />
            <Route path="orders" element={<Orders />} />
          </Route>
          <Route path="/not-found" element={<NotFound />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
//inside switch routes are places like most specific to less specific one.
export default App;
