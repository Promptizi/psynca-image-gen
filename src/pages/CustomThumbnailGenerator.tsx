import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Download, Play, Check, X, Loader2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import {
  generateAllCustomThumbnails,
  generateCustomThumbnail,
  downloadCustomThumbnails,
  generateCustomThumbnailReplacementCode,
  CustomThumbnailResult
} from "@/utils/customThumbnailGenerator";
import { templateCategories } from "@/data/templateCategories";

export default function CustomThumbnailGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<CustomThumbnailResult[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<string>('');
  const [currentStatus, setCurrentStatus] = useState<string>('');
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [previewResult, setPreviewResult] = useState<CustomThumbnailResult | null>(null);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);

  // Obter lista de todos os templates para preview
  const allTemplates = templateCategories.flatMap(category =>
    category.templates.map(template => ({
      id: template.id,
      title: template.title,
      category: category.title
    }))
  );

  const handleGenerateAll = async () => {
    setIsGenerating(true);
    setResults([]);
    setCurrentTemplate('');
    setCurrentStatus('');
    setProgress({ current: 0, total: 0 });

    try {
      console.log('🚀 Iniciando geração de thumbnails personalizadas...');

      const customResults = await generateAllCustomThumbnails(
        (current, total, templateTitle, status) => {
          setCurrentTemplate(templateTitle);
          setCurrentStatus(status);
          setProgress({ current, total });
        }
      );

      setResults(customResults);

      console.log('✅ Processo de geração personalizada concluído!');
    } catch (error) {
      console.error('❌ Erro no processo de geração personalizada:', error);
    } finally {
      setIsGenerating(false);
      setCurrentTemplate('');
      setCurrentStatus('');
      setProgress({ current: 0, total: 0 });
    }
  };

  const handleGeneratePreview = async () => {
    if (allTemplates.length === 0) return;

    setIsGeneratingPreview(true);
    setPreviewResult(null);

    try {
      // Usar o primeiro template como preview
      const firstTemplate = allTemplates[0];
      console.log(`🔍 Gerando preview: ${firstTemplate.title}`);

      const result = await generateCustomThumbnail(
        firstTemplate.id,
        (status) => {
          setCurrentStatus(status);
        }
      );

      setPreviewResult(result);
    } catch (error) {
      console.error('❌ Erro ao gerar preview:', error);
    } finally {
      setIsGeneratingPreview(false);
      setCurrentStatus('');
    }
  };

  const handleDownloadAll = () => {
    downloadCustomThumbnails(results);
  };

  const handleShowReplacementCode = () => {
    const code = generateCustomThumbnailReplacementCode(results);

    // Criar modal com o código
    const modal = document.createElement('div');
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 20px;';

    const content = document.createElement('div');
    content.style.cssText = 'background: white; padding: 20px; border-radius: 8px; max-width: 90%; max-height: 90%; overflow: auto;';

    const title = document.createElement('h3');
    title.textContent = 'Código de Substituição das Thumbnails';
    title.style.cssText = 'margin-bottom: 15px; font-size: 18px; font-weight: bold;';

    const pre = document.createElement('pre');
    pre.style.cssText = 'font-family: monospace; font-size: 12px; white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 4px; overflow: auto; max-height: 60vh;';
    pre.textContent = code;

    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copiar Código';
    copyBtn.style.cssText = 'margin: 10px 10px 0 0; padding: 8px 16px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;';
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(code);
      copyBtn.textContent = 'Copiado!';
      setTimeout(() => { copyBtn.textContent = 'Copiar Código'; }, 2000);
    };

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Fechar';
    closeBtn.style.cssText = 'margin-top: 10px; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;';
    closeBtn.onclick = () => document.body.removeChild(modal);

    content.appendChild(title);
    content.appendChild(pre);
    content.appendChild(copyBtn);
    content.appendChild(closeBtn);
    modal.appendChild(content);
    document.body.appendChild(modal);
  };

  const successfulResults = results.filter(r => r.success);
  const failedResults = results.filter(r => !r.success);

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <Link to="/">
          <button className="p-2 transition-colors hover:bg-white/10 rounded-xl">
            <ArrowLeft className="h-6 w-6 text-foreground" />
          </button>
        </Link>
        <h1 className="text-2xl font-bold text-foreground">Thumbnails Personalizadas</h1>
        <div className="w-10" />
      </header>

      {/* Instruções */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-3">
          🎨 Geração de Thumbnails Personalizadas
        </h2>
        <div className="mb-4">
          <img
            src="/reference-face.jpg"
            alt="Imagem de referência facial"
            className="w-24 h-24 rounded-xl object-cover border-2 border-primary/20 float-right ml-4"
          />
          <p className="text-muted-foreground mb-4">
            Este processo usa a imagem de referência facial (ao lado) para gerar thumbnails personalizadas
            de todos os 24 templates. Cada thumbnail mostrará exatamente como ficará a transformação
            com esta pessoa específica.
          </p>
        </div>
        <div className="clear-both text-sm text-muted-foreground space-y-1">
          <p>• 🎯 <strong>Imagem base:</strong> reference-face.jpg</p>
          <p>• 🤖 <strong>Prompts:</strong> NanoBanana otimizados para cada template</p>
          <p>• ⏱️ <strong>Tempo estimado:</strong> ~15-20 minutos (24 × 45s cada)</p>
          <p>• 📸 <strong>Resultado:</strong> Thumbnails únicas para cada transformação</p>
        </div>
      </Card>

      {/* Controles */}
      <div className="flex gap-4 mb-6">
        <Button
          onClick={handleGeneratePreview}
          disabled={isGeneratingPreview || isGenerating}
          variant="outline"
          size="lg"
        >
          {isGeneratingPreview ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Gerando Preview...
            </>
          ) : (
            <>
              <Eye className="mr-2 h-4 w-4" />
              Testar 1 Preview
            </>
          )}
        </Button>

        <Button
          onClick={handleGenerateAll}
          disabled={isGenerating}
          className="flex-1"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Gerando {progress.current}/{progress.total}...
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Gerar Todas (24 thumbnails)
            </>
          )}
        </Button>

        {results.length > 0 && (
          <>
            <Button
              variant="outline"
              onClick={handleDownloadAll}
              disabled={successfulResults.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Download ({successfulResults.length})
            </Button>

            <Button
              variant="outline"
              onClick={handleShowReplacementCode}
              disabled={successfulResults.length === 0}
            >
              Ver Código
            </Button>
          </>
        )}
      </div>

      {/* Preview Result */}
      {previewResult && (
        <Card className="p-4 mb-6">
          <h3 className="font-semibold text-foreground mb-3">🔍 Preview Gerado</h3>
          <div className="flex items-center gap-4">
            {previewResult.success ? (
              <>
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-foreground font-medium">{previewResult.templateTitle}</span>
                {previewResult.imageUrl && (
                  <img
                    src={previewResult.imageUrl}
                    alt={previewResult.templateTitle}
                    className="w-20 h-25 object-cover rounded border ml-auto"
                  />
                )}
              </>
            ) : (
              <>
                <X className="h-5 w-5 text-red-600" />
                <span className="text-foreground font-medium">{previewResult.templateTitle}</span>
                <span className="text-red-600 text-sm">{previewResult.error}</span>
              </>
            )}
          </div>
        </Card>
      )}

      {/* Progress atual */}
      {isGenerating && (
        <Card className="p-4 mb-6">
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <div className="flex-1">
              <p className="font-medium text-foreground">{currentTemplate}</p>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">{currentStatus}</p>
                <p className="text-sm text-muted-foreground">
                  {progress.current} de {progress.total}
                </p>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(progress.current / progress.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Resultados */}
      {results.length > 0 && (
        <div className="space-y-4">
          {/* Resumo */}
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-2">📊 Resumo da Geração Personalizada</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{successfulResults.length}</div>
                <div className="text-sm text-muted-foreground">Sucessos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{failedResults.length}</div>
                <div className="text-sm text-muted-foreground">Falhas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{results.length}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
            </div>
          </Card>

          {/* Lista de resultados com grid de thumbnails */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {results.map((result) => (
              <Card key={result.templateId} className="p-4">
                <div className="flex items-start gap-3">
                  {result.success ? (
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  ) : (
                    <X className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">
                      {result.templateTitle}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mb-2">
                      {result.templateId}
                    </p>

                    {result.success && result.imageUrl && (
                      <div className="mb-2">
                        <img
                          src={result.imageUrl}
                          alt={result.templateTitle}
                          className="w-full h-32 object-cover rounded border"
                        />
                      </div>
                    )}

                    {result.error && (
                      <p className="text-xs text-red-600 mb-2">
                        {result.error}
                      </p>
                    )}

                    {result.success && result.imageUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = result.imageUrl!;
                          link.download = `custom-thumbnail-${result.templateId}.png`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}