import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { setStudioContext } from "@/lib/studio-isolation";
import { createUserProfile } from "@/lib/auth-helpers";

export default function OAuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Marca como contexto do Studio
        setStudioContext();

        // Pega o contexto da query string
        const context = searchParams.get("context");

        if (context !== "studio") {
          console.warn("OAuth callback sem contexto Studio");
        }

        // Aguarda a sessão ser estabelecida
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (session && session.user) {
          console.log("✅ Sessão OAuth estabelecida para o Studio");

          // Tentar criar o perfil do usuário no Studio (caso não exista)
          try {
            const fullName = session.user.user_metadata?.full_name ||
                           session.user.user_metadata?.name ||
                           session.user.email?.split("@")[0];

            await createUserProfile(session.user.id, session.user.email!, fullName);
          } catch (profileError: any) {
            // Se o perfil já existe, está tudo bem
            if (!profileError.message?.includes("duplicate key")) {
              console.error("Profile creation error:", profileError);
            }
          }

          toast({
            title: "Login realizado com sucesso!",
            description: "Bem-vindo ao Psynka Studio!",
          });

          // Redireciona para a home do Studio
          navigate("/", { replace: true });
        } else {
          throw new Error("Sessão não estabelecida após OAuth");
        }
      } catch (error: any) {
        console.error("OAuth callback error:", error);

        toast({
          title: "Erro na autenticação",
          description: error.message || "Não foi possível completar o login. Tente novamente.",
          variant: "destructive",
        });

        // Redireciona para login em caso de erro
        navigate("/auth/login", { replace: true });
      }
    };

    handleCallback();
  }, [navigate, searchParams, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Finalizando autenticação...</p>
        <p className="text-xs text-muted-foreground mt-2">Aguarde, você será redirecionado em instantes</p>
      </div>
    </div>
  );
}
