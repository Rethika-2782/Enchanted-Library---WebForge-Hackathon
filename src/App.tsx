import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UserProvider, useUser } from "./context/UserContext";
import LandingPage from "./pages/LandingPage";
import StudentDashboard from "./pages/StudentDashboard";
import LibraryMap from "./pages/LibraryMap";
import QRCheckIn from "./pages/QRCheckIn";
import LibrarianDashboard from "./pages/LibrarianDashboard";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import LeaderboardPage from "./pages/LeaderboardPage";
import AboutPage from "./pages/AboutPage";
import Navigation from "./components/Navigation";

type Page = 'dashboard' | 'map' | 'qr' | 'librarian' | 'analytics' | 'leaderboard' | 'about';

function AppContent() {
  const { isAuthenticated } = useUser();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [hasEntered, setHasEntered] = useState(false);

  const handleEnterLibrary = () => {
    setHasEntered(true);
  };

  if (!hasEntered || !isAuthenticated) {
    return <LandingPage onEnter={handleEnterLibrary} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <StudentDashboard />;
      case 'map':
        return <LibraryMap />;
      case 'qr':
        return <QRCheckIn />;
      case 'librarian':
        return <LibrarianDashboard />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#1B1612]">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="md:ml-64 min-h-screen">
        <div className="p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}