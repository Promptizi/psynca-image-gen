# Guia de Configuração do Stripe

## 📋 Pré-requisitos

1. Conta no Stripe (https://stripe.com)
2. Projeto Supabase configurado
3. Variáveis de ambiente configuradas

## 🔧 Configuração das Variáveis de Ambiente

### 1. Frontend (.env.local)
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 2. Edge Functions (Supabase Dashboard → Project Settings → Edge Functions)
```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_SERVICE_ROLE_KEY=service_role_key...
```

## 🚀 Deploy das Edge Functions

```bash
# 1. Instalar Supabase CLI
npm install -g supabase

# 2. Login no Supabase
supabase login

# 3. Link com o projeto
supabase link --project-ref YOUR_PROJECT_REF

# 4. Deploy das funções
supabase functions deploy create-checkout-session
supabase functions deploy stripe-webhook
supabase functions deploy handle-payment-success

# 5. Configurar variáveis de ambiente
supabase secrets set STRIPE_SECRET_KEY=sk_test_...
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
```

## 🔗 Configuração do Webhook no Stripe

### 1. Acessar Dashboard do Stripe
- Ir para: Developers → Webhooks → Add endpoint

### 2. Endpoint URL
```
https://YOUR_PROJECT_REF.supabase.co/functions/v1/stripe-webhook
```

### 3. Eventos para ouvir
Selecionar os eventos:
- `checkout.session.completed`
- `payment_intent.succeeded`
- `payment_intent.payment_failed`

### 4. Obter Webhook Secret
- Após criar o webhook, copiar o `Signing secret`
- Adicionar como `STRIPE_WEBHOOK_SECRET` nas Edge Functions

## 💳 Produtos no Stripe

### Criar Produtos (Opcional)
Os produtos são criados dinamicamente via API, mas você pode criar no dashboard:

1. **Pacote Básico**
   - Nome: "Pacote Básico - 10 Créditos"
   - Preço: R$ 9,99

2. **Pacote Premium**
   - Nome: "Pacote Premium - 60 Créditos"
   - Preço: R$ 49,99

3. **Pacote Profissional**
   - Nome: "Pacote Profissional - 125 Créditos"
   - Preço: R$ 99,99

## 🧪 Teste Local

### 1. Tunnel para Webhooks (Desenvolvimento)
```bash
# Instalar Stripe CLI
# https://stripe.com/docs/stripe-cli

# Login no Stripe CLI
stripe login

# Tunnel para webhook local
stripe listen --forward-to localhost:54321/functions/v1/stripe-webhook
```

### 2. Cartões de Teste
```
# Sucesso
4242 4242 4242 4242

# Cartão rejeitado
4000 0000 0000 0002

# CVV: 123
# Data: qualquer data futura
```

## 📊 Monitoramento

### Dashboard Stripe
- Pagamentos: Dashboard → Payments
- Logs: Dashboard → Developers → Logs
- Webhooks: Dashboard → Developers → Webhooks

### Supabase
- Logs das Edge Functions: Dashboard → Edge Functions → Logs
- Tabelas de pagamento: Dashboard → Table Editor

## 🔍 Troubleshooting

### Webhook não funciona
1. Verificar URL do endpoint
2. Confirmar que os eventos estão selecionados
3. Verificar `STRIPE_WEBHOOK_SECRET`
4. Checar logs das Edge Functions

### Pagamento não adiciona créditos
1. Verificar se o webhook foi executado
2. Checar logs das Edge Functions
3. Verificar se a tabela `studio_user_credits` existe
4. Confirmar RLS policies

### Erro de autenticação
1. Verificar `STRIPE_SECRET_KEY`
2. Confirmar chave publishable no frontend
3. Verificar se o usuário está autenticado

## 📚 Referências

- [Stripe Docs](https://stripe.com/docs)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Checkout Session](https://stripe.com/docs/payments/checkout)