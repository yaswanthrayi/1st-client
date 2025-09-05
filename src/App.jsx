import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Projects from "./pages/Projects";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

function Layout({ children }) {
  const location = useLocation();

  // List of paths where we DON'T want navbar/footer
  const noLayoutPaths = ["/admin-login", "/admin-dashboard"];

  const hideLayout = noLayoutPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen w-full">
      {!hideLayout && <Navbar />}
      <main className="flex-grow w-full">{children}</main>
      {!hideLayout && <Footer />}
      {!hideLayout && <WhatsAppButton />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route 
              path="/admin-dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
