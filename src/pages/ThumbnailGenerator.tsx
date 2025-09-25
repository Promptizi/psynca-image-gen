import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Download, Play, Check, X, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { generateAllTemplateThumbnails, downloadGeneratedThumbnails, generateThumbnailReplacementCode, ThumbnailBatchResult } from "@/utils/thumbnailBatcher";

export default function ThumbnailGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<ThumbnailBatchResult[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<string>('');
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const handleGenerateAll = async () => {
    setIsGenerating(true);
    setResults([]);
    setCurrentTemplate('');
    setProgress({ current: 0, total: 0 });

    try {
      console.log('🚀 Iniciando geração batch de thumbnails...');

      const batchResults = await generateAllTemplateThumbnails(
        (current, total, templateTitle) => {
          setCurrentTemplate(templateTitle);
          setProgress({ current, total });
        }
      );

      setResults(batchResults);

      console.log('✅ Processo concluído!');
    } catch (error) {
      console.error('❌ Erro no processo de geração:', error);
    } finally {
      setIsGenerating(false);
      setCurrentTemplate('');
      setProgress({ current: 0, total: 0 });
    }
  };

  const handleDownloadAll = () => {
    downloadGeneratedThumbnails(results);
  };

  const handleShowReplacementCode = () => {
    const code = generateThumbnailReplacementCode(results);

    // Criar modal com o código
    const modal = document.createElement('div');
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center;';

    const content = document.createElement('div');
    content.style.cssText = 'background: white; padding: 20px; border-radius: 8px; max-width: 80%; max-height: 80%; overflow: auto;';

    const pre = document.createElement('pre');
    pre.style.cssText = 'font-family: monospace; font-size: 12px; white-space: pre-wrap;';
    pre.textContent = code;

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Fechar';
    closeBtn.style.cssText = 'margin-top: 10px; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;';
    closeBtn.onclick = () => document.body.removeChild(modal);

    content.appendChild(pre);
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
        <h1 className="text-2xl font-bold text-foreground">Gerador de Thumbnails</h1>
        <div className="w-10" />
      </header>

      {/* Instruções */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-3">
          🎨 Geração de Thumbnails Reais
        </h2>
        <p className="text-muted-foreground mb-4">
          Este processo irá gerar thumbnails reais para todos os 24 templates usando uma pessoa fictícia como base.
          As imagens geradas mostrarão exatamente como ficará o resultado de cada transformação.
        </p>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>• ⏱️ Processo levará ~10-15 minutos (24 templates × 30s cada)</p>
          <p>• 🤖 Usa pessoa fictícia como base (não pessoas reais)</p>
          <p>• 📸 Gera exemplo real de cada template</p>
          <p>• 💾 Permite download das imagens geradas</p>
        </div>
      </Card>

      {/* Controles */}
      <div className="flex gap-4 mb-6">
        <Button
          onClick={handleGenerateAll}
          disabled={isGenerating}
          className="flex-1"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Gerando...
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Gerar Todas as Thumbnails
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

      {/* Progress atual */}
      {isGenerating && currentTemplate && (
        <Card className="p-4 mb-6">
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <div>
              <p className="font-medium text-foreground">Processando: {currentTemplate}</p>
              <p className="text-sm text-muted-foreground">
                {progress.current} de {progress.total} templates
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Resultados */}
      {results.length > 0 && (
        <div className="space-y-4">
          {/* Resumo */}
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-2">📊 Resumo da Geração</h3>
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

          {/* Lista de resultados */}
          <div className="grid gap-3">
            {results.map((result) => (
              <Card key={result.templateId} className="p-4">
                <div className="flex items-center gap-3">
                  {result.success ? (
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <X className="h-5 w-5 text-red-600 flex-shrink-0" />
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {result.templateTitle}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {result.templateId}
                    </p>
                    {result.error && (
                      <p className="text-sm text-red-600 truncate">
                        {result.error}
                      </p>
                    )}
                  </div>

                  {result.success && result.imageUrl && (
                    <div className="flex gap-2">
                      <img
                        src={result.imageUrl}
                        alt={result.templateTitle}
                        className="w-16 h-20 object-cover rounded border"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = result.imageUrl!;
                          link.download = `thumbnail-${result.templateId}.png`;
                          link.click();
                        }}
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}