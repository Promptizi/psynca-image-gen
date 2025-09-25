// Templates organizados por categoria baseados em análise de padrões visuais
// Otimizados para NanoBanana (Gemini 2.5 Flash Image) seguindo boas práticas
// Thumbnails agora usam imagens reais da pasta de referências

export interface Template {
  id: string;
  title: string;
  image: string;
  prompt: string;
  category?: string;
  tags?: string[];
}

export interface TemplateCategory {
  title: string;
  description: string;
  templates: Template[];
  color?: string;
  icon?: string;
}

// Cache para thumbnails geradas para evitar regerar constantemente
const thumbnailCache = new Map<string, string>();

// Função para limpar cache (útil durante desenvolvimento)
export const clearThumbnailCache = (): void => {
  thumbnailCache.clear();
  console.log('🗑️ Cache de thumbnails limpo');
};

// Mapeamento de imagens de referência reais para cada template
// Baseado na análise dos padrões visuais da pasta Referencia_img_prompt
const referenceImageMapping: Record<string, string> = {
  // Corporate Executive - Retratos executivos profissionais
  'executive-bw-portrait': '/Referencia_img_prompt/fcbf9043fba4c1d155c79ddcbbcc2f2d.jpg', // B&W professional
  'business-formal-suit': '/Referencia_img_prompt/96a892ae66af8001fa2fdd0a9de1be3d.jpg', // Business formal
  'corporate-leadership': '/Referencia_img_prompt/98bddbaacadf0d38cbb3ad9bac1edffc.jpg', // Leadership pose
  'linkedin-professional': '/Referencia_img_prompt/8b679a8e85572fa52abe386fb703c7db.jpg', // LinkedIn style

  // Healthcare Professional - Profissionais de saúde
  'therapist-consultation': '/Referencia_img_prompt/af247a85180365abf528c9d0cb1a8f8f.jpg', // Therapeutic setting
  'clinical-psychologist': '/Referencia_img_prompt/98efeba94ed21727d7a11cf0cba18477.jpg', // Clinical environment
  'wellness-practitioner': '/Referencia_img_prompt/e888e9bd03310fa74d9fce3e4d7323d9.jpg', // Wellness focused
  'pediatric-specialist': '/Referencia_img_prompt/68b92bd638fb43baaeddd05e461589a5.jpg', // Child-friendly

  // Creative Business - Profissionais criativos
  'coworking-professional': '/Referencia_img_prompt/79706985f4d21de08759e1af10ee42f0.jpg', // Coworking space
  'startup-founder': '/Referencia_img_prompt/0c6c8e72d4a991e2feea97eb7f240bb7.jpg', // Entrepreneurial
  'design-consultant': '/Referencia_img_prompt/9817ffd52ce0d111bc423f339d49ee26.jpg', // Design professional
  'freelancer-creative': '/Referencia_img_prompt/354ff031c5b225c11a8ca76d9903d33e.jpg', // Creative freelancer

  // Academic Consulting - Acadêmicos e consultores
  'university-professor': '/Referencia_img_prompt/5979a3263236ad5c98edf21fd059de33.jpg', // Academic setting
  'research-consultant': '/Referencia_img_prompt/a0bfb042d4bcd71a55d3713062107e04.jpg', // Research environment
  'educational-director': '/Referencia_img_prompt/aea67a524a8d4add363ac4de89ad041f.jpg', // Educational leader
  'training-specialist': '/Referencia_img_prompt/a936b361e02a67cd05a58427495f1eff.jpg', // Training context

  // Lifestyle Professional - Profissionais lifestyle
  'home-office-wellness': '/Referencia_img_prompt/090d55dd737e282186daa3e6b8b1a759.jpg', // Home office
  'mindfulness-coach': '/Referencia_img_prompt/743c04fb8dc745828a473633c9c8f54b.jpg', // Mindfulness setting
  'life-balance-coach': '/Referencia_img_prompt/5e62fc17b2498c17a0705e31b482733e.jpg', // Life coaching
  'holistic-practitioner': '/Referencia_img_prompt/c5dc29de97954f5d6ac1528782e979ab.jpg', // Holistic environment

  // Studio Portraits - Retratos de estúdio
  'classic-studio-portrait': '/Referencia_img_prompt/5cf10bdea2d17717b8d92ae41ae16e7f.jpg', // Classic portrait
  'dramatic-lighting-portrait': '/Referencia_img_prompt/6cd98f1c9ab6bebc049e27bcc74a28aa.jpg', // Dramatic lighting
  'minimalist-headshot': '/Referencia_img_prompt/e5969210290cd79b4b33bfa2e8863677.jpg', // Minimalist style
  'artistic-profile-portrait': '/Referencia_img_prompt/28340bb452e13674f93702a1e1966b2c.jpg' // Artistic profile
};

// Helper function para obter thumbnail real baseada nas imagens de referência
export const getTemplateThumbnail = (templateId: string, templateTitle: string): string => {
  // Check cache first
  if (thumbnailCache.has(templateId)) {
    return thumbnailCache.get(templateId)!;
  }

  // Get mapped reference image
  const referenceImage = referenceImageMapping[templateId];

  if (referenceImage) {
    // Cache and return reference image
    thumbnailCache.set(templateId, referenceImage);
    return referenceImage;
  }

  // Fallback para imagem de referência genérica
  const fallbackImage = '/Referencia_img_prompt/fcbf9043fba4c1d155c79ddcbbcc2f2d.jpg';
  thumbnailCache.set(templateId, fallbackImage);
  return fallbackImage;
};

export const templateCategories: TemplateCategory[] = [
  {
    title: "Corporate Executive",
    description: "Retratos executivos e empresariais profissionais",
    templates: [
      {
        id: "executive-bw-portrait",
        title: "Executive B&W Portrait",
        image: getTemplateThumbnail("executive-bw-portrait", "Executive B&W Portrait"),
        prompt: "Transforme a pessoa da foto enviada em um retrato executivo em preto e branco. Mantenha todas as características faciais, proporções e identidade originais intocadas. Coloque a pessoa em pose executiva confiante, mãos posicionadas elegantemente, vestindo terno ou blazer escuro de alta qualidade. Fundo neutro cinza claro desfocado, iluminação profissional de estúdio suave vinda da frente, estilo fotorrealista, lente retrato 85mm, alta resolução, textura de pele natural preservada. Expressão séria mas acessível, olhar direto para câmera, postura corporal confiante."
      },
      {
        id: "business-formal-suit",
        title: "Business Formal",
        image: getTemplateThumbnail("business-formal-suit", "Business Formal"),
        prompt: "Transforme a pessoa da foto enviada em um retrato business formal. Preserve completamente traços faciais, formato do rosto e identidade da pessoa. Coloque em pose profissional com mãos cruzadas ou em posição executiva, vestindo terno completo de cor escura ou blazer estruturado. Fundo corporativo desfocado em tons neutros, iluminação natural difusa, ambiente de escritório moderno ao fundo. Estilo fotorrealista, lente 85mm, textura de pele preservada, expressão confiante e profissional."
      },
      {
        id: "corporate-leadership",
        title: "Corporate Leadership",
        image: getTemplateThumbnail("corporate-leadership", "Corporate Leadership"),
        prompt: "Crie um retrato de liderança corporativa da pessoa enviada. Mantenha identidade facial completa e proporções originais. Posicione em pose de liderança, braços cruzados ou mãos entrelaçadas, vestindo roupa executiva premium. Cenário de escritório executivo com janelas ou estantes ao fundo desfocado, iluminação profissional golden hour, ambiente sofisticado. Lente 85mm retrato, alta qualidade, expressão autoritativa mas acessível, presença de comando natural."
      },
      {
        id: "linkedin-professional",
        title: "LinkedIn Professional",
        image: getTemplateThumbnail("linkedin-professional", "LinkedIn Professional"),
        prompt: "Transforme a pessoa da foto em um retrato profissional estilo LinkedIn. Preserve todos os traços faciais únicos e identidade da pessoa. Pose levemente inclinada com sorriso profissional natural, vestindo blazer ou camisa social de qualidade. Fundo neutro corporativo limpo, iluminação suave e uniforme, enquadramento busto/ombros. Estilo fotográfico profissional, lente 85mm, resolução alta, expressão acessível e confiante, adequado para redes profissionais."
      }
    ]
  },
  {
    title: "Healthcare Professional",
    description: "Profissionais de saúde e terapeutas especializados",
    templates: [
      {
        id: "therapist-consultation",
        title: "Therapeutic Setting",
        image: getTemplateThumbnail("therapist-consultation", "Therapeutic Setting"),
        prompt: "Transforme a pessoa da foto em terapeuta em ambiente de consulta. Mantenha características faciais originais completamente intocadas. Posicione sentado em poltrona confortável com postura receptiva, mãos relaxadas, vestindo roupa profissional mas acolhedora. Cenário de consultório com poltronas, plantas, iluminação natural suave, ambiente aconchegante e seguro. Lente 85mm, estilo fotorrealista, expressão empática e profissional, transmitindo confiança e acolhimento."
      },
      {
        id: "clinical-psychologist",
        title: "Clinical Psychologist",
        image: getTemplateThumbnail("clinical-psychologist", "Clinical Psychologist"),
        prompt: "Crie um retrato de psicólogo clínico da pessoa enviada. Preserve identidade facial e proporções originais. Posicione em consultório clínico com diplomas e certificações visíveis ao fundo, vestindo jaleco branco ou roupa profissional médica. Iluminação clínica limpa e profissional, ambiente médico-hospitalar, mesa com materiais de avaliação. Lente retrato 85mm, expressão séria e competente, postura profissional médica."
      },
      {
        id: "wellness-practitioner",
        title: "Wellness Practitioner",
        image: getTemplateThumbnail("wellness-practitioner", "Wellness Practitioner"),
        prompt: "Transforme a pessoa da foto em profissional de bem-estar. Mantenha todos os traços faciais e identidade originais. Posicione em ambiente de bem-estar com plantas, elementos naturais, iluminação suave e acolhedora. Vestindo roupas confortáveis mas profissionais, cores neutras ou terrosas. Expressão calorosa e acolhedora, postura relaxada mas profissional. Lente 85mm, ambiente de spa ou centro holístico, transmitindo paz e equilíbrio."
      },
      {
        id: "pediatric-specialist",
        title: "Pediatric Specialist",
        image: getTemplateThumbnail("pediatric-specialist", "Pediatric Specialist"),
        prompt: "Crie um retrato de especialista pediátrico da pessoa enviada. Preserve completamente características faciais originais. Posicione em consultório infantil colorido e acolhedor, com brinquedos educativos e decoração lúdica ao fundo. Vestindo roupa profissional mas descontraída, cores alegres ou neutras. Expressão calorosa e maternal/paternal, sorriso genuíno, postura acolhedora para crianças. Lente 85mm, ambiente child-friendly, iluminação suave e alegre."
      }
    ]
  },
  {
    title: "Creative Business",
    description: "Profissionais criativos e ambiente descontraído",
    templates: [
      {
        id: "coworking-professional",
        title: "Coworking Space",
        image: getTemplateThumbnail("coworking-professional", "Coworking Space"),
        prompt: "Transforme a pessoa da foto em profissional em ambiente coworking. Mantenha identidade facial original intocada. Posicione em espaço de trabalho colaborativo com mesa de madeira, laptop, plantas, ambiente moderno e descontraído. Vestindo business casual ou roupa criativa profissional. Iluminação natural de janelas, fundo com outros profissionais trabalhando desfocados. Lente 85mm, expressão inspirada e focada, ambiente dinâmico e criativo."
      },
      {
        id: "startup-founder",
        title: "Startup Founder",
        image: getTemplateThumbnail("startup-founder", "Startup Founder"),
        prompt: "Crie um retrato de fundador de startup da pessoa enviada. Preserve características faciais e proporções originais. Posicione em escritório moderno com elementos tech, whiteboards com ideias, ambiente inovador. Vestindo roupa casual-chic, estilo empreendedor contemporâneo. Expressão visionária e determinada, postura confiante mas acessível. Iluminação moderna LED, lente 85mm, ambiente startup dinâmico, transmitindo inovação e liderança."
      },
      {
        id: "design-consultant",
        title: "Design Consultant",
        image: getTemplateThumbnail("design-consultant", "Design Consultant"),
        prompt: "Transforme a pessoa da foto em consultor de design. Mantenha todos os traços faciais originais. Posicione em estúdio criativo com materiais de design, sketches, plantas, iluminação criativa. Vestindo roupa estilosa mas profissional, acessórios criativos sutis. Ambiente com cores e texturas interessantes, elementos artísticos. Lente 85mm, expressão criativa e inspirada, postura relaxada mas focada, transmitindo expertise criativa."
      },
      {
        id: "freelancer-creative",
        title: "Creative Freelancer",
        image: getTemplateThumbnail("freelancer-creative", "Creative Freelancer"),
        prompt: "Crie um retrato de freelancer criativo da pessoa enviada. Preserve identidade facial completamente. Posicione em home office estiloso ou café moderno, com laptop, materiais criativos, ambiente inspirador. Vestindo roupa casual-profissional única, estilo pessoal marcante. Iluminação natural acolhedora, plantas e elementos decorativos. Lente 85mm, expressão autêntica e confiante, postura relaxada, transmitindo independência criativa."
      }
    ]
  },
  {
    title: "Academic Consulting",
    description: "Consultores acadêmicos e especialistas em educação",
    templates: [
      {
        id: "university-professor",
        title: "University Professor",
        image: getTemplateThumbnail("university-professor", "University Professor"),
        prompt: "Transforme a pessoa da foto em professor universitário. Mantenha características faciais originais intocadas. Posicione em escritório acadêmico com estantes de livros, diplomas na parede, ambiente intelectual. Vestindo blazer ou casaco professoral, roupa acadêmica clássica. Iluminação de biblioteca, ambiente sério mas acessível. Lente 85mm, expressão sábia e experiente, postura acadêmica respeitável, transmitindo conhecimento e autoridade intelectual."
      },
      {
        id: "research-consultant",
        title: "Research Consultant",
        image: getTemplateThumbnail("research-consultant", "Research Consultant"),
        prompt: "Crie um retrato de consultor de pesquisa da pessoa enviada. Preserve identidade facial e proporções originais. Posicione em ambiente de pesquisa com gráficos, dados, materiais acadêmicos. Vestindo roupa profissional intelectual, estilo consultor especializado. Iluminação profissional clean, fundo com elementos de análise e pesquisa. Lente 85mm, expressão analítica e focada, postura de especialista, transmitindo expertise em pesquisa."
      },
      {
        id: "educational-director",
        title: "Educational Director",
        image: getTemplateThumbnail("educational-director", "Educational Director"),
        prompt: "Transforme a pessoa da foto em diretor educacional. Mantenha todos os traços faciais originais. Posicione em escritório educacional com certificações, materiais pedagógicos, ambiente administrativo acadêmico. Vestindo roupa executiva educacional, estilo diretor de instituição. Expressão de liderança educacional, postura administrativa profissional. Lente 85mm, iluminação institucional, transmitindo autoridade e dedicação educacional."
      },
      {
        id: "training-specialist",
        title: "Training Specialist",
        image: getTemplateThumbnail("training-specialist", "Training Specialist"),
        prompt: "Crie um retrato de especialista em treinamento da pessoa enviada. Preserve características faciais completamente. Posicione em sala de treinamento com materiais didáticos, flipcharts, ambiente de capacitação. Vestindo roupa profissional de apresentador, estilo instrutor especializado. Expressão engajada e motivadora, postura de facilitador. Lente 85mm, iluminação de apresentação, transmitindo expertise em desenvolvimento humano."
      }
    ]
  },
  {
    title: "Lifestyle Professional",
    description: "Profissionais com abordagem lifestyle e bem-estar",
    templates: [
      {
        id: "home-office-wellness",
        title: "Home Office Wellness",
        image: getTemplateThumbnail("home-office-wellness", "Home Office Wellness"),
        prompt: "Transforme a pessoa da foto em profissional de bem-estar em home office. Mantenha identidade facial original intocada. Posicione em ambiente doméstico profissional com plantas, velas, journaling, elementos de autocuidado. Vestindo roupa confortável mas elegante, estilo casual-chic. Iluminação natural suave de janela, ambiente aconchegante e inspirador. Lente 85mm, expressão serena e focada, postura relaxada mas profissional, transmitindo equilíbrio vida-trabalho."
      },
      {
        id: "mindfulness-coach",
        title: "Mindfulness Coach",
        image: getTemplateThumbnail("mindfulness-coach", "Mindfulness Coach"),
        prompt: "Crie um retrato de coach de mindfulness da pessoa enviada. Preserve todas as características faciais originais. Posicione em ambiente zen com almofadas de meditação, plantas, elementos naturais, espaço tranquilo. Vestindo roupas fluidas e confortáveis, cores neutras ou terrosas. Expressão pacífica e centrada, postura meditativa relaxada. Lente 85mm, iluminação suave natural, ambiente sereno, transmitindo paz interior e sabedoria contemplativa."
      },
      {
        id: "life-balance-coach",
        title: "Life Balance Coach",
        image: getTemplateThumbnail("life-balance-coach", "Life Balance Coach"),
        prompt: "Transforme a pessoa da foto em coach de equilíbrio de vida. Mantenha traços faciais e identidade originais. Posicione em ambiente que combine elementos profissionais e pessoais, workspace organizado com toques pessoais. Vestindo roupa que equilibre profissional e confortável. Expressão inspiradora e equilibrada, postura confiante mas acolhedora. Lente 85mm, iluminação acolhedora, transmitindo harmonia e expertise em life coaching."
      },
      {
        id: "holistic-practitioner",
        title: "Holistic Practitioner",
        image: getTemplateThumbnail("holistic-practitioner", "Holistic Practitioner"),
        prompt: "Crie um retrato de praticante holístico da pessoa enviada. Preserve características faciais completamente. Posicione em ambiente holístico com cristais, plantas medicinais, elementos da natureza, espaço de cura alternativa. Vestindo roupas naturais e fluidas, acessórios artesanais sutis. Expressão compassiva e sábia, postura receptiva e curativa. Lente 85mm, iluminação natural dourada, transmitindo conexão espiritual e expertise em práticas integrativas."
      }
    ]
  },
  {
    title: "Studio Portraits",
    description: "Retratos de estúdio profissionais e artísticos",
    templates: [
      {
        id: "classic-studio-portrait",
        title: "Classic Studio Portrait",
        image: getTemplateThumbnail("classic-studio-portrait", "Classic Studio Portrait"),
        prompt: "Transforme a pessoa da foto em retrato clássico de estúdio. Mantenha todas as características faciais e identidade originais intocadas. Posicione em pose de retrato tradicional com postura elegante, mãos posicionadas artisticamente. Fundo de estúdio neutro gradiente, iluminação profissional de estúdio com softbox principal e luz de preenchimento. Vestindo roupa clássica atemporal. Lente retrato 85mm, alta resolução, estilo fotográfico clássico, expressão serena e digna."
      },
      {
        id: "dramatic-lighting-portrait",
        title: "Dramatic Lighting",
        image: getTemplateThumbnail("dramatic-lighting-portrait", "Dramatic Lighting"),
        prompt: "Crie um retrato com iluminação dramática da pessoa enviada. Preserve identidade facial e proporções originais. Posicione com pose impactante, meio perfil ou três quartos, iluminação lateral forte criando sombras artísticas. Fundo escuro de estúdio, contraste alto, atmosfera cinematográfica. Vestindo roupa de cor sólida que contraste com fundo. Lente 85mm, estilo chiaroscuro, expressão intensa e marcante, transmitindo personalidade forte."
      },
      {
        id: "minimalist-headshot",
        title: "Minimalist Headshot",
        image: getTemplateThumbnail("minimalist-headshot", "Minimalist Headshot"),
        prompt: "Transforme a pessoa da foto em headshot minimalista. Mantenha características faciais originais completamente. Posicione em pose clean e direta, olhar franco para câmera, composição minimalista. Fundo branco ou cinza claro uniforme, iluminação suave e uniforme, sem sombras duras. Vestindo roupa simples e elegante. Lente 85mm, estilo minimalista clean, expressão natural e autentica, foco total na pessoa."
      },
      {
        id: "artistic-profile-portrait",
        title: "Artistic Profile",
        image: getTemplateThumbnail("artistic-profile-portrait", "Artistic Profile"),
        prompt: "Crie um retrato artístico de perfil da pessoa enviada. Preserve todos os traços faciais únicos e identidade. Posicione em perfil elegante ou três quartos artístico, pose contemplativa e sofisticada. Iluminação artística com gradientes suaves, fundo texturizado ou gradiente interessante. Vestindo roupa elegante que complemente a composição. Lente 85mm, estilo artístico editorial, expressão pensativa e sofisticada, composição esteticamente rica."
      }
    ]
  }
];

export const getCategoryBySlug = (slug: string): TemplateCategory | undefined => {
  return templateCategories.find(category =>
    category.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '') === slug
  );
};

// Function to pregenerate all thumbnails (useful for performance)
export const pregenerateThumbnails = async (): Promise<void> => {
  const allTemplates = templateCategories.flatMap(category =>
    category.templates.map(template => ({
      id: template.id,
      title: template.title
    }))
  );

  for (const template of allTemplates) {
    getTemplateThumbnail(template.id, template.title);
  }

  console.log(`✅ Pre-generated ${allTemplates.length} fictional thumbnails`);
};