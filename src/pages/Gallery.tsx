import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MobileNavigation } from "@/components/ui/navigation";
import { Search, Download, Share2, ArrowLeft, Image as ImageIcon, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GeneratedImage {
  id: string;
  prompt: string;
  image_url: string;
  created_at: string;
  template_id: string | null;
  generation_params: any;
}

export default function Gallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const filters = [
    { id: "all", label: "Todas" },
    { id: "recent", label: "Recentes" },
    { id: "older", label: "Antigas" }
  ];

  useEffect(() => {
    if (user?.id) {
      fetchImages();
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  const fetchImages = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('studio_generated_images')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error: any) {
      console.error('Error fetching images:', error);
      toast({
        title: "Erro ao carregar imagens",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredImages = images
    .filter(img => {
      const matchesSearch = img.prompt.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchesSearch) return false;

      if (selectedFilter === "recent") {
        const dayAgo = new Date();
        dayAgo.setDate(dayAgo.getDate() - 7);
        return new Date(img.created_at) > dayAgo;
      }
      if (selectedFilter === "older") {
        const dayAgo = new Date();
        dayAgo.setDate(dayAgo.getDate() - 7);
        return new Date(img.created_at) <= dayAgo;
      }
      return true;
    });

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
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {images.length === 0 ? "Nenhuma imagem ainda" : "Nenhum resultado encontrado"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {images.length === 0
                ? "Comece gerando sua primeira imagem com IA"
                : "Tente ajustar os filtros ou termos de busca"}
            </p>
            {images.length === 0 && (
              <Link to="/generate">
                <Button className="bg-gradient-primary text-white border-0">
                  Gerar Primeira Imagem
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredImages.map((image) => (
              <Card
                key={image.id}
                className="overflow-hidden bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                {/* Image */}
                <div className="aspect-square bg-gradient-card relative overflow-hidden">
                  <img
                    src={image.image_url}
                    alt={image.prompt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const icon = document.createElement('div');
                        icon.className = 'absolute inset-0 flex items-center justify-center';
                        icon.innerHTML = '<svg class="h-12 w-12 text-muted-foreground/50" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>';
                        parent.appendChild(icon);
                      }
                    }}
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(image.image_url, '_blank');
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(image.image_url);
                        toast({
                          title: "Link copiado!",
                          description: "O link da imagem foi copiado para a área de transferência."
                        });
                      }}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Image Info */}
                <div className="p-3">
                  <p className="text-sm font-medium line-clamp-2 mb-1">{image.prompt}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(image.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Image Detail Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Imagem</DialogTitle>
            <DialogDescription>
              Gerada em {selectedImage && new Date(selectedImage.created_at).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </DialogDescription>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-4">
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gradient-card">
                <img
                  src={selectedImage.image_url}
                  alt={selectedImage.prompt}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-2">Prompt:</h4>
                <p className="text-sm text-muted-foreground">{selectedImage.prompt}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => window.open(selectedImage.image_url, '_blank')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Baixar
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    navigator.clipboard.writeText(selectedImage.image_url);
                    toast({
                      title: "Link copiado!",
                      description: "O link da imagem foi copiado para a área de transferência."
                    });
                  }}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <MobileNavigation />
    </div>
  );
}