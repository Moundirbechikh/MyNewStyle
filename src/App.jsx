import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ShopByCategory from "./components/ShopByCategory";
import ShopSection from "./components/ShopSection";
import WhyUs from "./components/WhyUs";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";

function Home() {
  return (
    <>
      <div id="home"><Hero /></div>
      <div id="categories"><ShopByCategory /></div>
      <div id="new-arrivals"><WhyUs /></div>
      <div id="about"><Reviews /></div>
      <div id="contact"><Footer /></div>
    </>
  );
}

function App() {
  return (
    <Router>
      {/* Navbar est placé À L'INTÉRIEUR de Router mais HORS de Routes */}
      <Navbar /> 
      <main className="min-h-screen bg-[#f5f2eb]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopSection />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;