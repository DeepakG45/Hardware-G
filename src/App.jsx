import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Profile from "./Auth/Profile";
import PrivateRoute from "./Auth/PrivateRoute";
import { AuthProvider } from "./utils/AuthContext";
import ProductMouse from "./Components/Prouduct/ProductMouse";
import ProductDetail from "./Components/Detail/ProductDetail";
import ProductKeyboard from "./Components/Prouduct/ProductKeyboard";
import ProductCase from "./Components/Prouduct/ProductCase";
import ProductMousepad from "./Components/Prouduct/ProductMonitor";
import Cart from "./Components/Cart";
import { CartProvider } from "./utils/CartContext";
import KeyboardDetail from "./Components/Detail/KeyboardDetail";
import CaseDetail from "./Components/Detail/CaseDetail";
import ProductMonitor from "./Components/Prouduct/ProductMonitor";
import MonitorDetail from "./Components/Detail/MonitorDetail";
import ProductVideocard from "./Components/Prouduct/ProductVideocard";
import VideoCardDetail from "./Components/Detail/VideoCardDetail";
import ProductHeadpone from "./Components/Prouduct/ProductHeadpone";
import HeadphoneDetail from "./Components/Detail/HeadphoneDetail";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Public Routes */}
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="Product/Mouse" element={<ProductMouse />} />
      <Route path="Product/Keyboard" element={<ProductKeyboard />} />
      <Route path="Product/Case" element={<ProductCase />} />
      <Route path="Product/Monitor" element={<ProductMonitor />} />
      <Route path="Product/VideoCard" element={<ProductVideocard />} />
      <Route path="/Product/Headphones" element={<ProductHeadpone />} />

      <Route path="/product/:productId" element={<ProductDetail/>}/>
      <Route path="/KeyBord/:productId" element={<KeyboardDetail/>}/>
      <Route path="/case/:productId" element={<CaseDetail/>}/>
      <Route path="/Monitor/:productId" element={<MonitorDetail/>}/>
      <Route path="/VideoCard/:productId" element={<VideoCardDetail/>}/>
      <Route path="/Headphones/:productId" element={<HeadphoneDetail/>}/>

      

      <Route path="Cart" element={<Cart/>}/>
      

      {/* Protected Route for Profile */}
      <Route
        path="profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </Route>
  )
);

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
