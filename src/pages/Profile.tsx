import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditDisplay } from "@/components/ui/credit-display";
import { MobileNavigation } from "@/components/ui/navigation";
import { User, Settings, HelpCircle, LogOut, ArrowLeft, BarChart3, Calendar, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { formatDate, getInitials } from "@/lib/auth-helpers";
import { useAuth } from "@/hooks/useAuth";
import { useCredits } from "@/hooks/useCredits";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [imageCount, setImageCount] = useState(0);
  const { user, signOut } = useAuth();
  const { credits: userCredits } = useCredits();
  const { toast } = useToast();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Load user profile using direct fetch
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const { data: session } = await supabase.auth.getSession();
      
      if (session.session) {
        const profileResponse = await fetch(
          `${supabaseUrl}/rest/v1/studio_user_profiles?user_id=eq.${user.id}`,
          {
            headers: {
              'apikey': supabaseKey,
              'Authorization': `Bearer ${session.session.access_token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setProfile(profileData[0] || null);
        }

        // Load image count
        const { count } = await supabase
          .from("studio_generated_images")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id);

        setImageCount(count || 0);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar suas informações.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        title: "Erro ao sair",
        description: "Não foi possível fazer logout.",
        variant: "destructive",
      });
    }
  };

  const menuItems = [
    { 
      icon: Settings, 
      label: "Configurações", 
      action: () => {
        toast({
          title: "Em desenvolvimento",
          description: "Página de configurações será implementada em breve.",
        });
      }
    },
    { 
      icon: HelpCircle, 
      label: "Ajuda e Suporte", 
      action: () => {
        toast({
          title: "Em desenvolvimento", 
          description: "Página de suporte será implementada em breve.",
        });
      }
    },
    { icon: LogOut, label: "Sair", action: handleLogout, danger: true }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="px-4 py-6 flex items-center gap-3">
        <Link to="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold">Perfil</h1>
          <p className="text-sm text-muted-foreground">Gerencie sua conta</p>
        </div>
      </header>

      {/* Profile Info */}
      <section className="px-4 mb-8">
        <Card className="p-6 bg-gradient-card border-border/50">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.full_name || user?.email}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-white">
                  {getInitials(profile?.full_name || user?.email || "U")}
                </span>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">
                {profile?.full_name || user?.email?.split("@")[0] || "Usuário"}
              </h2>
              <p className="text-muted-foreground">
                {profile?.bio || "Profissional de Saúde Mental"}
              </p>
              {profile?.role === "admin" && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary mt-1">
                  Administrador
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <CreditDisplay credits={userCredits} className="bg-card/50" />
          </div>
        </Card>
      </section>

      {/* Stats */}
      <section className="px-4 mb-8">
        <h3 className="text-lg font-bold mb-4">Estatísticas</h3>
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 bg-card/50 border-border/50 text-center">
            <BarChart3 className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{imageCount}</div>
            <div className="text-xs text-muted-foreground">Imagens Criadas</div>
          </Card>

          <Card className="p-4 bg-card/50 border-border/50 text-center">
            <Calendar className="h-6 w-6 text-accent mx-auto mb-2" />
            <div className="text-sm font-bold">
              {formatDate(profile?.created_at || user?.created_at || new Date())}
            </div>
            <div className="text-xs text-muted-foreground">Membro desde</div>
          </Card>
        </div>
      </section>

      {/* Package Info */}
      <section className="px-4 mb-8">
        <Card className="p-6 bg-card/50 border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold">Pacote Atual</h3>
              <p className="text-sm text-muted-foreground">Pagamento por crédito</p>
            </div>
            <Link to="/credits">
              <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
                Gerenciar
              </Button>
            </Link>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Próxima cobrança:</span>
              <span className="text-muted-foreground">Não se aplica</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Valor por imagem:</span>
              <span className="font-medium">R$ 1,00</span>
            </div>
          </div>
        </Card>
      </section>

      {/* Menu Options */}
      <section className="px-4 mb-8">
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card 
                key={index}
                className="p-4 bg-card/50 border-border/50 hover:bg-card transition-all duration-300 cursor-pointer"
                onClick={item.action}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${item.danger ? 'text-destructive' : 'text-muted-foreground'}`} />
                  <span className={`font-medium ${item.danger ? 'text-destructive' : ''}`}>
                    {item.label}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* App Info */}
      <section className="px-4 mb-8">
        <Card className="p-4 bg-card/50 border-border/50 text-center">
          <h3 className="font-bold gradient-text mb-2">Psynka Studio</h3>
          <p className="text-xs text-muted-foreground">Versão 1.0.0</p>
          <p className="text-xs text-muted-foreground">© 2024 Psynka Studio</p>
        </Card>
      </section>

      <MobileNavigation />
    </div>
  );
}