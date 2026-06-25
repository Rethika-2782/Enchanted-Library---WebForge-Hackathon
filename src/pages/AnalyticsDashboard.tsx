import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Clock, Users } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { occupancyData, weeklyTrend, aiPredictions } from "../data/mockData";

export default function AnalyticsDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-serif text-[#D4AF37]">Analytics Dashboard</h1>
        <p className="text-[#EAD7B7]/60 mt-1">Library usage insights and AI predictions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#2a2018] border-[#8B5E3C]/30">
          <CardHeader>
            <CardTitle className="text-[#D4AF37] flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Hourly Occupancy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#8B5E3C" opacity={0.2} />
                  <XAxis dataKey="hour" stroke="#EAD7B7" fontSize={12} />
                  <YAxis stroke="#EAD7B7" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#2a2018', border: '1px solid #8B5E3C', borderRadius: '8px' }}
                    labelStyle={{ color: '#D4AF37' }}
                  />
                  <Line type="monotone" dataKey="occupancy" stroke="#D4AF37" strokeWidth={2} dot={{ fill: '#D4AF37' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#2a2018] border-[#8B5E3C]/30">
          <CardHeader>
            <CardTitle className="text-[#D4AF37] flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Weekly Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#8B5E3C" opacity={0.2} />
                  <XAxis dataKey="day" stroke="#EAD7B7" fontSize={12} />
                  <YAxis stroke="#EAD7B7" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#2a2018', border: '1px solid #8B5E3C', borderRadius: '8px' }}
                    labelStyle={{ color: '#D4AF37' }}
                  />
                  <Bar dataKey="occupied" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="available" fill="#8B5E3C" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#2a2018] border-[#8B5E3C]/30">
        <CardHeader>
          <CardTitle className="text-[#D4AF37] flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Library Oracle - AI Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiPredictions.map((pred, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-[#1B1612] rounded-lg border border-[#8B5E3C]/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#D4AF37] font-medium">{pred.time}</span>
                  <span className="text-xs text-[#EAD7B7]/60">{pred.confidence}% confidence</span>
                </div>
                <p className="text-[#F5E9D3] font-semibold mb-2">{pred.prediction}</p>
                <p className="text-[#EAD7B7]/60 text-sm">{pred.recommendation}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}