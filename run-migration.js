import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabaseUrl = 'https://qflgmcuyxnvflzglfoon.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'sbp_1c07dee4b9339c9d976399c651e13826a794974e';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function runMigration() {
  try {
    console.log('🚀 Iniciando migração...\n');

    // Primeiro, criar a função update_updated_at_column se não existir
    console.log('1️⃣ Criando função update_updated_at_column...');
    const createFunctionSQL = `
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `;

    const { error: functionError } = await supabase.rpc('exec_sql', { sql: createFunctionSQL });

    // Se não existir a função exec_sql, vamos executar diretamente
    if (functionError) {
      console.log('⚠️  Função exec_sql não disponível, executando via query direta...');
    }

    // Ler o arquivo de migração
    console.log('\n2️⃣ Lendo arquivo de migração...');
    const migrationPath = join(__dirname, 'supabase', 'migrations', '20240100000001_create_user_tables.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf8');

    console.log('\n3️⃣ Executando migração SQL...');
    console.log('📝 Conteúdo da migração (primeiras linhas):');
    console.log(migrationSQL.split('\n').slice(0, 10).join('\n'));
    console.log('...\n');

    // Dividir o SQL em comandos individuais e executá-los
    const commands = migrationSQL
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < commands.length; i++) {
      const command = commands[i] + ';';
      try {
        // Usar a API REST do Supabase para executar SQL
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`
          },
          body: JSON.stringify({ query: command })
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }

        successCount++;
        process.stdout.write('✅');
      } catch (err) {
        errorCount++;
        process.stdout.write('❌');
        console.error(`\n\n⚠️  Erro no comando ${i + 1}:`, err.message);
        console.error('Comando:', command.substring(0, 100) + '...');
      }
    }

    console.log(`\n\n📊 Resultado:`);
    console.log(`   ✅ Sucessos: ${successCount}`);
    console.log(`   ❌ Erros: ${errorCount}`);

    if (errorCount === 0) {
      console.log('\n✨ Migração concluída com sucesso!');
    } else {
      console.log('\n⚠️  Migração concluída com alguns erros. Verifique os logs acima.');
    }

    // Verificar se as tabelas foram criadas
    console.log('\n4️⃣ Verificando tabelas criadas...');
    const { data: profiles, error: profilesError } = await supabase
      .from('studio_user_profiles')
      .select('*')
      .limit(0);

    const { data: credits, error: creditsError } = await supabase
      .from('studio_user_credits')
      .select('*')
      .limit(0);

    if (!profilesError) {
      console.log('✅ Tabela studio_user_profiles: OK');
    } else {
      console.log('❌ Tabela studio_user_profiles:', profilesError.message);
    }

    if (!creditsError) {
      console.log('✅ Tabela studio_user_credits: OK');
    } else {
      console.log('❌ Tabela studio_user_credits:', creditsError.message);
    }

  } catch (error) {
    console.error('\n❌ Erro fatal durante a migração:', error);
    process.exit(1);
  }
}

runMigration();
