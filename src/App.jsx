import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import BarbersPage from './pages/BarbersPage.jsx';
import BranchesPage from './pages/BranchesPage.jsx';
import PromotionsPage from './pages/PromotionsPage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import ClientAreaPage from './pages/ClientAreaPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import LoginPage from './pages/LoginPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/servicios" element={<ServicesPage />} />
            <Route path="/barberos" element={<BarbersPage />} />
            <Route path="/sucursales" element={<BranchesPage />} />
            <Route path="/promociones" element={<PromotionsPage />} />
            <Route path="/agendamiento" element={<BookingPage />} />
            <Route path="/clientes" element={<ClientAreaPage />} />
            <Route path="/administracion" element={<AdminPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
