import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { isValidEmail, getPasswordStrength, createUserProfile } from "@/lib/auth-helpers";
import { Eye, EyeOff, Mail, Lock, User, Loader2, ArrowRight, Sparkles, CheckCircle2, XCircle } from "lucide-react";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});

  const navigate = useNavigate();
  const { toast } = useToast();

  const passwordStrength = getPasswordStrength(password);

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 30) return "bg-destructive";
    if (passwordStrength < 60) return "bg-orange-500";
    if (passwordStrength < 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 30) return "Fraca";
    if (passwordStrength < 60) return "Razoável";
    if (passwordStrength < 80) return "Boa";
    return "Forte";
  };

  const passwordRequirements = [
    { met: password.length >= 8, text: "Pelo menos 8 caracteres" },
    { met: /[A-Z]/.test(password), text: "Uma letra maiúscula" },
    { met: /[a-z]/.test(password), text: "Uma letra minúscula" },
    { met: /[0-9]/.test(password), text: "Um número" },
    { met: /[^a-zA-Z0-9]/.test(password), text: "Um caractere especial (opcional)" },
  ];

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!fullName) {
      newErrors.fullName = "Nome completo é obrigatório";
    } else if (fullName.length < 3) {
      newErrors.fullName = "Nome deve ter pelo menos 3 caracteres";
    }

    if (!email) {
      newErrors.email = "Email é obrigatório";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Email inválido";
    }

    if (!password) {
      newErrors.password = "Senha é obrigatória";
    } else if (password.length < 8) {
      newErrors.password = "Senha deve ter pelo menos 8 caracteres";
    } else if (passwordStrength < 60) {
      newErrors.password = "Senha muito fraca. Torne-a mais segura.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não correspondem";
    }

    if (!acceptTerms) {
      newErrors.terms = "Você deve aceitar os termos de uso";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    console.log("Starting signup process for:", email);
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

      console.log("Signup response:", { data, error });
      console.log("User object:", data?.user);
      console.log("User ID:", data?.user?.id);
      console.log("Session:", data?.session);

      // Se houver erro de "Database error saving new user", o usuário foi criado mas o trigger falhou
      // Neste caso, vamos tentar criar o perfil manualmente
      if (error && error.message?.includes("Database error saving new user")) {
        console.warn("Trigger failed, attempting manual profile creation...");

        // Fazer login para obter o usuário criado
        const { data: loginData } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (loginData.user) {
          try {
            await createUserProfile(loginData.user.id, email, fullName);

            toast({
              title: "Cadastro realizado com sucesso!",
              description: "Bem-vindo ao Psynka Studio!",
            });
            navigate("/");
            return;
          } catch (profileError: any) {
            console.error("Profile creation error:", profileError);
            // Se já existe, apenas faz login
            if (profileError.message?.includes("duplicate key")) {
              toast({
                title: "Cadastro realizado com sucesso!",
                description: "Bem-vindo ao Psynka Studio!",
              });
              navigate("/");
              return;
            }
          }
        }
      }

      if (error) throw error;

      console.log("Signup completed - data:", data);

      // Quando há confirmação de email habilitada:
      // - data.user existe mas data.session é null
      // - O trigger handle_new_user já criou o perfil e créditos
      // - Não precisamos criar o perfil manualmente

      if (data?.user && !data?.session) {
        // Email confirmation is required
        console.log("User created but email confirmation required");
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Por favor, verifique seu email para confirmar sua conta.",
        });
        navigate("/auth/login");
      } else if (data?.user && data?.session) {
        // Email confirmation is disabled, user is logged in
        console.log("User created and logged in:", data.user.id);

        // Só tenta criar o perfil se o trigger não tiver criado
        // Isso só acontece se o trigger falhar
        try {
          const userId = data.user.id;
          if (!userId) {
            throw new Error("User ID não disponível");
          }

          // Verifica se o perfil já existe
          const { data: existingProfile } = await supabase
            .from("studio_user_profiles")
            .select("user_id")
            .eq("user_id", userId)
            .single();

          if (!existingProfile) {
            console.log("Profile not found, creating manually...");
            await createUserProfile(userId, email, fullName);
          }
        } catch (error: any) {
          // Ignora erro se o perfil já existe
          if (!error.message?.includes("duplicate key") && !error.code?.includes("PGRST116")) {
            console.error("Error checking/creating profile:", error);
          }
        }
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Bem-vindo ao Psynka Studio!",
        });
        navigate("/");
      }
    } catch (error: any) {
      console.error("Signup error:", error);

      let errorMessage = "Não foi possível criar sua conta. Tente novamente.";

      if (error.message?.includes("User already registered")) {
        errorMessage = "Este email já está cadastrado";
      } else if (error.message?.includes("Database error")) {
        errorMessage = "Erro no banco de dados. Por favor, tente fazer login.";
      }

      toast({
        title: "Erro no cadastro",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
            Crie sua conta e comece a gerar imagens incríveis
          </p>
        </div>

        {/* Signup Form */}
        <Card className="p-6 glass-morphism border-border/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Full Name Field */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="João Silva"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      setErrors({ ...errors, fullName: undefined });
                    }}
                    className={`pl-10 ${errors.fullName ? "border-destructive" : ""}`}
                    disabled={loading}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-destructive">{errors.fullName}</p>
                )}
              </div>

              {/* Email Field */}
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
                      setErrors({ ...errors, email: undefined });
                    }}
                    className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                    disabled={loading}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors({ ...errors, password: undefined });
                    }}
                    className={`pl-10 pr-10 ${errors.password ? "border-destructive" : ""}`}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Força da senha:</span>
                      <span className={`text-xs font-medium ${passwordStrength >= 80 ? "text-green-500" : "text-muted-foreground"}`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <Progress value={passwordStrength} className="h-1">
                      <div className={`h-full ${getPasswordStrengthColor()}`} />
                    </Progress>
                    <div className="space-y-1 mt-2">
                      {passwordRequirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          {req.met ? (
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                          ) : (
                            <XCircle className="h-3 w-3 text-muted-foreground" />
                          )}
                          <span className={req.met ? "text-green-500" : "text-muted-foreground"}>
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setErrors({ ...errors, confirmPassword: undefined });
                    }}
                    className={`pl-10 pr-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-destructive">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => {
                    setAcceptTerms(checked as boolean);
                    setErrors({ ...errors, terms: undefined });
                  }}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Aceito os{" "}
                  <Link to="/terms" className="text-primary hover:text-primary/90">
                    Termos de Uso
                  </Link>{" "}
                  e a{" "}
                  <Link to="/privacy" className="text-primary hover:text-primary/90">
                    Política de Privacidade
                  </Link>
                </label>
              </div>
              {errors.terms && (
                <p className="text-xs text-destructive">{errors.terms}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando conta...
                </>
              ) : (
                <>
                  Criar conta
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link
                to="/auth/login"
                className="text-primary hover:text-primary/90 font-medium transition-colors"
              >
                Faça login
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}