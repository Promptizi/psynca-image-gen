// Sistema personalizado para gerar thumbnails usando imagem de referência facial específica
// Usa a imagem reference-face.jpg como base e aplica os prompts NanoBanana de cada template

import { imageGenerationService, ProfessionalTemplate } from '@/services/imageGeneration';
import { templateCategories } from '@/data/templateCategories';

export interface CustomThumbnailResult {
  templateId: string;
  templateTitle: string;
  success: boolean;
  imageUrl?: string;
  error?: string;
}

// Função para converter URL/path para File object
async function urlToFile(url: string, filename: string): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}

// Função principal para gerar thumbnail personalizada de um template específico
export async function generateCustomThumbnail(
  templateId: string,
  onProgress?: (status: string) => void
): Promise<CustomThumbnailResult> {
  try {
    // Encontrar o template
    const template = templateCategories
      .flatMap(category => category.templates)
      .find(t => t.id === templateId);

    if (!template) {
      return {
        templateId,
        templateTitle: 'Unknown',
        success: false,
        error: 'Template não encontrado'
      };
    }

    if (onProgress) onProgress(`Carregando imagem de referência...`);

    // Carregar a imagem de referência facial
    const referenceFaceFile = await urlToFile('/reference-face.jpg', 'reference-face.jpg');

    if (onProgress) onProgress(`Gerando com NanoBanana API...`);

    // Usar o serviço de geração com o prompt específico do template
    const result = await imageGenerationService.generateWithTemplate({
      userPhoto: referenceFaceFile,
      template: {
        id: template.id,
        title: template.title,
        description: `Thumbnail personalizada para ${template.title}`,
        referenceImage: '',
        category: 'custom',
        prompt: template.prompt
      }
    });

    if (result.success && result.imageUrl) {
      if (onProgress) onProgress(`Thumbnail gerada com sucesso!`);
      return {
        templateId,
        templateTitle: template.title,
        success: true,
        imageUrl: result.imageUrl
      };
    } else {
      return {
        templateId,
        templateTitle: template.title,
        success: false,
        error: result.error || 'Falha na geração'
      };
    }

  } catch (error) {
    return {
      templateId,
      templateTitle: 'Error',
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    };
  }
}

// Função para gerar todas as thumbnails personalizadas
export async function generateAllCustomThumbnails(
  onProgress?: (current: number, total: number, templateTitle: string, status: string) => void
): Promise<CustomThumbnailResult[]> {
  console.log('🎨 Iniciando geração de thumbnails personalizadas com imagem de referência...');

  const allTemplates = templateCategories.flatMap(category =>
    category.templates.map(template => template.id)
  );

  console.log(`📋 Total de ${allTemplates.length} thumbnails para gerar`);

  const results: CustomThumbnailResult[] = [];

  for (let i = 0; i < allTemplates.length; i++) {
    const templateId = allTemplates[i];
    console.log(`🔄 Gerando ${i + 1}/${allTemplates.length}: ${templateId}`);

    const result = await generateCustomThumbnail(
      templateId,
      (status) => {
        if (onProgress) {
          const template = templateCategories
            .flatMap(cat => cat.templates)
            .find(t => t.id === templateId);
          onProgress(i + 1, allTemplates.length, template?.title || templateId, status);
        }
      }
    );

    results.push(result);

    // Log do resultado
    if (result.success) {
      console.log(`✅ Sucesso: ${result.templateTitle}`);
    } else {
      console.log(`❌ Falha: ${result.templateTitle} - ${result.error}`);
    }

    // Aguardar 3 segundos entre requests para não sobrecarregar a API
    if (i < allTemplates.length - 1) {
      console.log('⏳ Aguardando 3s antes do próximo...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  // Resumo
  const successful = results.filter(r => r.success).length;
  const failed = results.length - successful;

  console.log(`\n📊 Resumo da geração personalizada:`);
  console.log(`✅ Sucessos: ${successful}/${results.length}`);
  console.log(`❌ Falhas: ${failed}/${results.length}`);

  return results;
}

// Função para baixar todas as thumbnails geradas
export function downloadCustomThumbnails(results: CustomThumbnailResult[]): void {
  const successfulResults = results.filter(r => r.success && r.imageUrl);

  console.log(`📥 Preparando download de ${successfulResults.length} thumbnails personalizadas`);

  successfulResults.forEach((result, index) => {
    if (result.imageUrl) {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = result.imageUrl!;
        link.download = `custom-thumbnail-${result.templateId}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log(`📥 Download iniciado: ${result.templateTitle}`);
      }, index * 500); // Stagger downloads
    }
  });
}

// Função para gerar código de substituição das URLs
export function generateCustomThumbnailReplacementCode(results: CustomThumbnailResult[]): string {
  const successfulResults = results.filter(r => r.success && r.imageUrl);

  let code = '// URLs das thumbnails personalizadas geradas:\n';
  code += '// Substitua no templateCategories.ts\n\n';
  code += 'const customThumbnailMapping: Record<string, string> = {\n';

  successfulResults.forEach(result => {
    code += `  "${result.templateId}": "${result.imageUrl}",\n`;
  });

  code += '};\n\n';
  code += '// Como usar:\n';
  code += '// 1. Substitua a função getTemplateThumbnail para usar essas URLs\n';
  code += '// 2. Ou atualize diretamente no mapeamento referenceImageMapping\n';

  return code;
}

// Função para pré-visualizar uma thumbnail antes de gerar todas
export async function previewCustomThumbnail(templateId: string): Promise<CustomThumbnailResult> {
  console.log(`🔍 Gerando preview para template: ${templateId}`);
  return generateCustomThumbnail(templateId, (status) => {
    console.log(`Preview ${templateId}: ${status}`);
  });
}