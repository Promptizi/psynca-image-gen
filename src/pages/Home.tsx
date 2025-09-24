import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditDisplay } from "@/components/ui/credit-display";
import { MobileNavigation } from "@/components/ui/navigation";
import { Sparkles, Upload, Palette, Zap, Brain, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const userCredits = 15; // Mock data

  const features = [
    {
      icon: Brain,
      title: "Templates Psicológicos",
      description: "Modelos especializados para profissionais da psicologia",
      color: "text-purple-400"
    },
    {
      icon: Heart,
      title: "Terapia Visual",
      description: "Imagens que auxiliam no processo terapêutico",
      color: "text-pink-400"
    },
    {
      icon: Palette,
      title: "Personalizadas",
      description: "Crie imagens únicas para seus pacientes",
      color: "text-blue-400"
    },
    {
      icon: Zap,
      title: "IA Avançada",
      description: "Tecnologia de ponta em geração de imagens",
      color: "text-cyan-400"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="px-4 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Psynca Studio</h1>
          <p className="text-sm text-muted-foreground">Geração de imagens para psicólogos</p>
        </div>
        <CreditDisplay credits={userCredits} />
      </header>

      {/* Hero Section */}
      <section className="px-4 mb-8">
        <Card className="p-6 bg-gradient-hero border-0 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">
              Transforme suas sessões com IA
            </h2>
            <p className="text-white/80 mb-4">
              Crie imagens personalizadas para enriquecer o processo terapêutico
            </p>
            <Link to="/generate">
              <Button size="lg" className="bg-white/20 text-white border-white/30 hover:bg-white/30 shadow-button">
                <Sparkles className="mr-2 h-4 w-4" />
                Começar Agora
              </Button>
            </Link>
          </div>
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl" />
        </Card>
      </section>

      {/* Quick Actions */}
      <section className="px-4 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <Link to="/generate">
            <Card className="p-4 bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-card">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Gerar Imagem</h3>
                  <p className="text-xs text-muted-foreground">1 crédito</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/credits">
            <Card className="p-4 bg-gradient-card border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-card">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Upload className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Comprar Créditos</h3>
                  <p className="text-xs text-muted-foreground">R$ 50 = 50 créditos</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 mb-8">
        <h3 className="text-lg font-bold mb-4">Recursos Especializados</h3>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-4 bg-card/50 border-border/50 hover:bg-card transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <Icon className={`h-6 w-6 mb-2 ${feature.color}`} />
                <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Recent Generations */}
      <section className="px-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Últimas Criações</h3>
          <Link to="/gallery" className="text-sm text-primary hover:text-accent transition-colors">
            Ver todas
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="aspect-square bg-gradient-card border-border/50 p-2">
              <div className="w-full h-full bg-muted/30 rounded-lg flex items-center justify-center">
                <Palette className="h-8 w-8 text-muted-foreground/50" />
              </div>
            </Card>
          ))}
        </div>
      </section>

      <MobileNavigation />
    </div>
  );
}