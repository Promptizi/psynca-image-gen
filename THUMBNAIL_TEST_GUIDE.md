# Guia de Teste de Thumbnails

## 🚀 Como Usar o Gerador de Thumbnails

### 1. Acessar a Interface de Teste
Abra no navegador: http://localhost:8081/thumbnail-tester

### 2. Iniciar Geração
- Clique em "Iniciar Geração (36 templates)"
- O processo levará aproximadamente 3 minutos
- Cada thumbnail leva ~3 segundos para gerar

### 3. Durante a Geração
- Você verá o progresso em tempo real
- Pode parar a qualquer momento com "Parar Geração"
- Os resultados são salvos mesmo se parar

### 4. Após a Geração
Você terá 4 opções:

#### a) Baixar Imagens
- Clica em "Baixar Imagens" para baixar todas as thumbnails geradas
- As imagens serão baixadas com o nome: `{template-id}.jpg`

#### b) Exportar JSON
- Gera um arquivo `thumbnail-mapping.json` com o mapeamento
- Útil para backup ou integração

#### c) Copiar Código
- Copia o código TypeScript pronto para colar em `templateCategories.ts`
- Inclui o objeto `generatedThumbnails` com todas as URLs

#### d) Ver Preview
- Visualiza as primeiras 12 imagens geradas
- Pode clicar em "Ver" para abrir cada imagem

## 📝 Atualizar o Sistema com as Thumbnails Geradas

### Opção 1: Usar URLs Diretas (Recomendado para teste)
1. Após gerar, clique em "Copiar Código"
2. Abra o arquivo `src/data/templateCategories.ts`
3. Cole o código no final do arquivo
4. Atualize a função `getTemplateThumbnail` para usar o novo mapeamento

### Opção 2: Baixar e Usar Localmente
1. Baixe todas as imagens com "Baixar Imagens"
2. Mova para `public/generated-thumbnails/`
3. Use o mapeamento JSON para atualizar as referências

## 🔧 Usando via Console (Alternativa)

Se preferir usar o console do navegador:

```javascript
// O gerador está disponível globalmente
thumbnailGenerator.generateAll()

// Parar geração
thumbnailGenerator.stop()

// Baixar todas as imagens
thumbnailGenerator.downloadAllImages()

// Ver resultados
thumbnailGenerator.getResults()
```

## ⚠️ Notas Importantes

- **API Key**: Certifique-se que `VITE_GOOGLE_NANO_BANAN_API_KEY` está configurada em `.env.local`
- **Imagem de Referência**: O arquivo `/public/reference-face.jpg` deve existir
- **Rate Limiting**: O sistema aguarda 3 segundos entre requisições para evitar limites da API
- **Persistência**: Os resultados são mantidos até recarregar a página

## 🎯 Fluxo Completo

1. Acesse http://localhost:8081/thumbnail-tester
2. Clique em "Iniciar Geração"
3. Aguarde ~3 minutos
4. Clique em "Copiar Código"
5. Cole no arquivo `templateCategories.ts`
6. As thumbnails estarão atualizadas em todo o sistema!

## 📊 Estatísticas Esperadas

- Total de Templates: 36
- Categorias: 6
- Tempo Total: ~3 minutos
- Taxa de Sucesso: ~95%+ (dependendo da API)

## 🐛 Troubleshooting

### Erro "Imagem de referência não carregada"
- Verifique se `/public/reference-face.jpg` existe
- Tente recarregar a página

### Geração muito lenta
- Normal, cada imagem leva 3-5 segundos
- Não reduza o delay para evitar rate limiting

### Algumas imagens falharam
- Normal ter 1-2 falhas em 36
- Você pode gerar individualmente as que falharam

---

Pronto para testar! 🎨