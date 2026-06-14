require('dotenv').config({ path: '.env.local' });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { Client } = require('pg');
(async function(){
  const conn = process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL;
  const client = new Client({ connectionString: conn, ssl: { rejectUnauthorized: false } });
  try{
    await client.connect();
    const cols = await client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_schema='public' AND table_name='Question';");
    console.log('Question columns:');
    console.log(cols.rows);
  }catch(e){ console.error('db error', e.message||e);} finally{ await client.end(); }
})();
