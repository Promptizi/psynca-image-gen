import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreditDisplay } from "@/components/ui/credit-display";
import { MobileNavigation } from "@/components/ui/navigation";
import { Sparkles, Upload, Wand2, Image, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Generate() {
  const [prompt, setPrompt] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const userCredits = 15;

  const templates = [
    {
      id: "therapy-session",
      name: "Sessão Terapêutica",
      description: "Ambiente acolhedor para terapia",
      preview: "🛋️"
    },
    {
      id: "mindfulness",
      name: "Mindfulness",
      description: "Cenas de meditação e relaxamento",
      preview: "🧘"
    },
    {
      id: "emotions",
      name: "Emoções",
      description: "Representações visuais de sentimentos",
      preview: "😊"
    },
    {
      id: "nature-therapy",
      name: "Terapia Natural",
      description: "Conexão com a natureza",
      preview: "🌿"
    }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim() || userCredits < 1) return;
    
    setIsGenerating(true);
    // Simulate generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
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
            <h1 className="text-xl font-bold">Gerar Imagem</h1>
            <p className="text-sm text-muted-foreground">Crie com IA especializada</p>
          </div>
        </div>
        <CreditDisplay credits={userCredits} />
      </header>

      {/* Templates */}
      <section className="px-4 mb-6">
        <h3 className="text-lg font-bold mb-4">Templates Especializados</h3>
        <div className="grid grid-cols-2 gap-3">
          {templates.map((template) => (
            <Card 
              key={template.id}
              className={`p-4 cursor-pointer transition-all duration-300 ${
                selectedTemplate === template.id
                  ? 'border-primary bg-primary/10 shadow-card'
                  : 'border-border/50 hover:border-primary/50'
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <div className="text-2xl mb-2">{template.preview}</div>
              <h4 className="font-semibold text-sm">{template.name}</h4>
              <p className="text-xs text-muted-foreground">{template.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Photo Upload */}
      <section className="px-4 mb-6">
        <h3 className="text-lg font-bold mb-4">Foto Base (Opcional)</h3>
        <Card className="p-6 border-dashed border-2 border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
          <div className="flex flex-col items-center gap-3 text-center">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="font-medium">Envie uma foto</p>
              <p className="text-sm text-muted-foreground">PNG, JPG até 10MB</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Prompt Input */}
      <section className="px-4 mb-6">
        <h3 className="text-lg font-bold mb-4">Descreva sua imagem</h3>
        <Textarea
          placeholder="Ex: Um ambiente terapêutico acolhedor com tons suaves e iluminação natural..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-24 bg-card/50 border-border/50 focus:border-primary"
        />
      </section>

      {/* Generation Button */}
      <div className="px-4">
        <Button 
          onClick={handleGenerate}
          disabled={!prompt.trim() || userCredits < 1 || isGenerating}
          className="w-full bg-gradient-primary text-white border-0 hover:opacity-90 shadow-button py-6 text-lg font-semibold"
        >
          {isGenerating ? (
            <>
              <Wand2 className="mr-2 h-5 w-5 animate-spin" />
              Gerando...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Gerar Imagem (1 crédito)
            </>
          )}
        </Button>
        
        {userCredits < 1 && (
          <p className="text-sm text-destructive text-center mt-2">
            Créditos insuficientes. <Link to="/credits" className="text-primary hover:text-accent">Comprar mais</Link>
          </p>
        )}
      </div>

      {/* Generated Result */}
      {isGenerating && (
        <section className="px-4 mt-8">
          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <Wand2 className="h-5 w-5 text-primary animate-spin" />
              <span className="font-medium">Criando sua imagem...</span>
            </div>
            <div className="w-full h-40 bg-muted/30 rounded-lg flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          </Card>
        </section>
      )}

      <MobileNavigation />
    </div>
  );
}