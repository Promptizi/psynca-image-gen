// Script de teste para validar qualidade e consistência dos prompts otimizados
import { templateCategories } from '@/data/templateCategories';
import { evaluatePromptConsistency, type ConsistencyMetrics } from '@/lib/prompt-optimizer';

interface PromptTestResult {
  templateId: string;
  title: string;
  category: string;
  metrics: ConsistencyMetrics;
  passed: boolean;
  issues: string[];
}

interface TestSummary {
  totalTemplates: number;
  passedTemplates: number;
  failedTemplates: number;
  averageScore: number;
  categoryResults: Record<string, {
    total: number;
    passed: number;
    averageScore: number;
  }>;
  results: PromptTestResult[];
}

// Critérios mínimos para aprovação
const QUALITY_THRESHOLDS = {
  identityPreservation: 90,      // Mínimo 90% para preservação de identidade
  technicalQuality: 85,          // Mínimo 85% para qualidade técnica
  professionalContext: 80,       // Mínimo 80% para contexto profissional
  overallConsistency: 85,        // Score geral mínimo 85%
};

// Validadores específicos para elementos críticos
const validateCriticalElements = (prompt: string): string[] => {
  const issues: string[] = [];

  // 1. Verificação de preservação de identidade (CRÍTICO)
  const identityKeywords = ['maintaining 100%', 'complete facial identity', 'Same person'];
  const hasIdentityPreservation = identityKeywords.some(keyword =>
    prompt.toLowerCase().includes(keyword.toLowerCase())
  );

  if (!hasIdentityPreservation) {
    issues.push('CRÍTICO: Ausência de instruções explícitas de preservação de identidade facial');
  }

  // 2. Verificação de especificações técnicas de câmera
  const technicalKeywords = ['Canon EOS R5', '85mm', 'f/', 'lighting'];
  const hasTechnicalSpecs = technicalKeywords.every(keyword =>
    prompt.toLowerCase().includes(keyword.toLowerCase())
  );

  if (!hasTechnicalSpecs) {
    issues.push('Faltam especificações técnicas completas de câmera e iluminação');
  }

  // 3. Verificação de qualidade hiper-realística
  const realismKeywords = ['hyperrealistic', '8K', 'professional photography'];
  const hasRealisticSpecs = realismKeywords.some(keyword =>
    prompt.toLowerCase().includes(keyword.toLowerCase())
  );

  if (!hasRealisticSpecs) {
    issues.push('Ausência de especificações de qualidade hiper-realística');
  }

  // 4. Verificação de contexto profissional psicológico
  const professionalKeywords = ['psychologist', 'therapy', 'professional'];
  const hasProfessionalContext = professionalKeywords.some(keyword =>
    prompt.toLowerCase().includes(keyword.toLowerCase())
  );

  if (!hasProfessionalContext) {
    issues.push('Contexto profissional psicológico não especificado claramente');
  }

  // 5. Verificação de pós-processamento profissional
  const postProcessKeywords = ['color grading', 'retouching', 'professional finish'];
  const hasPostProcessing = postProcessKeywords.some(keyword =>
    prompt.toLowerCase().includes(keyword.toLowerCase())
  );

  if (!hasPostProcessing) {
    issues.push('Instruções de pós-processamento profissional ausentes');
  }

  // 6. Verificação de estrutura adequada do prompt
  if (prompt.length < 200) {
    issues.push('Prompt muito curto - pode não ter detalhamento suficiente');
  }

  if (prompt.length > 1000) {
    issues.push('Prompt muito longo - pode confundir o modelo de IA');
  }

  return issues;
};

// Função principal de teste
export const runPromptQualityTest = (): TestSummary => {
  const results: PromptTestResult[] = [];
  const categoryStats: Record<string, { total: number; passed: number; scores: number[] }> = {};

  // Testa cada template
  templateCategories.forEach(category => {
    if (!categoryStats[category.title]) {
      categoryStats[category.title] = { total: 0, passed: 0, scores: [] };
    }

    category.templates.forEach(template => {
      // Avalia métricas básicas
      const metrics = evaluatePromptConsistency(template.prompt);

      // Validações críticas adicionais
      const criticalIssues = validateCriticalElements(template.prompt);

      // Determina se passou nos critérios
      const passedCriteria = {
        identity: metrics.identityPreservationScore >= QUALITY_THRESHOLDS.identityPreservation,
        technical: metrics.technicalQualityScore >= QUALITY_THRESHOLDS.technicalQuality,
        professional: metrics.professionalContextScore >= QUALITY_THRESHOLDS.professionalContext,
        overall: metrics.overallConsistencyScore >= QUALITY_THRESHOLDS.overallConsistency,
        noCriticalIssues: criticalIssues.length === 0
      };

      const passed = Object.values(passedCriteria).every(Boolean);

      // Combina issues das métricas com validações críticas
      const allIssues = [...metrics.recommendations, ...criticalIssues];

      const result: PromptTestResult = {
        templateId: template.id,
        title: template.title,
        category: category.title,
        metrics,
        passed,
        issues: allIssues
      };

      results.push(result);

      // Atualiza estatísticas da categoria
      categoryStats[category.title].total++;
      if (passed) {
        categoryStats[category.title].passed++;
      }
      categoryStats[category.title].scores.push(metrics.overallConsistencyScore);
    });
  });

  // Calcula estatísticas finais
  const totalTemplates = results.length;
  const passedTemplates = results.filter(r => r.passed).length;
  const failedTemplates = totalTemplates - passedTemplates;
  const averageScore = results.reduce((sum, r) => sum + r.metrics.overallConsistencyScore, 0) / totalTemplates;

  // Processa estatísticas por categoria
  const categoryResults: Record<string, any> = {};
  Object.entries(categoryStats).forEach(([category, stats]) => {
    categoryResults[category] = {
      total: stats.total,
      passed: stats.passed,
      averageScore: stats.scores.reduce((sum, score) => sum + score, 0) / stats.scores.length
    };
  });

  return {
    totalTemplates,
    passedTemplates,
    failedTemplates,
    averageScore,
    categoryResults,
    results: results.sort((a, b) => a.metrics.overallConsistencyScore - b.metrics.overallConsistencyScore)
  };
};

// Função para gerar relatório detalhado
export const generateQualityReport = (testSummary: TestSummary): string => {
  const {
    totalTemplates,
    passedTemplates,
    failedTemplates,
    averageScore,
    categoryResults,
    results
  } = testSummary;

  let report = '';

  // Cabeçalho do relatório
  report += '🧪 RELATÓRIO DE QUALIDADE DOS PROMPTS HIPER-REALÍSTICOS\n';
  report += '=' .repeat(65) + '\n\n';

  // Resumo geral
  report += '📊 RESUMO GERAL:\n';
  report += '-'.repeat(20) + '\n';
  report += `Total de Templates: ${totalTemplates}\n`;
  report += `✅ Aprovados: ${passedTemplates} (${((passedTemplates/totalTemplates)*100).toFixed(1)}%)\n`;
  report += `❌ Reprovados: ${failedTemplates} (${((failedTemplates/totalTemplates)*100).toFixed(1)}%)\n`;
  report += `📈 Score Médio: ${averageScore.toFixed(1)}%\n\n`;

  // Resultados por categoria
  report += '📋 RESULTADOS POR CATEGORIA:\n';
  report += '-'.repeat(30) + '\n';
  Object.entries(categoryResults).forEach(([category, stats]) => {
    const passRate = ((stats.passed / stats.total) * 100).toFixed(1);
    const scoreColor = stats.averageScore >= 90 ? '🟢' : stats.averageScore >= 75 ? '🟡' : '🔴';

    report += `${scoreColor} ${category}:\n`;
    report += `   • Aprovação: ${stats.passed}/${stats.total} (${passRate}%)\n`;
    report += `   • Score Médio: ${stats.averageScore.toFixed(1)}%\n\n`;
  });

  // Templates com problemas
  const failedResults = results.filter(r => !r.passed);
  if (failedResults.length > 0) {
    report += '⚠️ TEMPLATES QUE PRECISAM DE ATENÇÃO:\n';
    report += '-'.repeat(40) + '\n';

    failedResults.forEach(result => {
      report += `❌ ${result.title} (${result.category})\n`;
      report += `   Score: ${result.metrics.overallConsistencyScore}%\n`;
      result.issues.forEach(issue => {
        report += `   • ${issue}\n`;
      });
      report += '\n';
    });
  }

  // Recomendações gerais
  report += '💡 RECOMENDAÇÕES GERAIS:\n';
  report += '-'.repeat(25) + '\n';

  if (averageScore < 85) {
    report += '• Score médio abaixo do ideal (85%+). Revisar prompts com menor pontuação.\n';
  }

  if (failedTemplates > 0) {
    report += '• Focar na correção dos templates reprovados antes do deploy.\n';
  }

  const criticalIssues = results.filter(r =>
    r.issues.some(issue => issue.includes('CRÍTICO'))
  ).length;

  if (criticalIssues > 0) {
    report += `• ${criticalIssues} templates têm problemas críticos de preservação de identidade!\n`;
  }

  report += '• Todos os prompts devem ter 90%+ em preservação de identidade.\n';
  report += '• Manter especificações técnicas Canon EOS R5 + 85mm em todos os prompts.\n\n';

  // Status final
  const overallStatus = (passedTemplates / totalTemplates) >= 0.9;
  report += '🎯 STATUS FINAL:\n';
  report += '-'.repeat(15) + '\n';
  report += overallStatus
    ? '✅ SISTEMA APROVADO - Prompts prontos para produção!\n'
    : '⚠️ REQUER ATENÇÃO - Corrigir templates reprovados antes do deploy.\n';

  return report;
};

// Função utilitária para testar um prompt específico
export const testSinglePrompt = (prompt: string, templateInfo?: { id: string; title: string; category: string }): PromptTestResult => {
  const metrics = evaluatePromptConsistency(prompt);
  const criticalIssues = validateCriticalElements(prompt);

  const passedCriteria = {
    identity: metrics.identityPreservationScore >= QUALITY_THRESHOLDS.identityPreservation,
    technical: metrics.technicalQualityScore >= QUALITY_THRESHOLDS.technicalQuality,
    professional: metrics.professionalContextScore >= QUALITY_THRESHOLDS.professionalContext,
    overall: metrics.overallConsistencyScore >= QUALITY_THRESHOLDS.overallConsistency,
    noCriticalIssues: criticalIssues.length === 0
  };

  const passed = Object.values(passedCriteria).every(Boolean);
  const allIssues = [...metrics.recommendations, ...criticalIssues];

  return {
    templateId: templateInfo?.id || 'test',
    title: templateInfo?.title || 'Teste de Prompt',
    category: templateInfo?.category || 'Teste',
    metrics,
    passed,
    issues: allIssues
  };
};

export default { runPromptQualityTest, generateQualityReport, testSinglePrompt };