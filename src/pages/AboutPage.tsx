import { motion } from "framer-motion";
import { BookOpen, Sparkles, Shield, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export default function AboutPage() {
  const features = [
    { icon: BookOpen, title: 'Smart Desk Management', description: 'Real-time tracking of desk availability with magical precision.' },
    { icon: Shield, title: 'Anti-Hoarding System', description: 'Automatic detection of abandoned desks to ensure fair access.' },
    { icon: Users, title: 'Reading Houses', description: 'Compete with fellow scholars in house-based gamification.' },
    { icon: Sparkles, title: 'AI Predictions', description: 'Library Oracle predicts crowd patterns for optimal study times.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#D4AF37] to-[#8B5E3C] rounded-full flex items-center justify-center"
        >
          <BookOpen className="w-10 h-10 text-[#1B1612]" />
        </motion.div>
        <h1 className="text-4xl font-serif text-[#D4AF37] mb-4">About Enchanted Library</h1>
        <p className="text-[#EAD7B7]/80 text-lg max-w-2xl mx-auto">
          A magical solution to the age-old problem of desk hoarding in college libraries. 
          DeskGuard AI brings the enchantment of Hogwarts to modern library management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-[#2a2018] border-[#8B5E3C]/30 h-full hover:border-[#D4AF37]/50 transition-all">
                <CardHeader>
                  <CardTitle className="text-[#D4AF37] flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#EAD7B7]/70">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Card className="bg-[#2a2018] border-[#8B5E3C]/30">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-serif text-[#D4AF37] mb-4">The Magic Behind</h2>
          <p className="text-[#EAD7B7]/70 mb-6">
            Built with modern technologies and a passion for creating delightful user experiences.
            Enchanted Library combines the warmth of Dark Academia aesthetics with cutting-edge
            real-time desk management technology.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            {['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Recharts'].map((tech) => (
              <span key={tech} className="px-4 py-2 bg-[#1B1612] rounded-full text-[#D4AF37] text-sm">
                {tech}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}