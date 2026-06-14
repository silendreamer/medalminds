require('dotenv').config({ path: '.env.local' });
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const { Client } = require('pg');
(async()=>{
  const conn = process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL;
  const client = new Client({ connectionString: conn, ssl: { rejectUnauthorized: false } });
  try{
    await client.connect();
    const res = await client.query("SELECT id, name FROM \"Competition\" WHERE id='science-bowl';");
    console.log('competition row:', res.rows);
  }catch(e){ console.error('db error', e.message||e);} finally{ await client.end(); }
})();
