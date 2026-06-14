require('dotenv').config({ path: '.env.local' });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { Client } = require('pg');
(async function(){
  const conn = process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL;
  const client = new Client({ connectionString: conn, ssl: { rejectUnauthorized: false } });
  try{
    await client.connect();
    console.log('Connected.');
    const tables = await client.query("SELECT tablename FROM pg_tables WHERE schemaname='public';");
    console.log('Tables:', tables.rows.map(r=>r.tablename).join(', '));
    const idx = await client.query("SELECT indexname, tablename FROM pg_indexes WHERE schemaname='public' AND indexname ILIKE '%practicequestion%';");
    console.log('PracticeQuestion-like indexes:', idx.rows);
    const idx2 = await client.query("SELECT indexname, tablename FROM pg_indexes WHERE schemaname='public' AND indexname ILIKE '%question%';");
    console.log('Question-like indexes sample:', idx2.rows.slice(0,20));
  }catch(e){
    console.error('db error', e.message||e);
  }finally{ await client.end(); }
})();
