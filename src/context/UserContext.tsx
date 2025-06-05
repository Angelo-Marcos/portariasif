import React, { createContext, useContext, useEffect, useState } from 'react';
import { googleLogout } from '@react-oauth/google';

interface UserInfo {
  name: string;
  given_name: string;
  email: string;
  picture: string;
}

interface UserContextType {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  logout: () => void; // Função de logout
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);

  // Recupera os dados do localStorage ao carregar a aplicação
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    googleLogout(); // Faz logout do Google
    setUser(null); // Limpa o estado do usuário
    localStorage.removeItem('user'); // Remove os dados do localStorage (se estiver usando)
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
};