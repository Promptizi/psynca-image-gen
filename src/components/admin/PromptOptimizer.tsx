import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import {
  HyperRealisticPromptBuilder,
  createPsychologistContext,
  TECHNICAL_SPECS,
  evaluatePromptConsistency
} from '@/lib/prompt-optimizer';
import { Wand2, Eye, CheckCircle, AlertTriangle, Copy, Sparkles } from 'lucide-react';

interface PromptOptimizerProps {
  onPromptGenerated?: (prompt: string) => void;
  initialTemplate?: {
    title: string;
    prompt: string;
    gender: 'male' | 'female' | 'unisex';
    category: string;
  };
}

export const PromptOptimizer: React.FC<PromptOptimizerProps> = ({
  onPromptGenerated,
  initialTemplate
}) => {
  const [specialization, setSpecialization] = useState('clinical therapy');
  const [setting, setSetting] = useState<'office' | 'home' | 'studio' | 'outdoor' | 'video'>('studio');
  const [style, setStyle] = useState<'formal' | 'casual' | 'creative'>('formal');
  const [gender, setGender] = useState<'male' | 'female' | 'unisex'>(initialTemplate?.gender || 'unisex');
  const [customInstructions, setCustomInstructions] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [promptMetrics, setPromptMetrics] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const builder = new HyperRealisticPromptBuilder();

  const specializations = [
    'clinical therapy',
    'family therapy',
    'child and adolescent therapy',
    'couples and relationship therapy',
    'group therapy',
    'trauma therapy',
    'cognitive behavioral therapy',
    'psychoanalysis',
    'humanistic therapy',
    'online therapy sessions'
  ];

  const generateOptimizedPrompt = async () => {
    setIsGenerating(true);

    try {
      // Create context based on selections
      const context = createPsychologistContext(specialization, setting, style, gender);

      // Add custom instructions if provided
      if (customInstructions) {
        context.mood += `. ${customInstructions}`;
      }

      // Get appropriate technical specs
      const specs = TECHNICAL_SPECS[`${setting}_${style === 'formal' ? 'portrait' : 'environment'}`] || TECHNICAL_SPECS.studio_portrait;

      // Generate the prompt
      const optimizedPrompt = builder.buildPrompt(context, specs, gender);

      // Evaluate prompt quality
      const metrics = evaluatePromptConsistency(optimizedPrompt);

      setGeneratedPrompt(optimizedPrompt);
      setPromptMetrics(metrics);

      if (onPromptGenerated) {
        onPromptGenerated(optimizedPrompt);
      }

      toast({
        title: "Prompt otimizado gerado!",
        description: `Score de qualidade: ${metrics.overallConsistencyScore}%`,
      });

    } catch (error) {
      console.error('Error generating prompt:', error);
      toast({
        title: "Erro ao gerar prompt",
        description: "Não foi possível otimizar o prompt. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyPrompt = async () => {
    if (generatedPrompt) {
      await navigator.clipboard.writeText(generatedPrompt);
      toast({
        title: "Prompt copiado!",
        description: "O prompt foi copiado para a área de transferência.",
      });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 75) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return CheckCircle;
    return AlertTriangle;
  };

  return (
    <div className="space-y-6">
      {/* Configuration Panel */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Wand2 className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Gerador de Prompt Hiper-Realístico</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Specialization */}
          <div className="space-y-2">
            <Label htmlFor="specialization">Especialização</Label>
            <Select value={specialization} onValueChange={setSpecialization}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a especialização" />
              </SelectTrigger>
              <SelectContent>
                {specializations.map((spec) => (
                  <SelectItem key={spec} value={spec}>
                    {spec.charAt(0).toUpperCase() + spec.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Setting */}
          <div className="space-y-2">
            <Label htmlFor="setting">Ambiente</Label>
            <Select value={setting} onValueChange={(value: any) => setSetting(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o ambiente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="studio">Estúdio</SelectItem>
                <SelectItem value="office">Consultório</SelectItem>
                <SelectItem value="home">Home Office</SelectItem>
                <SelectItem value="video">Video Call</SelectItem>
                <SelectItem value="outdoor">Ambiente Externo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Style */}
          <div className="space-y-2">
            <Label htmlFor="style">Estilo</Label>
            <Select value={style} onValueChange={(value: any) => setStyle(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o estilo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="casual">Business Casual</SelectItem>
                <SelectItem value="creative">Criativo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label htmlFor="gender">Gênero</Label>
            <Select value={gender} onValueChange={(value: any) => setGender(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o gênero" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Masculino</SelectItem>
                <SelectItem value="female">Feminino</SelectItem>
                <SelectItem value="unisex">Unissex</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Custom Instructions */}
        <div className="space-y-2 mb-6">
          <Label htmlFor="custom">Instruções Personalizadas (Opcional)</Label>
          <Textarea
            id="custom"
            placeholder="Adicione instruções específicas para personalizar o prompt..."
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            rows={3}
          />
        </div>

        {/* Generate Button */}
        <Button
          onClick={generateOptimizedPrompt}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
        >
          {isGenerating ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
              Gerando Prompt Otimizado...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Gerar Prompt Hiper-Realístico
            </>
          )}
        </Button>
      </Card>

      {/* Generated Prompt */}
      {generatedPrompt && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Prompt Otimizado
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={copyPrompt}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copiar
            </Button>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg mb-4">
            <p className="text-sm font-mono leading-relaxed">
              {generatedPrompt}
            </p>
          </div>

          {/* Quality Metrics */}
          {promptMetrics && (
            <div className="space-y-4">
              <h4 className="font-semibold">Métricas de Qualidade</h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Preservação de Identidade</span>
                    <Badge variant="secondary" className={getScoreColor(promptMetrics.identityPreservationScore)}>
                      {promptMetrics.identityPreservationScore}%
                    </Badge>
                  </div>
                  <Progress value={promptMetrics.identityPreservationScore} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Qualidade Técnica</span>
                    <Badge variant="secondary" className={getScoreColor(promptMetrics.technicalQualityScore)}>
                      {Math.round(promptMetrics.technicalQualityScore)}%
                    </Badge>
                  </div>
                  <Progress value={promptMetrics.technicalQualityScore} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Contexto Profissional</span>
                    <Badge variant="secondary" className={getScoreColor(promptMetrics.professionalContextScore)}>
                      {promptMetrics.professionalContextScore}%
                    </Badge>
                  </div>
                  <Progress value={promptMetrics.professionalContextScore} className="h-2" />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                {React.createElement(getScoreIcon(promptMetrics.overallConsistencyScore), {
                  className: `h-5 w-5 ${getScoreColor(promptMetrics.overallConsistencyScore)}`
                })}
                <span className="font-medium">
                  Score Geral: <span className={getScoreColor(promptMetrics.overallConsistencyScore)}>
                    {promptMetrics.overallConsistencyScore}%
                  </span>
                </span>
              </div>

              {promptMetrics.recommendations && promptMetrics.recommendations.length > 0 && (
                <div className="space-y-2">
                  <h5 className="font-medium text-sm">Recomendações:</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {promptMetrics.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default PromptOptimizer;