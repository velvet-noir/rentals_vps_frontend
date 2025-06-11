import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/Home.tsx";
import ServiceDetail from "./pages/ServiceDetail/ServiceDetail";
import Layout from "./components/Layout/Layout.tsx";
import Cart from "./pages/Cart/Cart";
import Orders from "./pages/Orders/Orders";
import Login from "./pages/Login/Login";

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
};

export default App;
