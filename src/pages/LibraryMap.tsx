import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Check, Clock, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { desks as initialDesks, Desk } from "../data/mockData";

type DeskStatus = 'available' | 'occupied' | 'away' | 'maintenance';

const statusConfig: Record<DeskStatus, { color: string; label: string; bgClass: string }> = {
  available: { color: 'bg-green-500', label: 'Available', bgClass: 'bg-green-500/20' },
  occupied: { color: 'bg-red-500', label: 'Occupied', bgClass: 'bg-red-500/20' },
  away: { color: 'bg-yellow-500', label: 'Away', bgClass: 'bg-yellow-500/20' },
  maintenance: { color: 'bg-gray-500', label: 'Maintenance', bgClass: 'bg-gray-500/20' },
};

export default function LibraryMap() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDesk, setSelectedDesk] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<DeskStatus | 'all'>('all');
  const [desks, setDesks] = useState<Desk[]>(initialDesks);
  const [showSuccess, setShowSuccess] = useState(false);
  const [reservedDesk, setReservedDesk] = useState<string | null>(null);

  const filteredDesks = desks.filter(desk => {
    const matchesSearch = desk.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || desk.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const desk = selectedDesk ? desks.find(d => d.id === selectedDesk) : null;

  const handleReserve = (deskId: string) => {
    setDesks(prev => prev.map(d => 
      d.id === deskId 
        ? { ...d, status: 'occupied' as DeskStatus, occupant: 'You', checkInTime: new Date() }
        : d
    ));
    setReservedDesk(deskId);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedDesk(null);
    }, 2000);
  };

  const handleRelease = (deskId: string) => {
    setDesks(prev => prev.map(d => 
      d.id === deskId 
        ? { ...d, status: 'available' as DeskStatus, occupant: undefined, checkInTime: undefined }
        : d
    ));
    setSelectedDesk(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold">Desk {reservedDesk} Reserved!</p>
              <p className="text-sm opacity-90">You have 15 minutes to check in</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-[#D4AF37]">Live Library Map</h1>
          <p className="text-[#EAD7B7]/60 mt-1">Real-time desk availability across all zones</p>
        </div>
        <div className="flex items-center gap-4">
          {Object.entries(statusConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${config.color}`} />
              <span className="text-sm text-[#EAD7B7]/80">{config.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B5E3C]" />
          <Input
            placeholder="Search desk by ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#2a2018] border-[#8B5E3C] text-[#F5E9D3]"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as DeskStatus | 'all')}
          className="px-4 py-2 bg-[#2a2018] border border-[#8B5E3C] rounded-lg text-[#F5E9D3]"
        >
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
          <option value="away">Away</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-[#2a2018] border-[#8B5E3C]/30">
            <CardHeader>
              <CardTitle className="text-[#D4AF37]">Zone View - Click a desk to select</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                {filteredDesks.map((deskItem) => (
                  <motion.button
                    key={deskItem.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDesk(deskItem.id)}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center border-2 transition-all p-1 ${
                      selectedDesk === deskItem.id
                        ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30'
                        : 'border-transparent hover:border-[#8B5E3C]/50'
                    } ${statusConfig[deskItem.status].bgClass}`}
                  >
                    <div className={`w-2 h-2 rounded-full ${statusConfig[deskItem.status].color} mb-1`} />
                    <span className="text-xs text-[#F5E9D3] font-medium truncate w-full text-center">{deskItem.id}</span>
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-[#2a2018] border-[#8B5E3C]/30">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-[#D4AF37]">Desk Details</CardTitle>
              {selectedDesk && (
                <button onClick={() => setSelectedDesk(null)} className="hover:bg-[#8B5E3C]/20 p-1 rounded">
                  <X className="w-5 h-5 text-[#EAD7B7]/60" />
                </button>
              )}
            </CardHeader>
            <CardContent>
              {desk ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="text-center p-4 bg-[#1B1612] rounded-lg">
                    <p className="text-3xl font-bold text-[#D4AF37]">{desk.id}</p>
                    <p className="text-[#EAD7B7]/60">Zone {desk.zone} • Desk {desk.number}</p>
                  </div>
                  
                  <div className={`flex items-center justify-center gap-2 p-3 rounded-lg ${statusConfig[desk.status].bgClass}`}>
                    <div className={`w-3 h-3 rounded-full ${statusConfig[desk.status].color}`} />
                    <span className="text-[#F5E9D3]">{statusConfig[desk.status].label}</span>
                  </div>

                  {desk.occupant && (
                    <div className="p-3 bg-[#1B1612] rounded-lg flex items-center gap-3">
                      <User className="w-5 h-5 text-[#8B5E3C]" />
                      <div>
                        <p className="text-[#EAD7B7]/60 text-sm">Occupant</p>
                        <p className="text-[#F5E9D3]">{desk.occupant}</p>
                      </div>
                    </div>
                  )}

                  {desk.checkInTime && (
                    <div className="p-3 bg-[#1B1612] rounded-lg flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[#8B5E3C]" />
                      <div>
                        <p className="text-[#EAD7B7]/60 text-sm">Checked in</p>
                        <p className="text-[#F5E9D3]">{desk.checkInTime.toLocaleTimeString()}</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {desk.status === 'available' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleReserve(desk.id)}
                        className="w-full py-3 bg-[#D4AF37] text-[#1B1612] font-semibold rounded-lg hover:bg-[#c9a030] transition-all flex items-center justify-center gap-2"
                      >
                        <Check className="w-5 h-5" />
                        Reserve This Desk
                      </motion.button>
                    )}

                    {desk.status === 'occupied' && desk.occupant === 'You' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleRelease(desk.id)}
                        className="w-full py-3 bg-red-600/20 border border-red-500/30 text-red-400 font-semibold rounded-lg hover:bg-red-600/30 transition-all"
                      >
                        Release Desk
                      </motion.button>
                    )}

                    {desk.status === 'occupied' && desk.occupant !== 'You' && (
                      <div className="text-center py-3 text-[#EAD7B7]/60 text-sm">
                        This desk is currently occupied
                      </div>
                    )}

                    {desk.status === 'away' && (
                      <div className="text-center py-3 text-yellow-400/80 text-sm">
                        Occupant is temporarily away
                      </div>
                    )}

                    {desk.status === 'maintenance' && (
                      <div className="text-center py-3 text-gray-400 text-sm">
                        This desk is under maintenance
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-8 text-[#EAD7B7]/60">
                  <p>Select a desk to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}