import { Pool, PoolClient, PoolConfig, QueryConfig, QueryResult } from 'pg';

export const database = Object.freeze({
  getPool,
  endPool,
});

export type Query = Pick<QueryConfig, 'text' | 'values'> | string;

const IS_PRODUCTION_ENVIRONMENT = process.env.NODE_ENV === 'production';
const IS_TEST_ENVIRONMENT = process.env.NODE_ENV === 'test';

const sslConfig = IS_PRODUCTION_ENVIRONMENT
  ? { rejectUnauthorized: false }
  : false;

const poolConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  application_name: 'super_fit',
  ssl: sslConfig,
  max: 20,
};

const pool = new Pool(poolConfig);

async function getPool() {
  async function query(query: Query) {
    let client: PoolClient | undefined;
    try {
      client = await pool.connect();
      return await client.query(query);
    } catch (error) {
      console.error(error);
    } finally {
      client?.release();
    }
  }

  async function transaction(
    callback: (tx: PoolClient) => Promise<void | QueryResult>,
  ) {
    let client: PoolClient | undefined;
    try {
      client = await pool.connect();
      await client.query('BEGIN');
      const transactionResult = await callback(client);
      await client.query('COMMIT');
      return transactionResult;
    } catch (error) {
      await client?.query('ROLLBACK');
      console.error(error);
    } finally {
      client?.release();
    }
  }

  return Object.freeze({
    query,
    transaction,
  });
}

async function endPool() {
  if (IS_TEST_ENVIRONMENT) {
    await pool.end();
  }
}
