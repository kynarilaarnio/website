// TODO: Select correct configuration with gulp argv or from environment

var config = require('./dev.config.js');

module.exports = {
  baseUrl: config.baseUrl,
  port: config.port,
  steamApiKey: config.steamApiKey,
  secret: config.secret
};
