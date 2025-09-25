import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MobileNavigation } from "@/components/ui/navigation";
import { Search, Filter, Download, Share2, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Gallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = [
    { id: "all", label: "Todas" },
    { id: "therapy", label: "Terapia" },
    { id: "mindfulness", label: "Mindfulness" },
    { id: "emotions", label: "Emoções" },
    { id: "nature", label: "Natureza" }
  ];

  // Mock data for generated images
  const generatedImages = [
    { id: 1, category: "therapy", prompt: "Ambiente terapêutico acolhedor", date: "2024-01-15" },
    { id: 2, category: "mindfulness", prompt: "Cena de meditação tranquila", date: "2024-01-14" },
    { id: 3, category: "emotions", prompt: "Representação visual da alegria", date: "2024-01-13" },
    { id: 4, category: "nature", prompt: "Floresta para terapia natural", date: "2024-01-12" },
    { id: 5, category: "therapy", prompt: "Consultório moderno", date: "2024-01-11" },
    { id: 6, category: "emotions", prompt: "Expressão de calma", date: "2024-01-10" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="px-4 py-6 flex items-center gap-3">
        <Link to="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold">Galeria</h1>
          <p className="text-sm text-muted-foreground">Suas criações com IA</p>
        </div>
      </header>

      {/* Search */}
      <section className="px-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar imagens..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-card/50 border-border/50 focus:border-primary"
          />
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter.id)}
              className={`flex-shrink-0 ${
                selectedFilter === filter.id
                  ? 'bg-gradient-primary text-white border-0'
                  : 'border-border/50'
              }`}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-4">
        <div className="grid grid-cols-2 gap-4">
          {generatedImages.map((image) => (
            <Card key={image.id} className="overflow-hidden bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 group">
              {/* Image Placeholder */}
              <div className="aspect-square bg-gradient-card flex items-center justify-center relative">
                <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2">
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Image Info */}
              <div className="p-3">
                <p className="text-sm font-medium line-clamp-2 mb-1">{image.prompt}</p>
                <p className="text-xs text-muted-foreground">{new Date(image.date).toLocaleDateString('pt-BR')}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {generatedImages.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma imagem ainda</h3>
            <p className="text-muted-foreground mb-6">Comece gerando sua primeira imagem com IA</p>
            <Link to="/generate">
              <Button className="bg-gradient-primary text-white border-0">
                Gerar Primeira Imagem
              </Button>
            </Link>
          </div>
        )}
      </section>

      <MobileNavigation />
    </div>
  );
}