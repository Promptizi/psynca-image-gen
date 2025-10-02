import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { getUserCredits, updateUserCredits, consumeCredits } from "@/lib/auth-helpers";

interface CreditsContextType {
  credits: number;
  loading: boolean;
  refreshCredits: () => Promise<void>;
  useCredits: (amount: number) => Promise<{ success: boolean; remainingCredits?: number; error?: string }>;
  addCredits: (amount: number) => Promise<boolean>;
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

export const CreditsProvider = ({ children }: { children: ReactNode }) => {
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadCredits();

    // Subscribe to credit changes
    const subscription = supabase
      .channel('credits-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'studio_user_credits',
          filter: userId ? `user_id=eq.${userId}` : undefined,
        },
        (payload) => {
          if (payload.new && typeof payload.new === 'object' && 'credits' in payload.new) {
            const newCredits = payload.new.credits as number;
            setCredits(newCredits);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);

  const loadCredits = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setUserId(session.user.id);
        const userCredits = await getUserCredits(session.user.id);
        setCredits(userCredits);
      } else {
        setCredits(0);
        setUserId(null);
      }
    } catch (error) {
      console.error("Error loading credits:", error);
      setCredits(0);
    } finally {
      setLoading(false);
    }
  };

  const refreshCredits = async () => {
    await loadCredits();
  };

  const useCredits = async (amount: number) => {
    if (!userId) {
      toast({
        title: "Erro de autenticação",
        description: "Por favor, faça login para usar créditos.",
        variant: "destructive",
      });
      return { success: false, error: "Not authenticated" };
    }

    if (credits < amount) {
      toast({
        title: "Créditos insuficientes",
        description: `Você precisa de ${amount} créditos, mas tem apenas ${credits}.`,
        variant: "destructive",
      });
      return { success: false, error: "Insufficient credits" };
    }

    try {
      const result = await consumeCredits(userId, amount);

      if (result.success && result.remainingCredits !== undefined) {
        setCredits(result.remainingCredits);
        toast({
          title: "Créditos utilizados",
          description: `${amount} crédito(s) usado(s). Restam ${result.remainingCredits} créditos.`,
        });
        return { success: true, remainingCredits: result.remainingCredits };
      } else {
        toast({
          title: "Erro ao usar créditos",
          description: result.error || "Não foi possível processar a transação.",
          variant: "destructive",
        });
        return { success: false, error: result.error };
      }
    } catch (error: any) {
      console.error("Error using credits:", error);
      toast({
        title: "Erro ao usar créditos",
        description: "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const addCredits = async (amount: number) => {
    if (!userId) {
      toast({
        title: "Erro de autenticação",
        description: "Por favor, faça login para adicionar créditos.",
        variant: "destructive",
      });
      return false;
    }

    try {
      const newCredits = credits + amount;
      const success = await updateUserCredits(userId, newCredits);

      if (success) {
        setCredits(newCredits);
        toast({
          title: "Créditos adicionados",
          description: `${amount} créditos foram adicionados à sua conta.`,
        });
        return true;
      } else {
        toast({
          title: "Erro ao adicionar créditos",
          description: "Não foi possível adicionar os créditos.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error: any) {
      console.error("Error adding credits:", error);
      toast({
        title: "Erro ao adicionar créditos",
        description: "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
      return false;
    }
  };

  const value = {
    credits,
    loading,
    refreshCredits,
    useCredits,
    addCredits,
  };

  return (
    <CreditsContext.Provider value={value}>
      {children}
    </CreditsContext.Provider>
  );
};

export const useCredits = () => {
  const context = useContext(CreditsContext);
  if (context === undefined) {
    throw new Error("useCredits must be used within a CreditsProvider");
  }
  return context;
};