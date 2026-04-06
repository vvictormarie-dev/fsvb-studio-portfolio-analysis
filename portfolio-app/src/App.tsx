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
import FormulairePréSession from './components/FormulairePréSession';
import { LandingSolo } from './templates/landing-solo/LandingSolo';
import { Restaurant } from './templates/restaurant/Restaurant';
import { Coach } from './templates/coach/Coach';
import { CrispChat } from './services/crispService';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isFormRoute = location.pathname.startsWith('/form') || location.pathname.startsWith('/formulaire');

  return (
    <>
      {!isAdminRoute && !isFormRoute && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/services" element={<Navigate to="/solutions" replace />} />
        <Route path="/templates" element={<Navigate to="/solutions" replace />} />
        <Route path="/form/:templateType/:sessionId" element={<FormulairePréSession />} />
        <Route path="/formulaire/:templateType/:sessionId" element={<FormulairePréSession />} />
        <Route path="/form/:templateType" element={<FormulairePréSession />} />
        <Route path="/formulaire/:templateType" element={<FormulairePréSession />} />
        <Route path="/configurator" element={<ConfiguratorPage />} />
        <Route path="/configurator/session/:sessionId" element={<ConfiguratorPage />} />
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
        <Route path="/admin/forms" element={<AdminDashboard />} />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      </Routes>
      {!isAdminRoute && !isFormRoute && <Footer />}
      
      {/* Widget Crisp Chat avec couleurs FSVB Studio */}
      <CrispChat
        websiteId="20f8048e-dafb-4787-aaf5-d4f78e2d77b8"
        userTokenId="fsvb-user-session"
      />
    </>
  );
}

export default App;
