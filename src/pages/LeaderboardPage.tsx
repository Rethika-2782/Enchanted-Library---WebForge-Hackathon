import { motion } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { houses, topReaders } from "../data/mockData";

export default function LeaderboardPage() {
  const medalIcons = [Trophy, Medal, Award];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-serif text-[#D4AF37]">Leaderboard</h1>
        <p className="text-[#EAD7B7]/60 mt-1">Reading Houses competition and top scholars</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#2a2018] border-[#8B5E3C]/30">
          <CardHeader>
            <CardTitle className="text-[#D4AF37] flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              House Rankings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {houses.map((house, index) => (
              <motion.div
                key={house.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg ${index === 0 ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/30' : 'bg-[#1B1612]'}`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{house.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[#F5E9D3] font-semibold">{house.name} House</h3>
                      <span className="text-[#D4AF37] font-bold">#{index + 1}</span>
                    </div>
                    <div className="mt-2 h-2 bg-[#1B1612] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(house.points / houses[0].points) * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-full bg-gradient-to-r ${house.color}`}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="text-[#EAD7B7]/60">{house.points.toLocaleString()} points</span>
                      <span className="text-[#EAD7B7]/60">{house.members} members</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-[#2a2018] border-[#8B5E3C]/30">
          <CardHeader>
            <CardTitle className="text-[#D4AF37] flex items-center gap-2">
              <Award className="w-5 h-5" />
              Top Readers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topReaders.map((reader, index) => {
              const Icon = medalIcons[index] || Award;
              const colors = ['text-[#D4AF37]', 'text-gray-400', 'text-amber-600'];
              return (
                <motion.div
                  key={reader.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-3 bg-[#1B1612] rounded-lg"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index < 3 ? 'bg-[#D4AF37]/20' : 'bg-[#8B5E3C]/20'}`}>
                    <Icon className={`w-4 h-4 ${colors[index] || 'text-[#EAD7B7]/60'}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#F5E9D3] font-medium">{reader.name}</p>
                    <p className="text-[#EAD7B7]/60 text-sm capitalize">{reader.house} House</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#D4AF37] font-bold">{reader.hours}h</p>
                    <p className="text-[#EAD7B7]/60 text-xs">this week</p>
                  </div>
                </motion.div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}