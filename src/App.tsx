import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from './components/Footer/Footer';

// import Home from './pages/Home/Home';
// import ServiceDetail from './pages/ServiceDetail/ServiceDetail';
// import Cart from './pages/Cart/Cart';
// import Orders from './pages/Orders/Orders';
// import Login from './pages/Login/Login';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/service/:id" element={<ServiceDetail />} /> */}
          {/* <Route path="/cart" element={<Cart />} /> */}
          {/* <Route path="/orders" element={<Orders />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
