import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditDisplay } from "@/components/ui/credit-display";
import { MobileNavigation } from "@/components/ui/navigation";
import { Sparkles, Upload, Wand2, ArrowLeft, AlertCircle, Download, ArrowRight, Camera } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { imageGenerationService, ProfessionalTemplate } from "@/services/imageGeneration";
import { useToast } from "@/hooks/use-toast";
import { templateCategories, getCategoryBySlug } from "@/data/templateCategories";
import { getTemplatePlaceholder } from "@/utils/templatePlaceholders";

type GenerationStep = 'template' | 'upload' | 'generating' | 'result';

export default function Generate() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<GenerationStep>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<ProfessionalTemplate | null>(null);
  const [userPhoto, setUserPhoto] = useState<File | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const userCredits = 15;
  const { toast } = useToast();

  // Verificar se veio com categoria ou template da Home
  useEffect(() => {
    const categorySlug = searchParams.get('category');
    const templateId = searchParams.get('template');
    const prompt = searchParams.get('prompt');
    
    if (categorySlug) {
      setSelectedCategory(categorySlug);
      // Scroll para a categoria selecionada após o componente carregar
      setTimeout(() => {
        const categoryElement = document.getElementById(`category-${categorySlug}`);
        if (categoryElement) {
          categoryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
    
    if (templateId && prompt) {
      setCustomPrompt(prompt);
      setStep('upload');
      // Criar um template mock para o ID customizado
      setSelectedTemplate({
        id: templateId,
        title: templateId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        description: 'Template personalizado',
        referenceImage: '',
        category: 'custom',
        prompt: prompt
      });
    }
  }, [searchParams]);

  // Always show all categories, but scroll to selected one
  const categoriesToShow = templateCategories;

  const handleTemplateSelect = (template: { id: string; title: string; image: string; prompt: string }) => {
    // Convert template from templateCategories format to ProfessionalTemplate
    const convertedTemplate: ProfessionalTemplate = {
      id: template.id,
      title: template.title,
      description: `Template ${template.title}`,
      referenceImage: template.image,
      category: 'custom',
      prompt: template.prompt
    };
    setSelectedTemplate(convertedTemplate);
    setStep('upload');
  };
  
  const handlePhotoUpload = async (file: File) => {
    if (!selectedTemplate) return;
    
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "Por favor, envie uma imagem menor que 10MB.",
        variant: "destructive",
      });
      return;
    }
    
    setUserPhoto(file);
    setStep('generating');
    setError(null);
    setGeneratedImageUrl(null);
    
    try {
      const result = await imageGenerationService.generateWithTemplate({
        userPhoto: file,
        template: selectedTemplate
      });
      
      if (result.success && result.imageUrl) {
        setGeneratedImageUrl(result.imageUrl);
        setStep('result');
        toast({
          title: "✨ Imagem profissional criada!",
          description: "Sua foto foi transformada com sucesso.",
        });
      } else {
        setError(result.error || 'Erro ao gerar imagem profissional');
        setStep('upload');
        toast({
          title: "Erro na geração",
          description: result.error || 'Erro ao gerar imagem profissional',
          variant: "destructive",
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro inesperado';
      setError(errorMessage);
      setStep('upload');
      toast({
        title: "Erro na geração",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const downloadImage = () => {
    if (generatedImageUrl) {
      const link = document.createElement('a');
      link.href = generatedImageUrl;
      link.download = `psynca-professional-${selectedTemplate?.id}-${Date.now()}.png`;
      link.click();
    }
  };
  
  const resetFlow = () => {
    setStep('template');
    setSelectedTemplate(null);
    setUserPhoto(null);
    setGeneratedImageUrl(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#1a1625] pb-20">
      {/* Header simples como Artifex */}
      <header className="px-4 py-6 flex items-center justify-between">
        <Link to="/">
          <button className="p-2">
            <ArrowLeft className="h-6 w-6 text-white" />
          </button>
        </Link>
        <h1 className="text-xl font-bold text-white">
          {step === 'template' ? 'Templates' : 
           step === 'upload' ? 'Upload' :
           step === 'generating' ? 'Processing...' : 'Result'}
        </h1>
        <div className="bg-purple-600 px-3 py-1 rounded-full">
          <span className="text-white text-sm font-bold">{userCredits}</span>
        </div>
      </header>

      {/* Templates com filtros de categoria */}
      {step === 'template' && (
        <div className="px-4 md:px-8 lg:px-12">
          {/* Category Filters */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 px-2">Categorias</h2>
            <div className="flex space-x-3 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`flex-shrink-0 backdrop-blur-md border px-4 md:px-6 py-2 md:py-3 rounded-2xl text-sm md:text-base font-medium transition-all ${
                  !selectedCategory 
                    ? 'bg-gradient-to-r from-purple-500/40 to-blue-500/40 border-purple-500/50 text-white' 
                    : 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/30 text-white/70 hover:from-purple-500/30 hover:to-blue-500/30'
                }`}
              >
                Todas
              </button>
              {templateCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const categorySlug = category.title.toLowerCase().replace(/\s+/g, '-');
                    setSelectedCategory(categorySlug);
                    const categoryElement = document.getElementById(`category-${categorySlug}`);
                    if (categoryElement) {
                      categoryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`flex-shrink-0 backdrop-blur-md border px-4 md:px-6 py-2 md:py-3 rounded-2xl text-sm md:text-base font-medium transition-all ${
                    selectedCategory === category.title.toLowerCase().replace(/\s+/g, '-')
                      ? 'bg-gradient-to-r from-purple-500/40 to-blue-500/40 border-purple-500/50 text-white' 
                      : 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/30 text-white/70 hover:from-purple-500/30 hover:to-blue-500/30'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          {/* Templates por categoria com scroll horizontal */}
          <div className="space-y-8 md:space-y-12">
            {categoriesToShow.map((category, categoryIndex) => (
              <div 
                key={categoryIndex} 
                id={`category-${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="mb-8"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between mb-4 md:mb-6 px-2">
                  <div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">{category.title}</h3>
                    <p className="text-white/70 text-sm md:text-base">{category.description}</p>
                  </div>
                </div>

                {/* Templates em scroll horizontal */}
                <div className="flex space-x-4 md:space-x-6 overflow-x-auto pb-4">
                  {category.templates.map((template) => (
                    <div
                      key={template.id}
                      className="relative flex-shrink-0 w-48 md:w-56 lg:w-64 rounded-2xl overflow-hidden cursor-pointer group"
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <img
                        src={template.image}
                        alt={template.title}
                        className="w-full h-56 md:h-64 lg:h-72 object-cover filter saturate-150 contrast-110 group-hover:saturate-200 transition-all duration-300"
                      />
                      {/* Neon glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20 mix-blend-overlay" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="text-white font-bold text-sm md:text-base mb-2">{template.title}</h4>
                        <div className="flex justify-center">
                          <button className="bg-gradient-to-r from-purple-500 to-pink-500 backdrop-blur-md px-4 md:px-5 py-1.5 md:py-2 rounded-full text-white text-xs md:text-sm font-semibold shadow-lg hover:shadow-purple-500/50 transition-all">
                            Usar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: Photo Upload - Artifex Style */}
      {step === 'upload' && selectedTemplate && (
        <section className="px-6">
          {/* Selected Template Preview */}
          <div className="glass-morphism p-6 rounded-3xl mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src={getTemplatePlaceholder(selectedTemplate.id, selectedTemplate.title)}
                alt={selectedTemplate.title}
                className="w-20 h-20 rounded-2xl object-cover"
              />
              <div className="flex-1">
                <h3 className="font-bold text-white text-xl">{selectedTemplate.title}</h3>
                <p className="text-white/70 mb-3">{selectedTemplate.description}</p>
                <button 
                  onClick={() => setStep('template')}
                  className="flex items-center text-purple-300 hover:text-white transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Trocar estilo
                </button>
              </div>
            </div>
          </div>
          
          {/* Photo Upload Area - Artifex Style */}
          <div className="glass-morphism rounded-3xl p-8 text-center mb-6">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handlePhotoUpload(file);
              }}
              className="hidden"
              id="photo-upload"
            />
            <label htmlFor="photo-upload" className="cursor-pointer block">
              <div className="space-y-6">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl mx-auto flex items-center justify-center">
                  <Camera className="h-12 w-12 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Envie sua foto</h3>
                  <p className="text-white/70 text-lg mb-6">
                    Escolha uma foto clara do seu rosto para melhor resultado
                  </p>
                  <div className="space-y-3 text-white/60 text-sm">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Foto frontal e bem iluminada</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Rosto visível e centralizado</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>JPG ou PNG até 10MB</span>
                    </div>
                  </div>
                </div>
              </div>
            </label>
          </div>
          
          {/* Error Display */}
          {error && (
            <div className="glass-morphism border-red-500/30 p-6 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <p className="text-red-400 font-bold text-lg">Erro na geração</p>
                  <p className="text-white/60 mt-2">{error}</p>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* STEP 3: Generating - Artifex Style */}
      {step === 'generating' && selectedTemplate && (
        <section className="px-6">
          <div className="glass-morphism rounded-3xl p-12 text-center">
            <div className="space-y-8">
              {/* Animated Loader */}
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="w-32 h-32 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Wand2 className="h-10 w-10 text-white animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Status Text */}
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">Criando Magia IA</h3>
                <p className="text-white/70 text-lg mb-6">
                  Transformando sua foto no estilo: <span className="font-bold text-purple-300">{selectedTemplate.title}</span>
                </p>
                
                {/* Features */}
                <div className="space-y-4 text-white/60">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span>✨ Mantendo sua identidade única</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-100"></div>
                    <span>🎨 Aplicando estilo profissional</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-200"></div>
                    <span>⚡ Processando com Gemini 2.5</span>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse transition-all duration-1000" style={{ width: '70%' }}></div>
              </div>
              
              <p className="text-white/50 text-sm">Isso pode levar alguns segundos...</p>
            </div>
          </div>
        </section>
      )}

      {/* STEP 4: Result */}
      {step === 'result' && generatedImageUrl && selectedTemplate && (
        <section className="px-4 space-y-6">
          <Card className="p-6 bg-gradient-card border border-primary/20">
            <div className="space-y-6">
              {/* Result Header */}
              <div className="text-center">
                <h3 className="text-2xl font-bold gradient-text mb-2">✨ Sua Foto Profissional</h3>
                <p className="text-muted-foreground">Estilo: {selectedTemplate.title}</p>
              </div>
              
              {/* Generated Image */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative w-full rounded-2xl overflow-hidden bg-muted/20">
                  <img 
                    src={generatedImageUrl} 
                    alt="Imagem profissional gerada"
                    className="w-full h-auto object-contain max-h-[400px] rounded-2xl"
                  />
                </div>
              </div>
              
              {/* Actions */}
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={downloadImage}
                  className="bg-gradient-primary text-white hover:scale-105 transition-transform duration-200"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button 
                  variant="outline"
                  onClick={resetFlow}
                  className="border-border/50 hover:border-primary/50"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Nova Foto
                </Button>
              </div>
              
              <div className="text-center">
                <Link to="/gallery">
                  <Button variant="ghost" className="text-primary hover:text-accent">
                    Ver na Galeria
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </section>
      )}

      <MobileNavigation />
    </div>
  );
}