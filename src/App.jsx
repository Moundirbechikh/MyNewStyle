import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import LoadingScreen from "./components/Loadingscreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ShopByCategory from "./components/ShopByCategory";
import ShopSection from "./components/ShopSection";
import WhyUs from "./components/WhyUs";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import Profile from "./pages/Profile";
import CartPage from "./pages/CartPage";
import Favorites from "./pages/Favorites";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Admindashboard";
import AdminProducts from "./pages/admin/Adminproducts";
import AdminOrders from "./pages/admin/Adminorders";
import AdminReviews from "./pages/admin/Adminreviews";
import AdminGuide from "./pages/admin/Adminguide";

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

function PageFade({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function AppShell() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/verify-email' ||
    location.pathname.startsWith('/admin');

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className={hideNavbar && location.pathname.startsWith('/admin') ? '' : 'min-h-screen bg-[#f5f2eb]'}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<ShopSection />} />
            <Route path="/login" element={<PageFade><Login /></PageFade>} />
            <Route path="/register" element={<PageFade><Register /></PageFade>} />
            <Route path="/verify-email" element={<PageFade><VerifyEmail /></PageFade>} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <PageFade><Profile /></PageFade>
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <PageFade><CartPage /></PageFade>
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <PageFade><Favorites /></PageFade>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="guide" element={<AdminGuide />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </main>
    </>
  );
}

function App() {
  return (
    // LoadingScreen enveloppe TOUT : rien ne se monte (ni les contextes,
    // ni leurs appels API) tant que le backend n'a pas confirmé être réveillé.
    <LoadingScreen>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <Router>
              <AppShell />
            </Router>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </LoadingScreen>
  );
}

export default App;