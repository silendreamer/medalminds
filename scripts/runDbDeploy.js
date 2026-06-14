require('dotenv').config({ path: '.env.local' });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const cp = require('child_process');
const res = cp.spawnSync('npm', ['run','db:deploy'], { stdio: 'inherit', env: process.env, shell: true });
if (res.error) {
  console.error('spawn error', res.error);
  process.exit(1);
}
process.exit(res.status);
