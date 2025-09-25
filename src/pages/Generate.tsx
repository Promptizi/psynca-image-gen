import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditDisplay } from "@/components/ui/credit-display";
import { MobileNavigation } from "@/components/ui/navigation";
import { SearchBar } from "@/components/ui/search-bar";
import { TemplateCard } from "@/components/ui/template-card";
import { UploadZone } from "@/components/ui/upload-zone";
import { Upload, Wand2, ArrowLeft, AlertCircle, Download, ArrowRight, Camera, Grid3X3, List, Filter, Check } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { imageGenerationService, ProfessionalTemplate } from "@/services/imageGeneration";
import { useToast } from "@/hooks/use-toast";
import { templateCategories, getCategoryBySlug } from "@/data/templateCategories";
import { getTemplatePlaceholder } from "@/utils/templatePlaceholders";
import { useTemplateSearch } from "@/hooks/useTemplateSearch";

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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isGenerating, setIsGenerating] = useState(false);
  const userCredits = 15;
  const { toast } = useToast();

  const {
    searchQuery,
    activeCategories,
    activeTags,
    availableTags,
    filteredCategories,
    totalFilteredTemplates,
    hasActiveFilters,
    handleSearch,
    handleCategoryToggle,
    handleTagToggle,
    clearAllFilters
  } = useTemplateSearch();

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
        description: "Por favor, use um arquivo de até 10MB",
        variant: "destructive",
      });
      return;
    }

    setUserPhoto(file);
    setStep('generating');
    setError(null);
    setGeneratedImageUrl(null);
    setIsGenerating(true);
    
    try {
      const result = await imageGenerationService.generateWithTemplate({
        userPhoto: file,
        template: selectedTemplate
      });
      
      if (result.success && result.imageUrl) {
        setGeneratedImageUrl(result.imageUrl);
        setStep('result');
        toast({
          title: "Imagem gerada com sucesso!",
          description: "Sua imagem profissional está pronta",
        });
      } else {
        setError(result.error || 'Erro ao gerar imagem profissional');
        setStep('upload');
        toast({
          title: "Erro na geração",
          description: result.error || 'Não foi possível gerar a imagem',
          variant: "destructive",
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro inesperado';
      setError(errorMessage);
      setStep('upload');
      toast({
        title: "Erro inesperado",
        description: "Tente novamente em alguns instantes",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
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
    <div className="min-h-screen bg-background pb-20">
      {/* Professional Header */}
      <header className="px-4 py-6 flex items-center justify-between">
        <Link to="/">
          <button className="p-2 transition-colors hover:bg-white/10 rounded-xl">
            <ArrowLeft className="h-6 w-6 text-white" />
          </button>
        </Link>

        <h1 className="text-xl font-semibold text-foreground">
          {step === 'template' ? 'Templates' :
           step === 'upload' ? 'Upload' :
           step === 'generating' ? 'Gerando...' : 'Resultado'}
        </h1>

        <div className="bg-card/50 px-3 py-1 rounded-xl border border-border/50">
          <span className="text-foreground text-sm font-medium flex items-center gap-1">
            {userCredits < 5 && <AlertCircle className="h-3 w-3 text-orange-400" />}
            {userCredits} créditos
          </span>
        </div>
      </header>

      {/* Template Selection with Advanced Filters */}
      {step === 'template' && (
        <div className="px-4 md:px-8 lg:px-12">
          {/* Search Section */}
          <div className="mb-6">
            <div className="flex gap-3 items-center mb-4">
              <div className="flex-1">
                <SearchBar
                  onSearch={handleSearch}
                  placeholder="Buscar templates..."
                  className="w-full"
                />
              </div>

              {/* View Toggle - moved next to search */}
              <div className="flex bg-card/50 rounded-lg p-1 border border-border/50">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'grid'
                      ? 'bg-primary/15 text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'list'
                      ? 'bg-primary/15 text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Category filters - moved to right after search */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button
                variant={activeCategories.length === 0 ? "default" : "outline"}
                size="sm"
                onClick={() => clearAllFilters()}
                className={`flex-shrink-0 ${
                  activeCategories.length === 0
                    ? 'bg-gradient-primary text-white border-0'
                    : 'border-border/50'
                }`}
              >
                Todas
              </Button>
              {templateCategories.map((category) => {
                const categorySlug = category.title.toLowerCase().replace(/\s+/g, '-');
                return (
                  <Button
                    key={categorySlug}
                    variant={activeCategories.includes(categorySlug) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryToggle(categorySlug)}
                    className={`flex-shrink-0 transition-all duration-200 hover:scale-105 active:scale-95 ${
                      activeCategories.includes(categorySlug)
                        ? 'bg-gradient-primary text-white border-0 shadow-button'
                        : 'border-border/50 hover:border-primary/50 hover:text-primary'
                    }`}
                  >
                    {category.title}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Templates Grid/List */}
          <div className="space-y-6">
            {filteredCategories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                id={`category-${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="mb-6"
              >
                {/* Templates in Grid or List - without category headers */}
                <div className={`grid gap-4 ${
                  viewMode === 'grid'
                    ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                    : 'grid-cols-1'
                }`}>
                  {category.templates.map((template, templateIndex) => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      onSelect={handleTemplateSelect}
                      isPopular={templateIndex < 2}
                      className={viewMode === 'list' ? 'list-view' : ''}
                      categoryTitle={category.title}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Empty State */}
            {filteredCategories.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-muted/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Filter className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Nenhum template encontrado
                </h3>
                <p className="text-muted-foreground mb-4">
                  Tente fazer uma busca diferente.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    clearAllFilters();
                    toast({
                      title: "Filtros removidos!",
                      description: "Todos os templates estão disponíveis novamente",
                    });
                  }}
                  className="border-border text-foreground hover:bg-accent"
                >
                  Mostrar todos
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Upload Section */}
      {step === 'upload' && selectedTemplate && (
        <section className="px-4 space-y-6">
          {/* Selected Template Preview - Compact */}
          <div className="bg-card/30 backdrop-blur-sm border border-border/30 p-3 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={getTemplatePlaceholder(selectedTemplate.id, selectedTemplate.title)}
                  alt={selectedTemplate.title}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-medium text-foreground text-sm">{selectedTemplate.title}</h3>
                  <p className="text-muted-foreground text-xs">Template selecionado</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep('template')}
                className="text-muted-foreground hover:text-foreground px-2 py-1"
              >
                <ArrowLeft className="mr-1 h-3 w-3" />
                Alterar
              </Button>
            </div>
          </div>

          {/* Upload Section */}
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground mb-2">Envie sua foto</h2>
              <p className="text-muted-foreground text-sm">
                Sua foto será transformada usando o template selecionado
              </p>
            </div>

            <UploadZone
              onFileSelect={handlePhotoUpload}
              acceptedFormats={['image/jpeg', 'image/png', 'image/webp']}
              maxSize={10}
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-destructive/20 rounded-lg flex items-center justify-center mt-0.5">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                </div>
                <div>
                  <p className="text-destructive font-medium">Erro na geração</p>
                  <p className="text-muted-foreground text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Generating Section */}
      {step === 'generating' && selectedTemplate && (
        <section className="px-4">
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <div className="space-y-6">
              {/* Simple Loader */}
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-border/30 border-t-primary rounded-full animate-spin"></div>
              </div>

              {/* Status Text */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Gerando imagem...
                </h3>
                <p className="text-muted-foreground">
                  Template: {selectedTemplate.title}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Result Section */}
      {step === 'result' && generatedImageUrl && selectedTemplate && (
        <section className="px-4">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Imagem gerada com sucesso!
                </h3>
                <p className="text-muted-foreground">
                  Template: {selectedTemplate.title}
                </p>
              </div>

              {/* Generated Image */}
              <div className="w-full rounded-xl overflow-hidden bg-muted/20">
                <img
                  src={generatedImageUrl}
                  alt="Imagem profissional gerada"
                  className="w-full h-auto object-contain max-h-[400px] rounded-xl"
                />
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => {
                    downloadImage();
                    toast({
                      title: "Download iniciado!",
                      description: "Sua imagem está sendo salva",
                    });
                  }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="lg"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Baixar
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    resetFlow();
                    toast({
                      title: "Nova geração iniciada",
                      description: "Escolha outro template",
                    });
                  }}
                  className="border-border text-foreground hover:bg-accent"
                  size="lg"
                >
                  Criar Nova
                </Button>
              </div>

              <div className="text-center pt-4">
                <Link to="/gallery">
                  <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                    <Camera className="mr-2 h-4 w-4" />
                    Ver na Galeria
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <MobileNavigation />
    </div>
  );
}