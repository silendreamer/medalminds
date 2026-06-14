require('dotenv').config({ path: '.env.local' });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = process.env.NODE_TLS_REJECT_UNAUTHORIZED || '0';
const { Client } = require('pg');

async function main(){
  const conn = process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL;
  if(!conn){
    console.error('No connection string found in env.');
    process.exit(2);
  }
  const client = new Client({ connectionString: conn, ssl: { rejectUnauthorized: false } });
  try{
    await client.connect();
    const qRes = await client.query("SELECT to_regclass('public.question') AS q_tbl, to_regclass('public.answer') AS a_tbl;");
    console.log('table presence:', qRes.rows[0]);

    const counts = {};
    try{ const r1 = await client.query('SELECT COUNT(*) AS c FROM question'); counts.questions = r1.rows[0].c; } catch(e){ counts.questions = 'ERR'; }
    try{ const r2 = await client.query('SELECT COUNT(*) AS c FROM answer'); counts.answers = r2.rows[0].c; } catch(e){ counts.answers = 'ERR'; }
    console.log('counts:', counts);
  }catch(e){
    console.error('DB query error:', e.message || e);
    process.exit(1);
  }finally{
    await client.end();
  }
}

main().catch(e=>{ console.error(e); process.exit(1); });
