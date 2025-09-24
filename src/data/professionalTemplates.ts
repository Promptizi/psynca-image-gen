import { ProfessionalTemplate } from "@/services/imageGeneration";

export const professionalTemplates: ProfessionalTemplate[] = [
  {
    id: "psychologist-modern",
    title: "Psicólogo Moderno",
    description: "Ambiente profissional com consultório contemporâneo",
    referenceImage: "/templates/psychologist-modern.jpg",
    category: "therapy",
    prompt: "Professional psychologist sitting in modern therapy office, wearing elegant business attire, comfortable leather chair, warm ambient lighting, diplomas and certificates on wall, wooden bookshelves with psychology books, small plants, neutral colors, professional and welcoming atmosphere, high-quality professional headshot"
  },
  {
    id: "therapist-cozy",
    title: "Terapeuta Acolhedor", 
    description: "Espaço terapêutico aconchegante e caloroso",
    referenceImage: "/templates/therapist-cozy.jpg",
    category: "therapy",
    prompt: "Warm and approachable therapist in cozy consultation room, soft natural lighting from large window, comfortable fabric armchair, plants and flowers, warm earth tones, relaxed professional clothing, welcoming smile, books on mental health, calming and peaceful environment"
  },
  {
    id: "clinical-psychologist",
    title: "Psicólogo Clínico",
    description: "Ambiente clínico profissional e confiável",
    referenceImage: "/templates/clinical.jpg", 
    category: "clinical",
    prompt: "Clinical psychologist in professional white coat, modern medical facility setting, clean and minimalist office, medical diplomas on wall, professional desk with notebook, formal business attire, confident and trustworthy appearance, bright clinical lighting"
  },
  {
    id: "child-psychologist",
    title: "Psicólogo Infantil",
    description: "Especialista em atendimento a crianças",
    referenceImage: "/templates/child-psychologist.jpg",
    category: "specialized", 
    prompt: "Child psychologist in colorful and friendly office, toys and educational materials in background, bright and cheerful environment, casual professional clothing, warm and approachable demeanor, small table and colorful chairs, drawing materials, child-friendly atmosphere"
  },
  {
    id: "couples-therapist",
    title: "Terapeuta de Casal",
    description: "Especialista em terapia de relacionamento",
    referenceImage: "/templates/couples-therapist.jpg",
    category: "specialized",
    prompt: "Couples therapist in elegant consultation room with comfortable sofa seating, sophisticated and neutral decor, soft lighting, plants, relationship and communication books, professional yet warm atmosphere, confident and empathetic appearance"
  },
  {
    id: "mindfulness-instructor",
    title: "Instrutor de Mindfulness",
    description: "Especialista em meditação e bem-estar",
    referenceImage: "/templates/mindfulness.jpg",
    category: "wellness",
    prompt: "Mindfulness instructor in peaceful zen-like environment, meditation cushions, plants and natural elements, soft natural lighting, earth-tone clothing, serene and calm expression, wooden floors, minimalist decor, tranquil and meditative atmosphere"
  },
  {
    id: "neuropsychologist",
    title: "Neuropsicólogo",
    description: "Especialista em neuropsicologia",
    referenceImage: "/templates/neuropsychologist.jpg",
    category: "specialized",
    prompt: "Neuropsychologist in modern clinical setting, brain anatomy models in background, scientific books and journals, professional lab coat or business attire, computer with brain scans, sophisticated medical equipment, intellectual and scientific atmosphere"
  },
  {
    id: "online-therapist",
    title: "Terapeuta Online",
    description: "Profissional para atendimento virtual",
    referenceImage: "/templates/online-therapist.jpg",
    category: "virtual",
    prompt: "Online therapist in home office setup, professional background with books and plants, good lighting for video calls, modern computer or laptop visible, comfortable chair, neat and organized space, professional but approachable appearance for virtual sessions"
  }
];

export const getTemplatesByCategory = (category: string) => {
  return professionalTemplates.filter(template => template.category === category);
};

export const getTemplateById = (id: string) => {
  return professionalTemplates.find(template => template.id === id);
};