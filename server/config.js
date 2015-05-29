'use strict';

var config;

try {
  config = require('./dev.config.js');
}
catch (err) {
  if (err) {
    config = {};
  }
}

module.exports = {
  baseUrl: config.baseUrl || process.env.BASE_URL,
  port: config.port || 80,
  steamApiKey: config.steamApiKey || process.env.STEAM_API_KEY,
  secret: config.secret || process.env.SECRET,
  adminCode: config.adminCode || process.env.ADMIN_CODE,
  dbHost: config.dbHost || process.env.DATABASE_HOST,
  dbPort: config.dbPort || process.env.DATABASE_PORT,
  dbUser: config.dbUser || process.env.DATABASE_USER,
  dbPass: config.dbPass || process.env.DATABASE_PASSWORD,
  dbName: config.dbName || process.env.DATABASE_NAME,
  dbUrl: config.dbUrl  || process.env.DATABASE_URL
};
