// Sistema para gerar thumbnails reais usando o NanoBanana API
// Gera 1 exemplo de cada template com pessoas fictícias para usar como thumbnails

import { imageGenerationService } from '@/services/imageGeneration';
import { templateCategories } from '@/data/templateCategories';

export interface ThumbnailBatchResult {
  templateId: string;
  templateTitle: string;
  success: boolean;
  imageUrl?: string;
  error?: string;
}


// Função principal para gerar todas as thumbnails
export async function generateAllTemplateThumbnails(
  onProgress?: (current: number, total: number, templateTitle: string) => void
): Promise<ThumbnailBatchResult[]> {
  console.log('🎨 Iniciando geração de thumbnails reais para todos os templates...');

  const results: ThumbnailBatchResult[] = [];
  const allTemplates = templateCategories.flatMap(category =>
    category.templates.map(template => ({
      id: template.id,
      title: template.title,
      prompt: template.prompt,
      category: category.title
    }))
  );

  console.log(`📋 Total de ${allTemplates.length} templates para processar`);

  // Criar pessoa fictícia para usar como base
  const fictionalPersonFile = await createFictionalPersonFile();

  // Processar cada template
  for (let i = 0; i < allTemplates.length; i++) {
    const template = allTemplates[i];
    console.log(`🔄 Processando ${i + 1}/${allTemplates.length}: ${template.title}`);

    // Notificar progresso
    if (onProgress) {
      onProgress(i + 1, allTemplates.length, template.title);
    }

    try {
      const result = await imageGenerationService.generateWithTemplate({
        userPhoto: fictionalPersonFile,
        template: {
          id: template.id,
          title: template.title,
          description: `Template ${template.title}`,
          referenceImage: '',
          category: template.category,
          prompt: template.prompt
        }
      });

      if (result.success && result.imageUrl) {
        results.push({
          templateId: template.id,
          templateTitle: template.title,
          success: true,
          imageUrl: result.imageUrl
        });
        console.log(`✅ Sucesso: ${template.title}`);
      } else {
        results.push({
          templateId: template.id,
          templateTitle: template.title,
          success: false,
          error: result.error || 'Falha na geração'
        });
        console.log(`❌ Falha: ${template.title} - ${result.error}`);
      }

      // Aguardar 2 segundos entre requests para não sobrecarregar a API
      if (i < allTemplates.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

    } catch (error) {
      results.push({
        templateId: template.id,
        templateTitle: template.title,
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
      console.log(`❌ Erro: ${template.title} - ${error}`);
    }
  }

  // Mostrar resumo
  const successful = results.filter(r => r.success).length;
  const failed = results.length - successful;

  console.log(`\n📊 Resumo da geração:`);
  console.log(`✅ Sucessos: ${successful}/${results.length}`);
  console.log(`❌ Falhas: ${failed}/${results.length}`);

  return results;
}

// Criar arquivo de pessoa fictícia
async function createFictionalPersonFile(): Promise<File> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Criar uma pessoa fictícia mais realista
    drawFictionalPerson(ctx);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'fictional-person.png', { type: 'image/png' });
        resolve(file);
      }
    });
  });
}

function drawFictionalPerson(ctx: CanvasRenderingContext2D): void {
  // Fundo neutro
  const gradient = ctx.createLinearGradient(0, 0, 512, 512);
  gradient.addColorStop(0, '#f7fafc');
  gradient.addColorStop(1, '#edf2f7');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  // Sombra suave do corpo
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(150, 350, 212, 162);

  // Corpo/ombros
  ctx.fillStyle = '#2d3748'; // Camisa/blazer escuro
  ctx.fillRect(150, 350, 212, 162);

  // Pescoço
  ctx.fillStyle = '#d69e2e'; // Tom de pele
  ctx.fillRect(230, 320, 52, 50);

  // Rosto
  ctx.fillStyle = '#d69e2e';
  ctx.beginPath();
  ctx.arc(256, 240, 90, 0, Math.PI * 2);
  ctx.fill();

  // Cabelo
  ctx.fillStyle = '#2d3748';
  ctx.beginPath();
  ctx.arc(256, 200, 80, 0, Math.PI);
  ctx.fill();

  // Olhos
  ctx.fillStyle = '#1a202c';
  ctx.beginPath();
  ctx.arc(230, 220, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(282, 220, 10, 0, Math.PI * 2);
  ctx.fill();

  // Boca
  ctx.fillStyle = '#e53e3e';
  ctx.beginPath();
  ctx.arc(256, 260, 8, 0, Math.PI);
  ctx.fill();

  // Nariz (sombra sutil)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.beginPath();
  ctx.arc(256, 240, 4, 0, Math.PI * 2);
  ctx.fill();
}

// Função para baixar todas as imagens geradas
export function downloadGeneratedThumbnails(results: ThumbnailBatchResult[]): void {
  const successfulResults = results.filter(r => r.success && r.imageUrl);

  console.log(`📥 Preparando download de ${successfulResults.length} thumbnails`);

  successfulResults.forEach((result, index) => {
    if (result.imageUrl) {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = result.imageUrl!;
        link.download = `thumbnail-${result.templateId}.png`;
        link.click();
        console.log(`📥 Download iniciado: ${result.templateTitle}`);
      }, index * 500); // Stagger downloads
    }
  });
}

// Função para criar código que substitui as URLs dos templates
export function generateThumbnailReplacementCode(results: ThumbnailBatchResult[]): string {
  const successfulResults = results.filter(r => r.success && r.imageUrl);

  let code = '// Código para substituir as thumbnails pelos resultados reais:\n\n';

  successfulResults.forEach(result => {
    code += `"${result.templateId}": "${result.imageUrl}",\n`;
  });

  console.log('📄 Código de substituição gerado:', code);
  return code;
}