import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import LoadingSpinner from './components/ui/LoadingSpinner';
import SplashScreen from './components/ui/SplashScreen';

// Lazy load pages
const AuthPage           = lazy(() => import('./pages/AuthPage'));
const OnboardingPage     = lazy(() => import('./pages/OnboardingPage'));
const DashboardPage      = lazy(() => import('./pages/DashboardPage'));
const AddProductPage     = lazy(() => import('./pages/AddProductPage'));
const EditProductPage    = lazy(() => import('./pages/EditProductPage'));
const OrdersPage         = lazy(() => import('./pages/OrdersPage'));
const SettingsPage       = lazy(() => import('./pages/SettingsPage'));
const PricingPage        = lazy(() => import('./pages/PricingPage'));
const AdsPage            = lazy(() => import('./pages/AdsPage'));
const AdminPage          = lazy(() => import('./pages/AdminPage'));
const StorePage          = lazy(() => import('./pages/StorePage'));
const ProductDetailsPage = lazy(() => import('./pages/ProductDetailsPage'));
const NotFoundPage       = lazy(() => import('./pages/NotFoundPage'));

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Landing / Auth */}
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Public Storefront */}
        <Route path="/store/:storeSlug" element={<StorePage />} />
        <Route path="/store/:storeSlug/product/:productId" element={<ProductDetailsPage />} />

        {/* Protected Dashboard Routes */}
        <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
        <Route path="/add-product" element={<ProtectedRoute><AddProductPage /></ProtectedRoute>} />
        <Route path="/edit-product/:productId" element={<ProtectedRoute><EditProductPage /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
        <Route path="/pricing" element={<ProtectedRoute><PricingPage /></ProtectedRoute>} />
        <Route path="/advertise" element={<ProtectedRoute><AdsPage /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

        {/* 404 */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <SplashScreen />
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <AnimatedRoutes />
          </Suspense>
          <Toaster position="top-center" reverseOrder={false} />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
