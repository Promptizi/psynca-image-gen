import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditDisplay } from "@/components/ui/credit-display";
import { MobileNavigation } from "@/components/ui/navigation";
import { CreditCard, QrCode, ArrowLeft, Zap, Star, Gift } from "lucide-react";
import { Link } from "react-router-dom";

export default function Credits() {
  const userCredits = 15;

  const purchaseOptions = [
    {
      id: "basic",
      name: "Pacote Básico",
      credits: 50,
      price: 50,
      popular: false,
      description: "Ideal para começar",
      icon: Zap
    },
    {
      id: "premium",
      name: "Pacote Premium",
      credits: 120,
      price: 100,
      popular: true,
      description: "20% de bônus",
      icon: Star
    },
    {
      id: "professional",
      name: "Pacote Profissional",
      credits: 250,
      price: 200,
      popular: false,
      description: "25% de bônus",
      icon: Gift
    }
  ];

  const handlePurchase = (packageId: string) => {
    // Here we would integrate with Stripe
    console.log(`Purchasing package: ${packageId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">Créditos</h1>
            <p className="text-sm text-muted-foreground">Adquira créditos para gerar imagens</p>
          </div>
        </div>
        <CreditDisplay credits={userCredits} />
      </header>

      {/* Current Balance */}
      <section className="px-4 mb-8">
        <Card className="p-6 bg-gradient-card border-border/50">
          <div className="text-center">
            <h3 className="text-lg font-bold mb-2">Seu Saldo Atual</h3>
            <div className="text-4xl font-bold gradient-text mb-2">{userCredits}</div>
            <p className="text-muted-foreground">créditos disponíveis</p>
          </div>
        </Card>
      </section>

      {/* Purchase Options */}
      <section className="px-4 mb-8">
        <h3 className="text-lg font-bold mb-4">Pacotes de Créditos</h3>
        <div className="space-y-4">
          {purchaseOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Card 
                key={option.id} 
                className={`p-6 border transition-all duration-300 ${
                  option.popular 
                    ? 'border-primary bg-primary/5 shadow-card' 
                    : 'border-border/50 hover:border-primary/50'
                }`}
              >
                {option.popular && (
                  <div className="flex justify-center mb-4">
                    <span className="px-3 py-1 bg-gradient-primary text-white text-xs font-bold rounded-full">
                      MAIS POPULAR
                    </span>
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{option.name}</h4>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">R$ {option.price}</div>
                    <div className="text-sm text-muted-foreground">{option.credits} créditos</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={() => handlePurchase(option.id)}
                    className="flex-1 bg-gradient-primary text-white border-0 hover:opacity-90"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Cartão
                  </Button>
                  <Button 
                    onClick={() => handlePurchase(option.id)}
                    variant="outline"
                    className="flex-1 border-primary text-primary hover:bg-primary/10"
                  >
                    <QrCode className="mr-2 h-4 w-4" />
                    Pix
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 mb-8">
        <Card className="p-6 bg-card/50 border-border/50">
          <h3 className="font-bold mb-4">Por que escolher o Psynca Studio?</h3>
          <div className="space-y-3">
            {[
              "IA especializada em conteúdo psicológico",
              "Templates profissionais exclusivos",
              "Imagens de alta qualidade",
              "Suporte técnico especializado",
              "Sem mensalidades, pague apenas pelo que usar"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <MobileNavigation />
    </div>
  );
}