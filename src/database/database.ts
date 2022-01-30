const { Client } = require('pg');

export const pgClient = new Client({
  user: 'sluip',
  host: 'localhost',
  database: 'postgres',
  password: 's12122000',
  port: 5432,
});

pgClient.connect((err: { stack: any; message: any; }) => {
  if (err) {
    console.error('connect failed', err.stack, 'error message', err.message);
  }

  console.log('Database');
});

module.exports = { pgClient };
