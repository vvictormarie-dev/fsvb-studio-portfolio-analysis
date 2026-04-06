import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home.tsx';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SolutionsPage from './pages/SolutionsPage';
import ConfiguratorPage from './pages/ConfiguratorPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import ConfirmationPage from './pages/ConfirmationPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { LandingSolo } from './templates/landing-solo/LandingSolo';
import { Restaurant } from './templates/restaurant/Restaurant';
import { Coach } from './templates/coach/Coach';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/services" element={<Navigate to="/solutions" replace />} />
        <Route path="/templates" element={<Navigate to="/solutions" replace />} />
        <Route path="/configurator" element={<ConfiguratorPage />} />
        <Route path="/configurateur" element={<Navigate to="/configurator" replace />} />
        <Route path="/order/:id" element={<OrderConfirmationPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/templates/landing-solo" element={<LandingSolo />} />
        <Route path="/templates/restaurant" element={<Restaurant />} />
        <Route path="/templates/coach" element={<Coach />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
