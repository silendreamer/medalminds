require('dotenv').config({ path: '.env.local' });
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
const { Client } = require('pg');
(async()=>{
  const conn = process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL;
  const client = new Client({ connectionString: conn, ssl: { rejectUnauthorized: false } });
  try{
    await client.connect();
    const res = await client.query("SELECT id FROM \"Competition\" WHERE id='science-bowl';");
    if(res.rows.length === 0){
      console.log('Inserting competition science-bowl');
      await client.query("INSERT INTO \"Competition\" (id, slug, name, description, \"shortDescription\", subdomain, categories, \"createdAt\", \"updatedAt\") VALUES ('science-bowl','science-bowl','Science Bowl','U.S. DOE Science Bowl','Science Bowl','',ARRAY[]::text[], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)");
      console.log('Inserted');
    } else {
      console.log('Competition already exists');
    }
  }catch(e){ console.error('db error', e.message||e);} finally{ await client.end(); }
})();
