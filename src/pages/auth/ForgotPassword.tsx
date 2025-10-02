import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { isValidEmail } from "@/lib/auth-helpers";
import { Mail, Loader2, ArrowLeft, CheckCircle, Sparkles } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  const { toast } = useToast();

  const validateForm = () => {
    if (!email) {
      setError("Email é obrigatório");
      return false;
    }

    if (!isValidEmail(email)) {
      setError("Email inválido");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      setEmailSent(true);
      toast({
        title: "Email enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
    } catch (error: any) {
      console.error("Reset password error:", error);

      let errorMessage = "Não foi possível enviar o email de recuperação.";

      if (error.message?.includes("User not found")) {
        errorMessage = "Email não encontrado em nossa base de dados";
      }

      toast({
        title: "Erro ao enviar email",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setEmailSent(false);
    await handleSubmit(new Event('submit') as any);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />

      <div className="relative w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Psynka Studio
            </h1>
          </Link>
          <p className="text-muted-foreground mt-2">
            {emailSent
              ? "Email de recuperação enviado!"
              : "Recupere sua senha"
            }
          </p>
        </div>

        {/* Form/Success Card */}
        <Card className="p-6 glass-morphism border-border/50">
          {emailSent ? (
            <div className="space-y-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Verifique seu email</h3>
                  <p className="text-muted-foreground">
                    Enviamos um email para <strong>{email}</strong> com instruções para redefinir sua senha.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-medium">Não recebeu o email?</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Verifique sua pasta de spam</li>
                    <li>• Certifique-se de que o email está correto</li>
                    <li>• Aguarde alguns minutos</li>
                  </ul>
                </div>

                <Button
                  onClick={handleResendEmail}
                  variant="outline"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Reenviando...
                    </>
                  ) : (
                    "Reenviar email"
                  )}
                </Button>

                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  <Link to="/auth/login">
                    Voltar ao login
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Digite o email associado à sua conta e enviaremos instruções para redefinir sua senha.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    className={`pl-10 ${error ? "border-destructive" : ""}`}
                    disabled={loading}
                  />
                </div>
                {error && (
                  <p className="text-xs text-destructive">{error}</p>
                )}
              </div>

              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Enviar email de recuperação
                    </>
                  )}
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  className="w-full"
                >
                  <Link to="/auth/login">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar ao login
                  </Link>
                </Button>
              </div>
            </form>
          )}
        </Card>

        {/* Help Text */}
        <p className="text-center text-xs text-muted-foreground">
          Precisa de ajuda?{" "}
          <Link to="/support" className="text-primary hover:text-primary/90">
            Entre em contato com o suporte
          </Link>
        </p>
      </div>
    </div>
  );
}