import { templateCategories } from '@/data/templateCategories';
import { imageGenerationService } from '@/services/imageGeneration';

interface BatchGenerationResult {
  templateId: string;
  templateTitle: string;
  category: string;
  success: boolean;
  imageUrl?: string;
  error?: string;
  prompt: string;
}

class ThumbnailBatchGenerator {
  private results: BatchGenerationResult[] = [];
  private referenceImageFile: File | null = null;
  private isRunning = false;
  private currentIndex = 0;
  private totalTemplates = 0;
  private delayBetweenRequests = 3000; // 3 segundos entre requisições

  // Callback para atualizar progresso
  private onProgress?: (current: number, total: number, template: string, status: string) => void;
  private onComplete?: (results: BatchGenerationResult[]) => void;

  constructor() {
    this.calculateTotalTemplates();
  }

  private calculateTotalTemplates() {
    this.totalTemplates = templateCategories.reduce((acc, cat) => acc + cat.templates.length, 0);
  }

  async loadReferenceImage(): Promise<boolean> {
    try {
      // Buscar a imagem de referência da pasta public
      const response = await fetch('/reference-face.jpg');
      if (!response.ok) {
        console.error('❌ Erro ao carregar imagem de referência');
        return false;
      }

      const blob = await response.blob();
      this.referenceImageFile = new File([blob], 'reference-face.jpg', { type: 'image/jpeg' });
      console.log('✅ Imagem de referência carregada com sucesso');
      return true;
    } catch (error) {
      console.error('❌ Erro ao carregar imagem de referência:', error);
      return false;
    }
  }

  async generateSingleThumbnail(template: any, category: string): Promise<BatchGenerationResult> {
    if (!this.referenceImageFile) {
      throw new Error('Imagem de referência não carregada');
    }

    const startTime = Date.now();
    console.log(`\n🎨 [${this.currentIndex}/${this.totalTemplates}] Gerando: ${template.title}`);
    console.log(`   📂 Categoria: ${category}`);
    console.log(`   👤 Gênero: ${template.gender}`);
    console.log(`   🎭 Estilo: ${template.style}`);
    console.log(`   📍 Cenário: ${template.scenario}`);

    this.onProgress?.(this.currentIndex, this.totalTemplates, template.title, 'Gerando imagem...');

    try {
      const result = await imageGenerationService.generateWithTemplate({
        userPhoto: this.referenceImageFile,
        template: {
          id: template.id,
          title: template.title,
          description: template.description || `Template ${template.title}`,
          referenceImage: template.image,
          category: category,
          prompt: template.prompt
        }
      });

      const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(1);

      if (result.success && result.imageUrl) {
        console.log(`   ✅ Sucesso! Tempo: ${elapsedTime}s`);
        console.log(`   🔗 URL: ${result.imageUrl}`);

        return {
          templateId: template.id,
          templateTitle: template.title,
          category,
          success: true,
          imageUrl: result.imageUrl,
          prompt: template.prompt
        };
      } else {
        throw new Error(result.error || 'Falha na geração');
      }

    } catch (error) {
      console.error(`   ❌ Erro: ${error}`);
      return {
        templateId: template.id,
        templateTitle: template.title,
        category,
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        prompt: template.prompt
      };
    }
  }

  async generateAll(
    onProgress?: (current: number, total: number, template: string, status: string) => void,
    onComplete?: (results: BatchGenerationResult[]) => void
  ): Promise<BatchGenerationResult[]> {
    if (this.isRunning) {
      console.warn('⚠️ Geração já está em andamento');
      return this.results;
    }

    this.onProgress = onProgress;
    this.onComplete = onComplete;
    this.isRunning = true;
    this.results = [];
    this.currentIndex = 0;

    console.log('🚀 Iniciando geração em batch de thumbnails');
    console.log(`📊 Total de templates: ${this.totalTemplates}`);
    console.log(`⏱️ Tempo estimado: ${Math.ceil(this.totalTemplates * this.delayBetweenRequests / 60000)} minutos`);

    // Carregar imagem de referência
    const imageLoaded = await this.loadReferenceImage();
    if (!imageLoaded) {
      console.error('❌ Não foi possível carregar a imagem de referência');
      this.isRunning = false;
      return [];
    }

    // Processar cada categoria
    for (const category of templateCategories) {
      console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`📂 CATEGORIA: ${category.title}`);
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

      for (const template of category.templates) {
        if (!this.isRunning) break;

        this.currentIndex++;
        const result = await this.generateSingleThumbnail(template, category.title);
        this.results.push(result);

        // Aguardar entre requisições
        if (this.currentIndex < this.totalTemplates && this.isRunning) {
          console.log(`   ⏳ Aguardando ${this.delayBetweenRequests/1000}s...`);
          this.onProgress?.(this.currentIndex, this.totalTemplates, '', `Aguardando...`);
          await new Promise(resolve => setTimeout(resolve, this.delayBetweenRequests));
        }
      }
    }

    // Resumo final
    this.printSummary();

    // Gerar código de mapeamento
    this.generateMappingCode();

    this.isRunning = false;
    this.onComplete?.(this.results);
    return this.results;
  }

  stop() {
    console.log('🛑 Parando geração...');
    this.isRunning = false;
  }

  private printSummary() {
    console.log('\n════════════════════════════════════');
    console.log('📊 RESUMO DA GERAÇÃO');
    console.log('════════════════════════════════════\n');

    const successful = this.results.filter(r => r.success);
    const failed = this.results.filter(r => !r.success);

    console.log(`✅ Sucessos: ${successful.length}/${this.totalTemplates}`);
    console.log(`❌ Falhas: ${failed.length}/${this.totalTemplates}`);

    if (failed.length > 0) {
      console.log('\n⚠️ Templates que falharam:');
      failed.forEach(f => {
        console.log(`  - ${f.templateTitle}: ${f.error}`);
      });
    }

    // Agrupar por categoria
    const byCategory: Record<string, { success: number; failed: number }> = {};
    this.results.forEach(r => {
      if (!byCategory[r.category]) {
        byCategory[r.category] = { success: 0, failed: 0 };
      }
      if (r.success) {
        byCategory[r.category].success++;
      } else {
        byCategory[r.category].failed++;
      }
    });

    console.log('\n📂 Por categoria:');
    Object.entries(byCategory).forEach(([cat, stats]) => {
      console.log(`  ${cat}: ${stats.success} ✅ / ${stats.failed} ❌`);
    });
  }

  private generateMappingCode() {
    console.log('\n\n════════════════════════════════════');
    console.log('📋 CÓDIGO DE MAPEAMENTO GERADO');
    console.log('════════════════════════════════════\n');

    const successful = this.results.filter(r => r.success && r.imageUrl);

    console.log('// Adicione este mapeamento ao arquivo templateCategories.ts:\n');
    console.log('export const generatedThumbnails: Record<string, string> = {');

    successful.forEach((result, index) => {
      const comma = index < successful.length - 1 ? ',' : '';
      console.log(`  '${result.templateId}': '${result.imageUrl}'${comma}`);
    });

    console.log('};\n');

    // Também gerar um JSON para download
    const jsonMapping: Record<string, string> = {};
    successful.forEach(r => {
      if (r.imageUrl) {
        jsonMapping[r.templateId] = r.imageUrl;
      }
    });

    console.log('// JSON para download:');
    console.log(JSON.stringify(jsonMapping, null, 2));

    // Criar download automático do JSON
    this.downloadJSON(jsonMapping, 'thumbnail-mapping.json');
  }

  private downloadJSON(data: any, filename: string) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    console.log(`\n💾 Arquivo ${filename} baixado automaticamente`);
  }

  downloadAllImages() {
    const successful = this.results.filter(r => r.success && r.imageUrl);

    console.log(`\n💾 Baixando ${successful.length} imagens...`);

    successful.forEach((result, index) => {
      if (result.imageUrl) {
        setTimeout(() => {
          const link = document.createElement('a');
          link.href = result.imageUrl!;
          link.download = `${result.templateId}.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          console.log(`  ✅ ${index + 1}/${successful.length}: ${result.templateId}.jpg`);
        }, index * 500); // 500ms entre downloads
      }
    });
  }

  getResults() {
    return this.results;
  }
}

// Exportar instância global para uso no console do browser
if (typeof window !== 'undefined') {
  (window as any).thumbnailGenerator = new ThumbnailBatchGenerator();
  console.log('🎨 ThumbnailBatchGenerator disponível em window.thumbnailGenerator');
  console.log('📝 Comandos:');
  console.log('  - thumbnailGenerator.generateAll() - Gerar todas as thumbnails');
  console.log('  - thumbnailGenerator.stop() - Parar geração');
  console.log('  - thumbnailGenerator.downloadAllImages() - Baixar todas as imagens geradas');
  console.log('  - thumbnailGenerator.getResults() - Ver resultados');
}

export default ThumbnailBatchGenerator;