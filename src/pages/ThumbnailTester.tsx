import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, StopCircle, Download, Check, X, Loader2, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import ThumbnailBatchGenerator from '@/utils/thumbnailBatchGenerator';
import { templateCategories } from '@/data/templateCategories';

interface GenerationResult {
  templateId: string;
  templateTitle: string;
  category: string;
  success: boolean;
  imageUrl?: string;
  error?: string;
  prompt: string;
}

export default function ThumbnailTester() {
  const [generator] = useState(() => new ThumbnailBatchGenerator());
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<GenerationResult[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<string>('');
  const [currentStatus, setCurrentStatus] = useState<string>('');
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  // Calcular estatísticas
  const totalTemplates = templateCategories.reduce((acc, cat) => acc + cat.templates.length, 0);
  const successfulResults = results.filter(r => r.success);
  const failedResults = results.filter(r => !r.success);

  const handleGenerateAll = async () => {
    setIsGenerating(true);
    setResults([]);
    setCurrentTemplate('');
    setCurrentStatus('');
    setProgress({ current: 0, total: totalTemplates });

    try {
      const generatedResults = await generator.generateAll(
        (current, total, templateTitle, status) => {
          setCurrentTemplate(templateTitle);
          setCurrentStatus(status);
          setProgress({ current, total });
        },
        (finalResults) => {
          setResults(finalResults);
          setIsGenerating(false);
          console.log('✅ Geração completa!');
        }
      );
    } catch (error) {
      console.error('❌ Erro na geração:', error);
      setIsGenerating(false);
    }
  };

  const handleStop = () => {
    generator.stop();
    setIsGenerating(false);
    setCurrentStatus('Geração interrompida');
  };

  const handleDownloadAll = () => {
    generator.downloadAllImages();
  };

  const handleExportMapping = () => {
    const mapping: Record<string, string> = {};
    successfulResults.forEach(r => {
      if (r.imageUrl) {
        mapping[r.templateId] = r.imageUrl;
      }
    });

    const blob = new Blob([JSON.stringify(mapping, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'thumbnail-mapping.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyMappingCode = () => {
    const mapping: Record<string, string> = {};
    successfulResults.forEach(r => {
      if (r.imageUrl) {
        mapping[r.templateId] = r.imageUrl;
      }
    });

    const code = `// Adicione ao arquivo templateCategories.ts:

export const generatedThumbnails: Record<string, string> = ${JSON.stringify(mapping, null, 2)};

// Atualizar a função getTemplateThumbnail:
export function getTemplateThumbnail(templateId: string, fallback: string): string {
  return generatedThumbnails[templateId] || fallback;
}`;

    navigator.clipboard.writeText(code);
    alert('Código copiado para a área de transferência!');
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <Link to="/">
          <button className="p-2 transition-colors hover:bg-white/10 rounded-xl">
            <ArrowLeft className="h-6 w-6 text-foreground" />
          </button>
        </Link>
        <h1 className="text-2xl font-bold text-foreground">Teste de Geração de Thumbnails</h1>
        <div className="w-10" />
      </header>

      {/* Info Card */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-3">
          🧪 Gerador de Thumbnails em Batch
        </h2>
        <p className="text-muted-foreground mb-4">
          Este teste gera thumbnails para todos os {totalTemplates} templates do sistema usando a imagem de referência
          <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded ml-2">/reference-face.jpg</span>
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Total de Templates</div>
            <div className="text-2xl font-bold text-foreground">{totalTemplates}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Tempo Estimado</div>
            <div className="text-2xl font-bold text-foreground">~{Math.ceil(totalTemplates * 3 / 60)}min</div>
          </div>
          <div>
            <div className="text-muted-foreground">Delay entre APIs</div>
            <div className="text-2xl font-bold text-foreground">3s</div>
          </div>
          <div>
            <div className="text-muted-foreground">Categorias</div>
            <div className="text-2xl font-bold text-foreground">{templateCategories.length}</div>
          </div>
        </div>
      </Card>

      {/* Controls */}
      <div className="flex gap-4 mb-6">
        {!isGenerating ? (
          <Button
            onClick={handleGenerateAll}
            className="flex-1"
            size="lg"
          >
            <Play className="mr-2 h-4 w-4" />
            Iniciar Geração ({totalTemplates} templates)
          </Button>
        ) : (
          <Button
            onClick={handleStop}
            variant="destructive"
            className="flex-1"
            size="lg"
          >
            <StopCircle className="mr-2 h-4 w-4" />
            Parar Geração
          </Button>
        )}

        {results.length > 0 && (
          <>
            <Button
              variant="outline"
              onClick={handleDownloadAll}
              disabled={successfulResults.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Baixar Imagens ({successfulResults.length})
            </Button>

            <Button
              variant="outline"
              onClick={handleExportMapping}
              disabled={successfulResults.length === 0}
            >
              📋 Exportar JSON
            </Button>

            <Button
              variant="outline"
              onClick={handleCopyMappingCode}
              disabled={successfulResults.length === 0}
            >
              📝 Copiar Código
            </Button>
          </>
        )}
      </div>

      {/* Progress */}
      {isGenerating && (
        <Card className="p-4 mb-6">
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <div className="flex-1">
              <p className="font-medium text-foreground">{currentTemplate || 'Preparando...'}</p>
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

      {/* Results Summary */}
      {results.length > 0 && (
        <div className="space-y-4">
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

          {/* Detailed Results */}
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-4">📝 Detalhes por Template</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
              {results.map((result) => (
                <div
                  key={result.templateId}
                  className="flex items-center gap-2 p-2 rounded border border-border/50 bg-card/50"
                >
                  {result.success ? (
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                  ) : (
                    <X className="h-4 w-4 text-red-600 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">
                      {result.templateTitle}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {result.category}
                    </p>
                    {result.error && (
                      <p className="text-xs text-red-600 truncate">
                        {result.error}
                      </p>
                    )}
                  </div>
                  {result.success && result.imageUrl && (
                    <a
                      href={result.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:text-primary/80"
                    >
                      Ver
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Generated Images Preview */}
          {successfulResults.length > 0 && (
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-4">🖼️ Preview das Imagens Geradas</h3>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {successfulResults.slice(0, 12).map((result) => (
                  result.imageUrl && (
                    <div key={result.templateId} className="relative group">
                      <img
                        src={result.imageUrl}
                        alt={result.templateTitle}
                        className="w-full h-24 object-cover rounded border border-border/50 group-hover:border-primary transition-colors"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                        <p className="text-white text-xs text-center px-1">
                          {result.templateTitle}
                        </p>
                      </div>
                    </div>
                  )
                ))}
              </div>
              {successfulResults.length > 12 && (
                <p className="text-center text-muted-foreground text-sm mt-2">
                  +{successfulResults.length - 12} mais imagens...
                </p>
              )}
            </Card>
          )}
        </div>
      )}
    </div>
  );
}