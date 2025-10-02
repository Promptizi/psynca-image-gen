import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MobileNavigation } from "@/components/ui/navigation";
import {
  ArrowLeft,
  Send,
  MessageCircle,
  Mail,
  FileQuestion,
  BookOpen,
  Loader2,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Support() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Form state
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const categories = [
    { value: "technical", label: "Problema Técnico" },
    { value: "billing", label: "Faturamento e Créditos" },
    { value: "account", label: "Conta e Perfil" },
    { value: "feature", label: "Solicitação de Recurso" },
    { value: "other", label: "Outro" },
  ];

  const faqItems = [
    {
      question: "Como funcionam os créditos?",
      answer:
        "Cada imagem gerada consome 1 crédito. Você pode comprar pacotes de créditos através da página de Créditos. Os créditos não expiram e podem ser usados a qualquer momento.",
    },
    {
      question: "Posso cancelar minha compra?",
      answer:
        "Sim, você tem até 7 dias após a compra para solicitar reembolso, desde que não tenha usado os créditos. Entre em contato com nosso suporte para processar o reembolso.",
    },
    {
      question: "Qual a qualidade das imagens geradas?",
      answer:
        "As imagens são geradas em alta resolução usando tecnologia de IA avançada. Cada imagem é única e criada especificamente para suas necessidades profissionais.",
    },
    {
      question: "Posso usar as imagens comercialmente?",
      answer:
        "Sim! Todas as imagens geradas através do Psynka Studio podem ser usadas para fins comerciais e profissionais sem restrições.",
    },
    {
      question: "Como alterar minha senha?",
      answer:
        "Vá para Configurações > Segurança e clique em 'Alterar Senha'. Você receberá um email com instruções para redefinir sua senha.",
    },
    {
      question: "O que fazer se minha geração falhar?",
      answer:
        "Se uma geração falhar, seus créditos não serão consumidos. Tente novamente ou entre em contato com nosso suporte se o problema persistir.",
    },
  ];

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category || !subject || !message) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos do formulário.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      // TODO: Implement actual ticket submission to support system
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSent(true);
      toast({
        title: "Ticket enviado!",
        description: "Nossa equipe responderá em breve via email.",
      });

      // Reset form after 2 seconds
      setTimeout(() => {
        setCategory("");
        setSubject("");
        setMessage("");
        setSent(false);
      }, 2000);
    } catch (error: any) {
      console.error("Error sending ticket:", error);
      toast({
        title: "Erro ao enviar",
        description: "Não foi possível enviar seu ticket. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="px-4 py-6 flex items-center gap-3 border-b border-border/50">
        <Link to="/profile">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold">Suporte e Ajuda</h1>
          <p className="text-sm text-muted-foreground">Estamos aqui para ajudar</p>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 bg-card/50 border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
            <Link to="mailto:support@psynka.com" className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Email</p>
                <p className="text-xs text-muted-foreground">support@psynka.com</p>
              </div>
            </Link>
          </Card>

          <Card className="p-4 bg-card/50 border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="font-medium text-sm">Chat</p>
                <p className="text-xs text-muted-foreground">Em breve</p>
              </div>
            </div>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="p-6 bg-card/50 border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Perguntas Frequentes</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {/* Contact Form */}
        <Card className="p-6 bg-card/50 border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <FileQuestion className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Abrir Ticket de Suporte</h2>
          </div>

          {sent ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Ticket Enviado!</h3>
              <p className="text-muted-foreground">
                Responderemos seu chamado em até 24 horas.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email de Contato</Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="bg-muted/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Assunto</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Descreva brevemente o problema"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Descreva seu problema ou dúvida em detalhes..."
                  rows={5}
                  className="resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={sending}
                className="w-full bg-gradient-primary text-white border-0"
                size="lg"
              >
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Ticket
                  </>
                )}
              </Button>
            </form>
          )}
        </Card>

        {/* Resources */}
        <Card className="p-6 bg-card/50 border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Recursos Úteis</h2>
          </div>
          <div className="space-y-3">
            <a
              href="#"
              className="flex items-center justify-between p-3 bg-background/50 rounded-lg hover:bg-background transition-colors"
            >
              <span className="text-sm">Guia de Início Rápido</span>
              <ArrowLeft className="h-4 w-4 rotate-180 text-muted-foreground" />
            </a>
            <a
              href="#"
              className="flex items-center justify-between p-3 bg-background/50 rounded-lg hover:bg-background transition-colors"
            >
              <span className="text-sm">Melhores Práticas</span>
              <ArrowLeft className="h-4 w-4 rotate-180 text-muted-foreground" />
            </a>
            <a
              href="#"
              className="flex items-center justify-between p-3 bg-background/50 rounded-lg hover:bg-background transition-colors"
            >
              <span className="text-sm">Política de Privacidade</span>
              <ArrowLeft className="h-4 w-4 rotate-180 text-muted-foreground" />
            </a>
            <a
              href="#"
              className="flex items-center justify-between p-3 bg-background/50 rounded-lg hover:bg-background transition-colors"
            >
              <span className="text-sm">Termos de Uso</span>
              <ArrowLeft className="h-4 w-4 rotate-180 text-muted-foreground" />
            </a>
          </div>
        </Card>
      </div>

      <MobileNavigation />
    </div>
  );
}
