import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditDisplay } from "@/components/ui/credit-display";
import { MobileNavigation } from "@/components/ui/navigation";
import { Sparkles, Zap, Brain, Heart, ArrowRight, Play, Image as ImageIcon, Palette, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const userCredits = 15;

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
    <div className="min-h-screen bg-[#1a1625] pb-20">
      {/* Header como Artifex */}
      <header className="px-4 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Psynka</h1>
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full text-white text-sm font-semibold">
          Get Pro
        </button>
      </header>

      {/* Hero Card como Artifex - Responsivo */}
      <div className="px-4 mb-8 md:px-8 lg:px-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900 to-blue-900 p-6 md:p-8 lg:p-10 max-w-6xl mx-auto">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
              Eleve suas Imagens
            </h2>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
              com Magia de IA
            </h2>
            <p className="text-white/70 mb-6 md:text-lg">Transforme suas imagens com Magia IA</p>
            <Link to="/generate">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full text-white font-semibold md:px-8 md:py-4 md:text-lg">
                Explore Agora
              </button>
            </Link>
          </div>
          {/* Imagem de fundo hero */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 md:w-2/5 lg:w-1/3">
            <img 
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&sat=2&con=1.2"
              alt="Professional"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
      </div>

      {/* Categories - 1 exemplo por categoria em boxes grandes */}
      <div className="px-4 md:px-8 lg:px-12 max-w-4xl mx-auto space-y-8">
        {templateCategories.map((category, categoryIndex) => (
          <Link key={categoryIndex} to={`/generate?category=${encodeURIComponent(category.title.toLowerCase().replace(/\s+/g, '-'))}`}>
            <div className="relative rounded-3xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-8 mb-4">
              <div className="flex items-center space-x-6">
                {/* Texto da categoria */}
                <div className="flex-1 z-10 relative">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{category.title}</h2>
                  <p className="text-white/70 text-sm md:text-base mb-4">
                    {categoryIndex === 0 && "Retratos profissionais e corporativos"}
                    {categoryIndex === 1 && "Ambientes de consultório e terapia"}
                    {categoryIndex === 2 && "Especialidades em psicologia clínica"}
                    {categoryIndex === 3 && "Bem-estar e práticas integrativas"}
                  </p>
                  <div className="flex items-center text-purple-300 text-sm font-medium">
                    <span>{category.templates.length} templates</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
                
                {/* Imagem exemplo da categoria */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden flex-shrink-0">
                  <img 
                    src={category.templates[0].image}
                    alt={category.title}
                    className="w-full h-full object-cover filter saturate-150 contrast-110"
                  />
                </div>
              </div>
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10 mix-blend-overlay" />
            </div>
          </Link>
        ))}
      </div>

      <MobileNavigation />
    </div>
  );
}