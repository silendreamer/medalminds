require('dotenv').config({ path: '.env.local' });
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const { Client } = require('pg');
const migrationName = process.argv[2];
if(!migrationName){ console.error('Usage: node markMigrationFinished.js <migration_name>'); process.exit(2); }
(async()=>{
  const conn = process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL;
  const client = new Client({ connectionString: conn, ssl: { rejectUnauthorized: false } });
  try{
    await client.connect();
    const now = new Date().toISOString();
    const res = await client.query('UPDATE "_prisma_migrations" SET finished_at=$1, logs=NULL WHERE migration_name=$2 RETURNING id, finished_at, logs;', [now, migrationName]);
    console.log('updated:', res.rows);
  }catch(e){ console.error(e.message||e);} finally{ await client.end(); }
})();
