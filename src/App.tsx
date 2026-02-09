import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import BoardPage from './pages/BoardPage';
import SponsorsPage from './pages/SponsorsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import DonatePage from './pages/DonatePage';

// Portal Pages
import FamilyPortal from './pages/portals/FamilyPortal';
import StaffPortal from './pages/portals/StaffPortal';
import AdminPortal from './pages/portals/AdminPortal';
import LoginPage from './pages/LoginPage';

// Forms
import FamilySupportForm from './pages/forms/FamilySupportForm';
import EmergencyAssistanceForm from './pages/forms/EmergencyAssistanceForm';
import VolunteerForm from './pages/forms/VolunteerForm';
import SponsorInquiryForm from './pages/forms/SponsorInquiryForm';

// Hidden Pages (Future Use) - Uncomment to enable
// import RentalListingsPage from './pages/RentalListingsPage';
// import PropertyDonationPage from './pages/PropertyDonationPage';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// FEATURE FLAGS - Change to true to enable hidden pages
// const ENABLE_RENTAL_LISTINGS = false;
// const ENABLE_PROPERTY_DONATION = false;

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* WARM COLOR SCHEME: Change bg-[#FDF8F5] to any of these warm options:
            - bg-[#FDF8F5] - Soft cream blush (current - warm & family-friendly)
            - bg-[#FFF9F5] - Warm ivory
            - bg-[#FDF6F0] - Peach cream
            - bg-[#FAF5F0] - Warm linen
        */}
        <div className="min-h-screen bg-[#FDF8F5]">
          <div className="grain-overlay" />
          <Navbar />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/programs" element={<ProgramsPage />} />
              <Route path="/board" element={<BoardPage />} />
              <Route path="/sponsors" element={<SponsorsPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/donate" element={<DonatePage />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              
              {/* Portal Routes */}
              <Route path="/portal/family/*" element={<FamilyPortal />} />
              <Route path="/portal/staff/*" element={<StaffPortal />} />
              <Route path="/portal/admin/*" element={<AdminPortal />} />
              
              {/* Form Routes */}
              <Route path="/forms/family-support" element={<FamilySupportForm />} />
              <Route path="/forms/emergency-assistance" element={<EmergencyAssistanceForm />} />
              <Route path="/forms/volunteer" element={<VolunteerForm />} />
              <Route path="/forms/sponsor-inquiry" element={<SponsorInquiryForm />} />
              
              {/* HIDDEN PAGES - Uncomment below to enable when ready
              {ENABLE_RENTAL_LISTINGS && (
                <Route path="/rentals" element={<RentalListingsPage />} />
              )}
              {ENABLE_PROPERTY_DONATION && (
                <Route path="/donate-property" element={<PropertyDonationPage />} />
              )}
              */}
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
