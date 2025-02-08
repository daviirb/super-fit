import { configDotenv } from 'dotenv';
import { expand } from 'dotenv-expand';
import { readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { Client } from 'pg';

expand(configDotenv({ path: '.env' }));

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('Erro: DATABASE_URL não está definido no .env');
  process.exit(1);
}

const client = new Client({ connectionString: databaseUrl });

async function resetDatabase() {
  try {
    await client.connect();
    console.log('✅ Conectado ao banco de dados');

    const schemaPath = resolve('infra', 'queries', 'create-all-tables.sql');
    const schemaQuery = readFileSync(schemaPath, 'utf-8');
    await client.query(schemaQuery);
    console.log('✅ Tabelas criadas!');

    const queriesFolderPath = resolve('infra', 'queries');
    const populateFiles = readdirSync(queriesFolderPath).filter((file) =>
      file.startsWith('populate'),
    );

    for (const file of populateFiles) {
      const filePath = resolve(queriesFolderPath, file);
      const fileQuery = readFileSync(filePath, 'utf-8');
      await client.query(fileQuery);
    }
    console.log(`✅ Banco de dados populado com sucesso`);
  } catch (error) {
    console.error('❌ Erro ao resetar o banco:', error);
  } finally {
    await client.end();
    console.log('🚪 Conexão encerrada.');
  }
}

resetDatabase();
