const { Pool } = require('pg');
const { config } = require('../config/config');

const options = {
  connectionString: config.dbUrl
};

if(config.isProd){
  options.ssl = {
    rejectUnauthorized : false
  };
}

const pool = new Pool({  });


module.exports = pool;

