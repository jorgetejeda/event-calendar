
import { ReactNode, createContext, useContext, useState } from 'react';
//@Type
import { User, UserCredentials } from '@/core/types';
//@Services
import { AuthService } from '@/services';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (data: UserCredentials) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = async (data: UserCredentials) => {
    try {
      setLoading(true);
      const { data: user } = await AuthService.alternativeLogin(data);

      setUser(user);
      setIsAuthenticated(true);
      user.userRoles.forEach((role) => {
        if (role.role.title === 'Admin') {
          setIsAdmin(true);
        }
      });

      sessionStorage.setItem('token', user.token);
      
    } catch (error: any) {
      console.error('Error al iniciar sesión', error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      setLoading(true);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error: any) {
      console.error('Error al cerrar sesión', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthContextProvider');
  }
  return context;
};

export default AuthContextProvider;
