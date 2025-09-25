import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditDisplay } from "@/components/ui/credit-display";
import { MobileNavigation } from "@/components/ui/navigation";
import { Sparkles, Zap, Brain, Heart, ArrowRight, Play, Image as ImageIcon, Palette, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { clearThumbnailCache } from "@/data/templateCategories";

export default function Home() {
  const userCredits = 15;

  // Limpar cache de thumbnails para garantir que as imagens de referência reais sejam exibidas
  useEffect(() => {
    clearThumbnailCache();
  }, []);

  // Templates organizados por categoria para scroll horizontal
  const templateCategories = [
    {
      title: "Professional",
      templates: [
        {
          id: "professional-headshot",
          title: "Professional Headshot", 
          image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop&sat=2&con=1.2",
          prompt: "Transform this person into a professional psychologist headshot with modern office background, professional lighting, wearing elegant business attire, confident expression, high-quality LinkedIn-style photo"
        },
        {
          id: "corporate-portrait", 
          title: "Corporate Portrait",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&sat=2&con=1.2", 
          prompt: "Create a professional corporate portrait of this person as a psychologist, formal business attire, clean background, professional studio lighting"
        },
        {
          id: "linkedin-photo", 
          title: "LinkedIn Photo",
          image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=600&fit=crop&sat=2&con=1.2", 
          prompt: "Generate a professional LinkedIn profile photo of this person as a psychology professional, modern background, professional attire, approachable expression"
        },
        {
          id: "business-casual",
          title: "Business Casual",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop&sat=2&con=1.2",
          prompt: "Create a business casual portrait of this person as a modern psychologist, relaxed professional attire, contemporary office setting, approachable and confident demeanor"
        },
        {
          id: "executive-portrait",
          title: "Executive Portrait",
          image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=600&fit=crop&sat=2&con=1.2",
          prompt: "Transform this person into an executive-level psychology professional, premium business attire, sophisticated office background, authoritative yet approachable presence"
        },
        {
          id: "team-leader",
          title: "Team Leader",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop&sat=2&con=1.2",
          prompt: "Create a team leadership portrait of this person as a psychology department head, professional but approachable, modern office environment, confident leadership presence"
        }
      ]
    },
    {
      title: "Therapy Office",
      templates: [
        {
          id: "therapy-office", 
          title: "Modern Office",
          image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=600&fit=crop&sat=2&con=1.2", 
          prompt: "Create a professional therapy office environment with this person as a psychologist, comfortable seating area, warm lighting, diplomas on wall, plants, calming atmosphere, professional setting"
        },
        {
          id: "cozy-office", 
          title: "Cozy Office",
          image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600&h=600&fit=crop&sat=2&con=1.2", 
          prompt: "Transform this person into a therapist in a cozy, warm office setting with comfortable furniture, soft lighting, books, plants, welcoming atmosphere"
        },
        {
          id: "clinical-office", 
          title: "Clinical Office",
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop&sat=2&con=1.2", 
          prompt: "Create a clinical psychology office setting with this person as a professional psychologist, medical-style office, diplomas, clean modern environment"
        },
        {
          id: "home-office",
          title: "Home Office",
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop&sat=2&con=1.2",
          prompt: "Transform this person into a therapist working from a professional home office, comfortable yet professional setup, natural lighting, books and plants, warm atmosphere"
        },
        {
          id: "consultation-room",
          title: "Consultation Room",
          image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=600&fit=crop&sat=2&con=1.2",
          prompt: "Create a professional consultation room setting with this person as a psychologist, two comfortable chairs, neutral colors, professional but welcoming environment"
        },
        {
          id: "group-therapy-room",
          title: "Group Therapy Room",
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&sat=2&con=1.2",
          prompt: "Transform this person into a group therapy facilitator in a spacious room with circle seating arrangement, natural light, professional yet inclusive atmosphere"
        }
      ]
    },
    {
      title: "Specialized Practice",
      templates: [
        {
          id: "child-psychologist",
          title: "Child Psychology",
          image: "https://images.unsplash.com/photo-1594736797933-d0e6e7d4b3ce?w=600&h=600&fit=crop&sat=2&con=1.2",
          prompt: "Create a child psychology specialist portrait with this person in a colorful, child-friendly office environment, toys and educational materials in background, warm and approachable demeanor"
        },
        {
          id: "couples-therapist",
          title: "Couples Therapy",
          image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop&sat=2&con=1.2",
          prompt: "Transform this person into a couples therapist in an elegant consultation room with comfortable seating for couples, sophisticated decor, professional yet empathetic presence"
        },
        {
          id: "trauma-specialist",
          title: "Trauma Specialist",
          image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=600&fit=crop&sat=2&con=1.2",
          prompt: "Create a trauma therapy specialist portrait with this person in a calming, safe-feeling environment, soft lighting, comfortable seating, professional and compassionate presence"
        },
        {
          id: "addiction-counselor",
          title: "Addiction Counselor",
          image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=600&fit=crop&sat=2&con=1.2",
          prompt: "Transform this person into an addiction counselor in a supportive therapy environment, motivational elements, professional attire, understanding and hopeful expression"
        },
        {
          id: "neuropsychologist",
          title: "Neuropsychologist",
          image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=600&fit=crop&sat=2&con=1.2",
          prompt: "Create a neuropsychology specialist with this person in a clinical setting with brain models and assessment materials, professional lab coat or business attire, scientific atmosphere"
        },
        {
          id: "forensic-psychologist",
          title: "Forensic Psychology",
          image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=600&fit=crop&sat=2&con=1.2",
          prompt: "Transform this person into a forensic psychologist in a professional consultation room, formal business attire, serious but approachable demeanor, legal/clinical environment"
        }
      ]
    },
    {
      title: "Wellness & Mindfulness",
      templates: [
        {
          id: "mindfulness-instructor",
          title: "Mindfulness Coach",
          image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=600&fit=crop&sat=2&con=1.2",
          prompt: "Create a mindfulness instructor portrait with this person in a zen-like environment, meditation cushions, plants, natural lighting, peaceful and serene expression"
        },
        {
          id: "wellness-coach",
          title: "Wellness Coach",
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&sat=2&con=1.2",
          prompt: "Transform this person into a wellness coach in a bright, positive environment with natural elements, inspiring decor, healthy lifestyle aesthetic, energetic presence"
        },
        {
          id: "meditation-teacher",
          title: "Meditation Teacher",
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop&sat=2&con=1.2",
          prompt: "Create a meditation teacher portrait with this person in a tranquil space, soft lighting, minimal decor, sitting meditation pose, calm and centered expression"
        },
        {
          id: "life-coach",
          title: "Life Coach",
          image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=600&h=600&fit=crop&sat=2&con=1.2",
          prompt: "Transform this person into a life coach in an inspiring office space, motivational books and quotes, bright lighting, confident and encouraging presence"
        },
        {
          id: "stress-management",
          title: "Stress Management",
          image: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=600&h=600&fit=crop&sat=2&con=1.2",
          prompt: "Create a stress management specialist with this person in a calming environment, stress-relief tools, comfortable seating, professional yet relaxing atmosphere"
        },
        {
          id: "holistic-therapist",
          title: "Holistic Therapist",
          image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=600&fit=crop&sat=2&con=1.2",
          prompt: "Transform this person into a holistic therapist with natural elements, crystals, plants, warm lighting, integrative healing environment, nurturing presence"
        }
      ]
    }
  ];

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
            <div className="flex flex-col gap-3">
              <Link to="/generate">
                <Button className="bg-white text-primary hover:bg-white/90 w-full">
                  <Wand2 className="mr-2 h-4 w-4" />
                  Começar Agora
                </Button>
              </Link>
              <div className="flex gap-2">
                <Link to="/thumbnail-generator" className="flex-1">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 w-full text-xs">
                    <ImageIcon className="mr-1 h-3 w-3" />
                    Gerar Thumbnails
                  </Button>
                </Link>
                <Link to="/custom-thumbnails" className="flex-1">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 w-full text-xs">
                    <Sparkles className="mr-1 h-3 w-3" />
                    Thumbnails Personalizadas
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Template Categories with Carousel */}
      <div className="space-y-8">
        {templateCategories.map((category, categoryIndex) => (
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
              {category.templates.slice(0, 4).map((template) => (
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