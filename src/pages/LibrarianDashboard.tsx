import { motion } from "framer-motion";
import { Users, AlertTriangle, Clock, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { desks } from "../data/mockData";

export default function LibrarianDashboard() {
  const stats = [
    { label: 'Active Desks', value: desks.filter(d => d.status === 'occupied').length, icon: Users, color: 'text-green-400' },
    { label: 'Away Desks', value: desks.filter(d => d.status === 'away').length, icon: Clock, color: 'text-yellow-400' },
    { label: 'Abandoned', value: 3, icon: AlertTriangle, color: 'text-red-400' },
    { label: 'Available', value: desks.filter(d => d.status === 'available').length, icon: RefreshCw, color: 'text-[#D4AF37]' },
  ];

  const occupiedDesks = desks.filter(d => d.status === 'occupied').slice(0, 8);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-serif text-[#D4AF37]">Librarian Dashboard</h1>
        <p className="text-[#EAD7B7]/60 mt-1">Manage library operations and monitor desk activity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-[#2a2018] border-[#8B5E3C]/30">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#EAD7B7]/60">{stat.label}</CardTitle>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#2a2018] border-[#8B5E3C]/30">
          <CardHeader>
            <CardTitle className="text-[#D4AF37]">Currently Occupied</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {occupiedDesks.map((desk) => (
                <div key={desk.id} className="flex items-center justify-between p-3 bg-[#1B1612] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-red-400 font-bold">{desk.id}</span>
                    </div>
                    <div>
                      <p className="text-[#F5E9D3] font-medium">{desk.occupant}</p>
                      <p className="text-[#EAD7B7]/60 text-sm">Since {desk.checkInTime?.toLocaleTimeString()}</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-red-600/20 border border-red-500/30 text-red-400 rounded hover:bg-red-600/30 text-sm">
                    Reset
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#2a2018] border-[#8B5E3C]/30">
          <CardHeader>
            <CardTitle className="text-[#D4AF37]">Away Desks (Long Duration)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {desks.filter(d => d.status === 'away').slice(0, 6).map((desk) => (
                <div key={desk.id} className="flex items-center justify-between p-3 bg-[#1B1612] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-yellow-400 font-bold">{desk.id}</span>
                    </div>
                    <div>
                      <p className="text-[#F5E9D3] font-medium">{desk.occupant}</p>
                      <p className="text-[#EAD7B7]/60 text-sm">Away for 45+ min</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-yellow-600/20 border border-yellow-500/30 text-yellow-400 rounded hover:bg-yellow-600/30 text-sm">
                    Mark Abandoned
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}