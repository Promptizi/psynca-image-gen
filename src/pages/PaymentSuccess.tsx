import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, CreditCard, ArrowRight, Home } from "lucide-react";
import { handlePaymentSuccess, PaymentSuccessResponse } from "@/lib/stripe";
import { useCredits } from "@/hooks/useCredits";
import { useToast } from "@/hooks/use-toast";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState<PaymentSuccessResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { refreshCredits } = useCredits();
  const { toast } = useToast();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (!sessionId) {
      setLoading(false);
      return;
    }

    handleSuccess(sessionId);
  }, [searchParams]);

  const handleSuccess = async (sessionId: string) => {
    try {
      const result = await handlePaymentSuccess(sessionId);
      setPaymentData(result);
      
      // Refresh credits
      await refreshCredits();
      
      toast({
        title: "Pagamento confirmado!",
        description: `${result.payment.credits_purchased} créditos adicionados à sua conta.`,
      });
      
    } catch (error: any) {
      console.error('Error handling payment success:', error);
      toast({
        title: "Erro ao processar pagamento",
        description: "Entre em contato com o suporte se o problema persistir.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-lg font-semibold mb-2">Processando pagamento...</h2>
            <p className="text-muted-foreground">Aguarde enquanto confirmamos seu pagamento.</p>
          </div>
        </Card>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2">Sessão não encontrada</h2>
            <p className="text-muted-foreground mb-4">
              Não foi possível encontrar os dados do pagamento.
            </p>
            <Link to="/credits">
              <Button>
                Voltar aos Créditos
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount / 100);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="p-8 max-w-md w-full mx-4">
        <div className="text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Pagamento Confirmado!
          </h1>
          
          <p className="text-muted-foreground mb-6">
            Seu pagamento foi processado com sucesso.
          </p>

          {/* Payment Details */}
          <div className="bg-muted/50 rounded-lg p-4 mb-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Créditos adquiridos:</span>
              <span className="font-semibold">{paymentData.payment.credits_purchased}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Valor pago:</span>
              <span className="font-semibold">{formatCurrency(paymentData.payment.amount_paid)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Saldo atual:</span>
              <span className="font-bold text-primary">{paymentData.user.current_credits} créditos</span>
            </div>

            {paymentData.history?.payment_method && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Método:</span>
                <div className="flex items-center gap-1">
                  <CreditCard className="w-4 h-4" />
                  <span className="font-semibold capitalize">{paymentData.history.payment_method}</span>
                </div>
              </div>
            )}
          </div>

          {/* Receipt Link */}
          {paymentData.history?.receipt_url && (
            <div className="mb-6">
              <a
                href={paymentData.history.receipt_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                Ver comprovante →
              </a>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link to="/generate" className="block">
              <Button className="w-full bg-gradient-primary text-white">
                Começar a Gerar Imagens
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            
            <Link to="/" className="block">
              <Button variant="outline" className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}