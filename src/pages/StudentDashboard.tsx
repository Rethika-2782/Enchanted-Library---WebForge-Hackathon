import { motion } from "framer-motion";
import { Clock, Flame, Star, BookOpen, Timer, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { houses } from "../data/mockData";

export default function StudentDashboard() {
  const { user } = useUser();
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const stats = [
    { label: 'Current Desk', value: 'A-12', icon: BookOpen, color: 'text-[#D4AF37]' },
    { label: 'Session Time', value: formatTime(sessionTime), icon: Clock, color: 'text-green-400' },
    { label: 'Study Streak', value: `${user?.streak || 0} days`, icon: Flame, color: 'text-orange-400' },
    { label: 'House Points', value: user?.points || 0, icon: Star, color: 'text-[#D4AF37]' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-[#D4AF37]">Welcome back, {user?.name?.split(' ')[0]}</h1>
          <p className="text-[#EAD7B7]/60 mt-1">Your magical study journey continues...</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-900/30 border border-green-500/30 rounded-lg">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 text-sm">Checked in at Desk A-12</span>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-[#2a2018] border-[#8B5E3C]/30 hover:border-[#D4AF37]/50 transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#EAD7B7]/60">{stat.label}</CardTitle>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="bg-[#2a2018] border-[#8B5E3C]/30 h-full">
            <CardHeader>
              <CardTitle className="text-[#D4AF37] flex items-center gap-2">
                <Timer className="w-5 h-5" />
                Current Session
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#1B1612] rounded-lg">
                <div>
                  <p className="text-[#EAD7B7]/60 text-sm">Desk Location</p>
                  <p className="text-[#F5E9D3] text-lg font-semibold">Zone A, Desk 12</p>
                </div>
                <div className="text-right">
                  <p className="text-[#EAD7B7]/60 text-sm">Floor</p>
                  <p className="text-[#F5E9D3] text-lg font-semibold">Ground Floor</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-[#1B1612] rounded-lg">
                  <p className="text-3xl font-bold text-[#D4AF37]">{formatTime(sessionTime).split(':')[0]}</p>
                  <p className="text-[#EAD7B7]/60 text-sm">Hours</p>
                </div>
                <div className="text-center p-4 bg-[#1B1612] rounded-lg">
                  <p className="text-3xl font-bold text-[#D4AF37]">{formatTime(sessionTime).split(':')[1]}</p>
                  <p className="text-[#EAD7B7]/60 text-sm">Minutes</p>
                </div>
                <div className="text-center p-4 bg-[#1B1612] rounded-lg">
                  <p className="text-3xl font-bold text-[#D4AF37]">{formatTime(sessionTime).split(':')[2]}</p>
                  <p className="text-[#EAD7B7]/60 text-sm">Seconds</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-yellow-600/20 border border-yellow-500/30 text-yellow-400 rounded-lg hover:bg-yellow-600/30 transition-all">
                  Mark as Away
                </button>
                <button className="flex-1 py-3 bg-red-600/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-600/30 transition-all">
                  Check Out
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-[#2a2018] border-[#8B5E3C]/30 h-full">
            <CardHeader>
              <CardTitle className="text-[#D4AF37] flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                House Rankings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {houses.map((house, index) => (
                <div key={house.name} className={`flex items-center gap-3 p-3 rounded-lg ${index === 0 ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/30' : 'bg-[#1B1612]'}`}>
                  <span className="text-2xl">{house.emoji}</span>
                  <div className="flex-1">
                    <p className="text-[#F5E9D3] font-medium">{house.name}</p>
                    <p className="text-[#EAD7B7]/60 text-sm">{house.points.toLocaleString()} pts</p>
                  </div>
                  <span className="text-[#D4AF37] font-bold">#{index + 1}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}