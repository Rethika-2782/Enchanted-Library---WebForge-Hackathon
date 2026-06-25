import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";
import MagicalBook from "../components/MagicalBook";
import FloatingParticles from "../components/FloatingParticles";
import { useUser } from "../context/UserContext";

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    name: '',
    email: 'rethikas2782@gmail.com',
    password: '123456',
    house: 'Wisdom'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register, isAuthenticated } = useUser();

  const handleOpenBook = () => {
    setIsBookOpen(true);
    setTimeout(() => setShowContent(true), 600);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let result;
      if (authMode === 'login') {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(formData.name, formData.email, formData.password, formData.house);
      }

      if (result.success) {
        setTimeout(() => {
          onEnter();
        }, 500);
      } else {
        setError(result.error || 'An error occurred');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    const timer = setTimeout(onEnter, 100);
    return () => clearTimeout(timer);
  }, [isAuthenticated, onEnter]);

  const houses = ['Wisdom', 'Innovation', 'Discovery', 'Legacy'];
  const houseEmojis: Record<string, string> = {
    'Wisdom': '🦉',
    'Innovation': '💡',
    'Discovery': '🔭',
    'Legacy': '📜'
  };

  return (
    <div className="min-h-screen bg-[#1B1612] relative overflow-hidden flex items-center justify-center">
      {/* Background library atmosphere */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-[#2a1810]"
              style={{
                left: `${i * 12.5}%`,
                top: 0,
                bottom: 0,
                width: '10%',
                borderRight: '4px solid #1a0f08',
              }}
            >
              {[...Array(6)].map((_, j) => (
                <div
                  key={j}
                  className="absolute left-1 right-1 bg-gradient-to-r from-[#3d2817] to-[#2a1810] rounded-sm"
                  style={{
                    top: `${j * 16 + 2}%`,
                    height: '14%',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  <div className="absolute bottom-1 left-1 right-1 flex gap-0.5">
                    {[...Array(8 + Math.floor(Math.random() * 4))].map((_, k) => (
                      <div
                        key={k}
                        className="flex-1 rounded-t-sm"
                        style={{
                          height: `${20 + Math.random() * 30}px`,
                          background: `hsl(${Math.random() * 60 + 20}, 40%, ${20 + Math.random() * 15}%)`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-radial from-[#D4AF37]/10 via-transparent to-transparent" />
        
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)',
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <FloatingParticles />

      <div className="relative z-10 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isBookOpen ? (
            <motion.div
              key="closed-book"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center mb-12"
              >
                <h1 className="text-5xl md:text-7xl font-serif text-[#D4AF37] mb-4 tracking-wide">
                  Enchanted Library
                </h1>
                <p className="text-xl md:text-2xl text-[#EAD7B7]/80 font-light tracking-widest">
                  D E S K G U A R D &nbsp; A I
                </p>
                <div className="mt-6 flex items-center justify-center gap-2 text-[#8B5E3C]">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm tracking-wider">MAGICAL SEAT MANAGEMENT</span>
                  <Sparkles className="w-5 h-5" />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
                onClick={handleOpenBook}
              >
                <MagicalBook isOpen={false} showContent={false} onOpen={() => {}}>
                  <div />
                </MagicalBook>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenBook}
                className="mt-12 px-10 py-4 bg-gradient-to-r from-[#D4AF37] via-[#c9a030] to-[#D4AF37] text-[#1B1612] font-semibold text-lg rounded-lg shadow-lg shadow-[#D4AF37]/20 flex items-center gap-3 hover:shadow-xl hover:shadow-[#D4AF37]/30 transition-all"
              >
                <BookOpen className="w-6 h-6" />
                Open The Book
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 text-[#EAD7B7]/50 text-sm"
              >
                Click the book or button to begin your journey
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="open-book"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <MagicalBook isOpen={isBookOpen} showContent={showContent} onOpen={() => {}}>
                <div className="p-6 md:p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-serif text-[#8B5E3C] mb-2">
                        {authMode === 'login' ? 'Welcome Back, Scholar' : 'Begin Your Journey'}
                      </h2>
                      <p className="text-[#8B5E3C]/70 text-sm">
                        {authMode === 'login' 
                          ? 'Enter your credentials to access the library' 
                          : 'Register to join the enchanted library'}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {authMode === 'register' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-4"
                        >
                          <div>
                            <label className="block text-[#8B5E3C] text-sm mb-1">Your Name</label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full px-4 py-2 bg-[#F5E9D3]/50 border border-[#8B5E3C]/30 rounded-lg text-[#1B1612] placeholder-[#8B5E3C]/50 focus:outline-none focus:border-[#D4AF37]"
                              placeholder="Enter your name"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-[#8B5E3C] text-sm mb-1">Choose Your House</label>
                            <div className="grid grid-cols-2 gap-2">
                              {houses.map((house) => (
                                <button
                                  key={house}
                                  type="button"
                                  onClick={() => setFormData({ ...formData, house })}
                                  className={`p-2 rounded-lg border-2 text-sm flex items-center justify-center gap-2 transition-all ${
                                    formData.house === house
                                      ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#8B5E3C]'
                                      : 'border-[#8B5E3C]/30 text-[#8B5E3C]/70 hover:border-[#8B5E3C]/50'
                                  }`}
                                >
                                  <span>{houseEmojis[house]}</span>
                                  <span>{house}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div>
                        <label className="block text-[#8B5E3C] text-sm mb-1">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2 bg-[#F5E9D3]/50 border border-[#8B5E3C]/30 rounded-lg text-[#1B1612] placeholder-[#8B5E3C]/50 focus:outline-none focus:border-[#D4AF37]"
                          placeholder="scholar@enchanted.library"
                        />
                      </div>

                      <div>
                        <label className="block text-[#8B5E3C] text-sm mb-1">Password</label>
                        <input
                          type="password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="w-full px-4 py-2 bg-[#F5E9D3]/50 border border-[#8B5E3C]/30 rounded-lg text-[#1B1612] placeholder-[#8B5E3C]/50 focus:outline-none focus:border-[#D4AF37]"
                          placeholder="Enter your password"
                        />
                      </div>

                      {error && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-600 text-sm text-center"
                        >
                          {error}
                        </motion.p>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#c9a030] text-[#1B1612] font-semibold rounded-lg hover:from-[#c9a030] hover:to-[#D4AF37] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-[#1B1612] border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" />
                            {authMode === 'login' ? 'Enter the Library' : 'Begin Journey'}
                          </>
                        )}
                      </button>
                    </form>

                    <div className="text-center pt-4 border-t border-[#8B5E3C]/20">
                      <p className="text-[#8B5E3C]/70 text-sm">
                        {authMode === 'login' ? "New to the library?" : "Already have an account?"}
                      </p>
                      <button
                        onClick={() => {
                          setAuthMode(authMode === 'login' ? 'register' : 'login');
                          setError('');
                        }}
                        className="text-[#D4AF37] font-medium text-sm hover:underline mt-1"
                      >
                        {authMode === 'login' ? 'Create an account' : 'Sign in instead'}
                      </button>
                    </div>
                  </motion.div>
                </div>
              </MagicalBook>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}