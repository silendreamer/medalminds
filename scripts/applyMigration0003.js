require('dotenv').config({ path: '.env.local' });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const fs = require('fs');
const { Client } = require('pg');
(async function(){
  const sql = fs.readFileSync('prisma/migrations/0003_rename_practice_question/migration.sql','utf8');
  const conn = process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL;
  const client = new Client({ connectionString: conn, ssl: { rejectUnauthorized: false } });
  try{
    await client.connect();
    console.log('Applying migration SQL...');
    await client.query(sql);
    console.log('SQL applied. Marking migration finished.');
    await client.query("UPDATE _prisma_migrations SET finished_at = now(), logs = NULL WHERE migration_name = '0003_rename_practice_question' AND finished_at IS NULL;");
    console.log('Migration marked as finished.');
  }catch(e){
    console.error('Error applying migration:', e.message || e);
    process.exit(1);
  }finally{ await client.end(); }
})();
