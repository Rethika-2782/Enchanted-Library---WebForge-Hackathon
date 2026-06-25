import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Map, 
  QrCode, 
  Settings, 
  BarChart3, 
  Trophy, 
  Info,
  LogOut,
  User,
  BookOpen,
  Menu,
  X
} from "lucide-react";
import { useUser } from "../context/UserContext";

type NavigationPage = 'dashboard' | 'map' | 'qr' | 'librarian' | 'analytics' | 'leaderboard' | 'about';

interface NavigationProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
}

const navItems: { id: NavigationPage; label: string; icon: typeof Home }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'map', label: 'Library Map', icon: Map },
  { id: 'qr', label: 'QR Check-In', icon: QrCode },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'librarian', label: 'Librarian', icon: Settings },
  { id: 'about', label: 'About', icon: Info },
];

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const { user, logout } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const houseColors: Record<string, string> = {
    'Wisdom': 'from-blue-500 to-blue-700',
    'Innovation': 'from-purple-500 to-purple-700',
    'Discovery': 'from-green-500 to-green-700',
    'Legacy': 'from-amber-500 to-amber-700',
  };

  const houseEmojis: Record<string, string> = {
    'Wisdom': '🦉',
    'Innovation': '💡',
    'Discovery': '🔭',
    'Legacy': '📜',
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#2a2018] border-b border-[#8B5E3C]/30 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#D4AF37]"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#D4AF37]" />
            <span className="font-serif text-[#D4AF37]">Enchanted Library</span>
          </div>
          
          <div className="w-10" />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-40 bg-[#1B1612]/95 pt-16"
          >
            <nav className="p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <motion.button
                    key={item.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30'
                        : 'text-[#EAD7B7]/70 hover:bg-[#8B5E3C]/20'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
              
              <div className="pt-4 border-t border-[#8B5E3C]/30">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-[#2a2018] border-r border-[#8B5E3C]/30 flex-col z-50">
        {/* Logo */}
        <div className="p-6 border-b border-[#8B5E3C]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#8B6914] rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-[#1B1612]" />
            </div>
            <div>
              <h1 className="font-serif text-[#D4AF37] text-lg">Enchanted</h1>
              <p className="text-[#EAD7B7]/60 text-xs">Library</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30'
                    : 'text-[#EAD7B7]/70 hover:bg-[#8B5E3C]/20 hover:text-[#F5E9D3]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-[#8B5E3C]/30">
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-[#1B1612] hover:bg-[#1B1612]/80 transition-all"
            >
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${houseColors[user?.house || 'Wisdom']} flex items-center justify-center text-white font-bold`}>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex-1 text-left">
                <p className="text-[#F5E9D3] font-medium text-sm truncate">{user?.name || 'User'}</p>
                <p className="text-[#EAD7B7]/60 text-xs flex items-center gap-1">
                  <span>{houseEmojis[user?.house || 'Wisdom']}</span>
                  <span>{user?.house}</span>
                </p>
              </div>
              <div className="text-[#D4AF37] text-sm font-bold">
                {user?.points || 0}
              </div>
            </button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full left-0 right-0 mb-2 bg-[#1B1612] border border-[#8B5E3C]/30 rounded-lg overflow-hidden shadow-xl"
                >
                  <div className="p-3 border-b border-[#8B5E3C]/30">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-[#F5E9D3] text-sm">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Trophy className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-[#F5E9D3] text-sm">{user?.points} points</span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </aside>
    </>
  );
}