import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import type { Session, User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

export type UserRole = "family" | "staff" | "admin" | null;

export interface User {
  id: string;
  email: string;
  name: string;
  role: Exclude<UserRole, null>;
  householdId?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  loading: boolean;

  loginWithPassword: (email: string, password: string) => Promise<boolean>;
  sendMagicLink: (email: string) => Promise<boolean>;
  signUpWithPassword: (email: string, password: string, fullName?: string) => Promise<boolean>;

  logout: () => Promise<void>;
  hasRole: (role: Exclude<UserRole, null> | Array<Exclude<UserRole, null>>) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function fetchProfile(supaUser: SupabaseUser): Promise<User | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id,email,full_name,role,household_id")
    .eq("id", supaUser.id)
    .maybeSingle();

  // If profile doesn't exist yet (race condition), create a minimal one
  if (!data) {
    const { data: inserted, error: insertError } = await supabase
      .from("profiles")
      .insert({
        id: supaUser.id,
        email: supaUser.email ?? null,
        full_name: supaUser.user_metadata?.full_name ?? "",
        role: "family",
        household_id: null,
      })
      .select("id,email,full_name,role,household_id")
      .single();

    if (insertError || !inserted) return null;

    return {
      id: inserted.id,
      email: inserted.email ?? supaUser.email ?? "",
      name: inserted.full_name ?? "",
      role: inserted.role,
      householdId: inserted.household_id ?? undefined,
    };
  }

  if (error) return null;

  return {
    id: data.id,
    email: data.email ?? supaUser.email ?? "",
    name: data.full_name ?? "",
    role: data.role,
    householdId: data.household_id ?? undefined,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;

      setSession(data.session ?? null);

      if (data.session?.user) {
        const profile = await fetchProfile(data.session.user);
        if (mounted) setUser(profile);
      } else {
        setUser(null);
      }

      setLoading(false);
    })();

     const { data: sub } = supabase.auth.onAuthStateChange(async (_event, newSession: Session | null) => {
      setSession(newSession ?? null);

      if (newSession?.user) {
        const profile = await fetchProfile(newSession.user);
        setUser(profile);
      } else {
        setUser(null);
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const loginWithPassword = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return !error;
  }, []);

  const signUpWithPassword = useCallback(async (email: string, password: string, fullName?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName ?? "" },
      },
    });
    return !error;
  }, []);

  const sendMagicLink = useCallback(async (email: string) => {
    // Works for any localhost port and production automatically
    const redirectTo = `${window.location.origin}/login`;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    return !error;
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const hasRole = useCallback(
    (role: Exclude<UserRole, null> | Array<Exclude<UserRole, null>>) => {
      if (!user) return false;
      if (Array.isArray(role)) return role.includes(user.role);
      return user.role === role;
    },
    [user]
  );

  const value = useMemo(
    () => ({
      user,
      session,
      loading,
      isAuthenticated: !!session?.user,
      loginWithPassword,
      signUpWithPassword,
      sendMagicLink,
      logout,
      hasRole,
    }),
    [user, session, loading, loginWithPassword, signUpWithPassword, sendMagicLink, logout, hasRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

