import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditDisplay } from "@/components/ui/credit-display";
import { MobileNavigation } from "@/components/ui/navigation";
import { User, Settings, HelpCircle, LogOut, ArrowLeft, BarChart3, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function Profile() {
  const userCredits = 15;
  const userStats = {
    totalGenerated: 127,
    joinDate: "Janeiro 2024",
    favoriteCategory: "Terapia"
  };

  const menuItems = [
    { icon: Settings, label: "Configurações", action: () => {} },
    { icon: HelpCircle, label: "Ajuda e Suporte", action: () => {} },
    { icon: LogOut, label: "Sair", action: () => {}, danger: true }
  ];

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
              <User className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">Dr. Ana Silva</h2>
              <p className="text-muted-foreground">Psicóloga Clínica</p>
              <p className="text-sm text-muted-foreground">CRP 12345</p>
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
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 bg-card/50 border-border/50 text-center">
            <BarChart3 className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{userStats.totalGenerated}</div>
            <div className="text-xs text-muted-foreground">Imagens Criadas</div>
          </Card>
          
          <Card className="p-4 bg-card/50 border-border/50 text-center">
            <Calendar className="h-6 w-6 text-accent mx-auto mb-2" />
            <div className="text-sm font-bold">{userStats.joinDate}</div>
            <div className="text-xs text-muted-foreground">Membro desde</div>
          </Card>
          
          <Card className="p-4 bg-card/50 border-border/50 text-center">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-sm font-bold">{userStats.favoriteCategory}</div>
            <div className="text-xs text-muted-foreground">Categoria Favorita</div>
          </Card>
        </div>
      </section>

      {/* Plan Info */}
      <section className="px-4 mb-8">
        <Card className="p-6 bg-card/50 border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold">Plano Atual</h3>
              <p className="text-sm text-muted-foreground">Pagamento por crédito</p>
            </div>
            <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
              Gerenciar
            </Button>
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
          <h3 className="font-bold gradient-text mb-2">Psynca Studio</h3>
          <p className="text-xs text-muted-foreground">Versão 1.0.0</p>
          <p className="text-xs text-muted-foreground">© 2024 Psynca Studio</p>
        </Card>
      </section>

      <MobileNavigation />
    </div>
  );
}