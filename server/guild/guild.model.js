'use strict';

var mongoose = require('mongoose-q')();

var guildShortNames = [ 'tite', 'digit', 'otit', 'tik', 'cluster' ];

var GuildSchema = new mongoose.Schema({
  shortName: {
    type: String,
    enum: guildShortNames,
    index: true
  },

  fullName: String,
});

module.exports = exports = mongoose.model('guilds', GuildSchema);
