import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Products from "@/pages/Products";
import Services from "@/pages/Services";
import Installations from "@/pages/Installations";
import Clients from "@/pages/Clients";
import Contact from "@/pages/Contact";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/installations" element={<Installations />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <AnimatedRoutes />
        <Footer />
        <FloatingButtons />
      </BrowserRouter>
    </div>
  );
}

export default App;
