const { Client } = require('pg');
const { config } = require('../config/config');

async function GetConnection(){

  const client = new Client(config.dbUrl);
  await client.connect();

  return client;
}

module.exports = GetConnection;

