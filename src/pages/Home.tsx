import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditDisplay } from "@/components/ui/credit-display";
import { MobileNavigation } from "@/components/ui/navigation";
import { ArrowRight, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { clearThumbnailCache, templateCategories } from "@/data/templateCategories";

export default function Home() {
  const userCredits = 15;

  // Limpar cache de thumbnails para garantir que as thumbnails geradas sejam exibidas
  useEffect(() => {
    clearThumbnailCache();
    console.log('✅ Cache limpo - carregando thumbnails geradas com IA');
  }, []);

  // Otimizar: apenas carregar os primeiros 4 templates de cada categoria para a Home
  const homeCategories = useMemo(() => {
    return templateCategories.map(category => ({
      ...category,
      templates: category.templates.slice(0, 4) // Apenas primeiros 4 para performance
    }));
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="px-4 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Psynka</h1>
        <CreditDisplay credits={userCredits} />
      </header>

      {/* Hero Card */}
      <div className="px-4 mb-8">
        <Card className="relative overflow-hidden bg-gradient-primary p-6">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-2">
              Transforme suas Imagens
            </h2>
            <p className="text-white/80 mb-4">Crie imagens profissionais com IA</p>
            <Link to="/generate">
              <Button className="bg-white text-primary hover:bg-white/90 w-full">
                <Wand2 className="mr-2 h-4 w-4" />
                Começar Agora
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Template Categories with Carousel */}
      <div className="space-y-8">
        {homeCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="px-4">
            {/* Category Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
              <Link to={`/generate?category=${encodeURIComponent(category.title.toLowerCase().replace(/\s+/g, '-'))}`}>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  Ver Todos
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>

            {/* Templates Carousel */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {category.templates.map((template) => (
                <Link
                  key={template.id}
                  to={`/generate?template=${template.id}&prompt=${encodeURIComponent(template.prompt)}`}
                  className="flex-shrink-0"
                >
                  <div className="w-32 relative">
                    <div className="aspect-square rounded-2xl overflow-hidden bg-card border border-border/50">
                      <img
                        src={template.image}
                        alt={template.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground text-center line-clamp-1">
                      {template.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <MobileNavigation />
    </div>
  );
}