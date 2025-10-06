import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditDisplay } from "@/components/ui/credit-display";
import { MobileNavigation } from "@/components/ui/navigation";
import { CreditCard, QrCode, ArrowLeft, Zap, Star, Gift, Loader2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useCredits } from "@/hooks/useCredits";
import { useToast } from "@/hooks/use-toast";
import { createCheckoutSession, redirectToCheckout, handlePaymentSuccess } from "@/lib/stripe";
import { useState, useEffect } from "react";

export default function Credits() {
  const { credits: userCredits, refreshCredits } = useCredits();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState<string | null>(null);

  const purchaseOptions = [
    {
      id: "basic",
      name: "Pacote Básico",
      credits: 10,
      price: 9.99,
      popular: false,
      description: "Ideal para começar",
      icon: Zap
    },
    {
      id: "premium",
      name: "Pacote Premium",
      credits: 60,
      price: 49.99,
      popular: true,
      description: "20% de bônus",
      icon: Star
    },
    {
      id: "professional",
      name: "Pacote Profissional",
      credits: 125,
      price: 99.99,
      popular: false,
      description: "25% de bônus",
      icon: Gift
    }
  ];

  // Handle success/cancel from Stripe
  useEffect(() => {
    const success = searchParams.get('success');
    const cancelled = searchParams.get('cancelled');
    const sessionId = searchParams.get('session_id');

    if (success && sessionId) {
      handleStripeSuccess(sessionId);
    } else if (cancelled) {
      toast({
        title: "Pagamento cancelado",
        description: "Você pode tentar novamente quando quiser.",
        variant: "destructive",
      });
    }
  }, [searchParams, toast]);

  const handleStripeSuccess = async (sessionId: string) => {
    try {
      const result = await handlePaymentSuccess(sessionId);
      
      await refreshCredits(); // Refresh credits display
      
      toast({
        title: "Pagamento realizado com sucesso!",
        description: `${result.payment.credits_purchased} créditos foram adicionados à sua conta.`,
      });

      // Clear URL parameters
      window.history.replaceState({}, '', '/credits');
      
    } catch (error: any) {
      console.error('Error handling payment success:', error);
      toast({
        title: "Erro ao processar pagamento",
        description: "O pagamento foi realizado, mas houve um erro. Entre em contato com o suporte.",
        variant: "destructive",
      });
    }
  };

  const handlePurchase = async (packageId: string, paymentMethod: 'card' | 'pix' = 'card') => {
    if (loading) return;
    
    setLoading(`${packageId}-${paymentMethod}`);
    
    try {
      const result = await createCheckoutSession({
        packageId,
        successUrl: `${window.location.origin}/credits?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/credits?cancelled=true`,
      });

      await redirectToCheckout(result.sessionId);
      
    } catch (error: any) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Erro ao iniciar pagamento",
        description: error.message || "Não foi possível iniciar o processo de pagamento.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
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
                    <div className="text-2xl font-bold">R$ {option.price.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">{option.credits} créditos</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={() => handlePurchase(option.id, 'card')}
                    disabled={loading === `${option.id}-card`}
                    className="flex-1 bg-gradient-primary text-white border-0 hover:opacity-90"
                  >
                    {loading === `${option.id}-card` ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <CreditCard className="mr-2 h-4 w-4" />
                    )}
                    Cartão
                  </Button>
                  <Button 
                    onClick={() => handlePurchase(option.id, 'pix')}
                    disabled={loading === `${option.id}-pix`}
                    variant="outline"
                    className="flex-1 border-primary text-primary hover:bg-primary/10"
                  >
                    {loading === `${option.id}-pix` ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <QrCode className="mr-2 h-4 w-4" />
                    )}
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
          <h3 className="font-bold mb-4">Por que escolher o Psynka Studio?</h3>
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