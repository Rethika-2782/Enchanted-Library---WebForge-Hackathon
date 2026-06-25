import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  house: string;
  points: number;
  streak: number;
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, house: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  addPoints: (points: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('enchanted_library_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('enchanted_library_user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    if (!email || !password) {
      return { success: false, error: 'Please fill in all fields' };
    }

    if (password.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters' };
    }

    const storedUsers = localStorage.getItem('enchanted_library_users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const existingUser = users.find((u: User & { password: string }) => u.email === email);

    let loggedInUser: User;

    if (existingUser) {
      if ((existingUser as any).password !== password) {
        return { success: false, error: 'Invalid password' };
      }
      loggedInUser = {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        house: existingUser.house,
        points: existingUser.points || 0,
        streak: existingUser.streak || 0,
      };
    } else {
      const houses = ['Wisdom', 'Innovation', 'Discovery', 'Legacy'];
      const randomHouse = houses[Math.floor(Math.random() * houses.length)];
      
      loggedInUser = {
        id: `user_${Date.now()}`,
        name: email.split('@')[0],
        email,
        house: randomHouse,
        points: 0,
        streak: 0,
      };

      const newUser = { ...loggedInUser, password };
      users.push(newUser);
      localStorage.setItem('enchanted_library_users', JSON.stringify(users));
    }

    setUser(loggedInUser);
    setIsAuthenticated(true);
    localStorage.setItem('enchanted_library_user', JSON.stringify(loggedInUser));
    
    return { success: true };
  };

  const register = async (name: string, email: string, password: string, house: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    if (!name || !email || !password) {
      return { success: false, error: 'Please fill in all fields' };
    }

    if (password.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters' };
    }

    const storedUsers = localStorage.getItem('enchanted_library_users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    
    if (users.find((u: User) => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }

    const newUser: User = {
      id: `user_${Date.now()}`,
      name,
      email,
      house,
      points: 50,
      streak: 0,
    };

    users.push({ ...newUser, password });
    localStorage.setItem('enchanted_library_users', JSON.stringify(users));
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('enchanted_library_user', JSON.stringify(newUser));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('enchanted_library_user');
  };

  const addPoints = (points: number) => {
    if (user) {
      const updatedUser = { ...user, points: user.points + points };
      setUser(updatedUser);
      localStorage.setItem('enchanted_library_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, register, logout, addPoints }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}