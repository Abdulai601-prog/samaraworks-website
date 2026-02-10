import React, { createContext, useContext, useState, useCallback } from 'react';

export type UserRole = 'family' | 'staff' | 'admin' | null;

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  householdId?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasRole: (role: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Demo auth has been removed for safety.
 * Until Supabase is connected, login is disabled.
 *
 * OPTIONAL (temporary for development only):
 * Set ENABLE_DEV_MOCK_LOGIN = true to allow a single internal test login.
 */
const ENABLE_DEV_MOCK_LOGIN = false;

// Optional: single internal dev user (ONLY if you enable mock login)
const DEV_USER: User = {
  id: 'dev-1',
  email: 'abdulai.mohamed@outlook.com',
  name: 'Abdulai (Dev)',
  role: 'admin',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // ✅ Production-safe: no fake password, no demo users
    // Login will be implemented with Supabase Auth next.

    // OPTIONAL dev-only shortcut:
    if (ENABLE_DEV_MOCK_LOGIN && email.toLowerCase() === DEV_USER.email.toLowerCase()) {
      setUser(DEV_USER);
      return true;
    }

    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const hasRole = useCallback((role: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    if (Array.isArray(role)) return role.includes(user.role);
    return user.role === role;
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        hasRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
