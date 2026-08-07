import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ShopByCategory from "./components/ShopByCategory";
import WhyUs from "./components/WhyUs";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="min-h-screen bg-[#f5f2eb]">
      <Navbar />
      <div id="home"><Hero /></div>
      <div id="shop"><ShopByCategory/></div>
      <div id="new-arrivals"><WhyUs/></div> {/* Exemple d'ID */}
      <div id="about"><Reviews/></div> {/* Exemple d'ID */}
      <div id="contact"><Footer/></div> {/* Exemple d'ID */}
    </main>
  );
}

export default App;