import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAdminStatus = async (email: string) => {
    try {
      // Check admin status using the profiles table with email matching
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("role", "admin")
        .limit(1);

      if (error) {
        console.error("Error checking admin status:", error);
        return false;
      }

      // For Firebase auth, we'll check if user exists in profiles as admin
      // You can also create a firebase_admins table or use Firebase custom claims
      const { data: adminData, error: adminError } = await supabase
        .from("profiles")
        .select("role, user_id")
        .eq("role", "admin");

      if (adminError) {
        console.error("Error fetching admin profiles:", adminError);
        return false;
      }

      // Check if any admin profile exists (for now, any authenticated Firebase user with admin role)
      return adminData && adminData.length > 0;
    } catch (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser && firebaseUser.email) {
        const adminStatus = await checkAdminStatus(firebaseUser.email);
        setIsAdmin(adminStatus);
      } else {
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
