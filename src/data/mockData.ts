export interface Desk {
  id: string;
  zone: string;
  number: number;
  status: 'available' | 'occupied' | 'away' | 'maintenance';
  occupant?: string;
  checkInTime?: Date;
  awaySince?: Date;
}

export interface HouseData {
  name: string;
  points: number;
  members: number;
  emoji: string;
  color: string;
}

export const desks: Desk[] = Array.from({ length: 50 }, (_, i) => {
  const zone = i < 15 ? 'A' : i < 30 ? 'B' : 'C';
  const number = (i % 15) + 1;
  const statuses: Desk['status'][] = ['available', 'occupied', 'away', 'maintenance'];
  const statusWeights = [0.35, 0.45, 0.15, 0.05];
  
  let random = Math.random();
  let status: Desk['status'] = 'available';
  let cumulative = 0;
  for (let j = 0; j < statuses.length; j++) {
    cumulative += statusWeights[j];
    if (random < cumulative) {
      status = statuses[j];
      break;
    }
  }

  return {
    id: `${zone}-${number}`,
    zone,
    number,
    status,
    occupant: status === 'occupied' ? `Student ${i + 1}` : undefined,
    checkInTime: status !== 'available' ? new Date(Date.now() - Math.random() * 3600000 * 4) : undefined,
    awaySince: status === 'away' ? new Date(Date.now() - Math.random() * 1800000) : undefined,
  };
});

export const houses: HouseData[] = [
  { name: 'Wisdom', points: 12450, members: 156, emoji: '🦉', color: 'from-blue-600 to-blue-800' },
  { name: 'Innovation', points: 11280, members: 142, emoji: '⚡', color: 'from-purple-600 to-purple-800' },
  { name: 'Discovery', points: 9870, members: 138, emoji: '🔍', color: 'from-green-600 to-green-800' },
  { name: 'Legacy', points: 8540, members: 124, emoji: '📜', color: 'from-amber-600 to-amber-800' },
];

export const topReaders = [
  { name: 'Hermione Granger', hours: 156, house: 'wisdom', avatar: 'HG' },
  { name: 'Luna Lovegood', hours: 142, house: 'discovery', avatar: 'LL' },
  { name: 'Draco Malfoy', hours: 128, house: 'legacy', avatar: 'DM' },
  { name: 'Harry Potter', hours: 124, house: 'innovation', avatar: 'HP' },
  { name: 'Ron Weasley', hours: 98, house: 'wisdom', avatar: 'RW' },
];

export const occupancyData = [
  { hour: '6AM', occupancy: 5 },
  { hour: '8AM', occupancy: 25 },
  { hour: '10AM', occupancy: 65 },
  { hour: '12PM', occupancy: 85 },
  { hour: '2PM', occupancy: 90 },
  { hour: '4PM', occupancy: 75 },
  { hour: '6PM', occupancy: 60 },
  { hour: '8PM', occupancy: 45 },
  { hour: '10PM', occupancy: 20 },
];

export const weeklyTrend = [
  { day: 'Mon', occupied: 42, available: 8 },
  { day: 'Tue', occupied: 38, available: 12 },
  { day: 'Wed', occupied: 45, available: 5 },
  { day: 'Thu', occupied: 48, available: 2 },
  { day: 'Fri', occupied: 35, available: 15 },
  { day: 'Sat', occupied: 25, available: 25 },
  { day: 'Sun', occupied: 30, available: 20 },
];

export const aiPredictions = [
  { time: '9AM - 11AM', prediction: 'Low crowd', confidence: 92, recommendation: 'Best time for focused study' },
  { time: '12PM - 2PM', prediction: 'High crowd', confidence: 88, recommendation: 'Peak hours - Zone C recommended' },
  { time: '3PM - 5PM', prediction: 'Medium crowd', confidence: 85, recommendation: 'Good availability in Zone B' },
  { time: '7PM - 9PM', prediction: 'Medium crowd', confidence: 78, recommendation: 'Evening study session ideal' },
];