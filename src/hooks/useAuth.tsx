import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { setStudioContext, STUDIO_ROUTES } from "@/lib/studio-isolation";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Marca contexto como Studio na inicialização
    setStudioContext();
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setSession(session);
          setUser(session.user);
          await checkAdminStatus(session.user.id);
        } else {
          setSession(null);
          setUser(null);
          setIsAdmin(false);
        }
        setLoading(false);

        if (event === "SIGNED_IN") {
          // Garante que após login o usuário permanece no Studio
          navigate(STUDIO_ROUTES.HOME);
        }
        if (event === "SIGNED_OUT") {
          navigate(STUDIO_ROUTES.LOGIN);
        }
        if (event === "PASSWORD_RECOVERY") {
          navigate("/auth/reset-password");
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate]);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setSession(session);
        setUser(session.user);
        await checkAdminStatus(session.user.id);
      }
    } catch (error) {
      console.error("Error checking user session:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkAdminStatus = async (userId: string) => {
    try {
      // Usa fetch direto para verificar admin status no Studio
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      const response = await fetch(
        `${supabaseUrl}/rest/v1/studio_user_profiles?user_id=eq.${userId}&select=role`,
        {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${session?.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        setIsAdmin(false);
        return;
      }

      const data = await response.json();
      const userRole = data?.[0]?.role;
      setIsAdmin(userRole === "admin");
    } catch (error) {
      // Silently fail - user might not have profile yet
      setIsAdmin(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta ao Psynka Studio.",
      });
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast({
        title: "Erro no login",
        description: error.message || "Não foi possível fazer login. Verifique suas credenciais.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/confirm`,
        },
      });

      if (error) throw error;

      if (data.user && !data.session) {
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Por favor, verifique seu email para confirmar sua conta.",
        });
      } else if (data.session) {
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Bem-vindo ao Psynka Studio!",
        });
      }
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast({
        title: "Erro no cadastro",
        description: error.message || "Não foi possível criar sua conta. Tente novamente.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: "Logout realizado",
        description: "Até breve!",
      });
    } catch (error: any) {
      console.error("Sign out error:", error);
      toast({
        title: "Erro ao sair",
        description: error.message || "Não foi possível fazer logout.",
        variant: "destructive",
      });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "Email enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast({
        title: "Erro ao enviar email",
        description: error.message || "Não foi possível enviar o email de recuperação.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast({
        title: "Senha atualizada!",
        description: "Sua senha foi alterada com sucesso.",
      });
    } catch (error: any) {
      console.error("Update password error:", error);
      toast({
        title: "Erro ao atualizar senha",
        description: error.message || "Não foi possível atualizar sua senha.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const refreshSession = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
      }
    } catch (error) {
      console.error("Refresh session error:", error);
    }
  };

  const value = {
    user,
    session,
    loading,
    isAdmin,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    refreshSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};