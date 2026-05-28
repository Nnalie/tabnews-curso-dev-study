const dotenv = require('dotenv');
const { Client } = require('pg');

dotenv.config({ path: '.env.development' });

const PG_HOST = process.env.POSTGRES_HOST || '127.0.0.1';
const PG_PORT = Number(process.env.POSTGRES_PORT || 5432);
const PG_USER = process.env.POSTGRES_USER || 'postgres';
const PG_PASSWORD = process.env.POSTGRES_PASSWORD || '';
const PG_DATABASE = process.env.POSTGRES_DB || 'postgres';
const RETRY_MS = 2000;

async function checkPostgres() {
  const client = new Client({
    host: PG_HOST,
    port: PG_PORT,
    user: PG_USER,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    ssl: false,
    connectionTimeoutMillis: RETRY_MS,
  });

  try {
    await client.connect();
    await client.query('SELECT 1');
    console.log(`Postgres is ready at ${PG_HOST}:${PG_PORT}`);
  } catch (error) {
    console.log(`Postgres is not ready yet: ${error.message}`);
    setTimeout(checkPostgres, RETRY_MS);
  } finally {
    await client.end().catch(() => {});
  }
}

console.log('Waiting for Postgres TCP/IP at', `${PG_HOST}:${PG_PORT}`);
checkPostgres();