'use strict';

var mongoose = require('mongoose-q')();
var ObjectId = mongoose.Schema.Types.ObjectId;

var ranks = [ 'silver1', 'silver2', 'silver3', 'silver4', 'silver_elite', 'silver_elite_master',
              'gold_nova1', 'gold_nova2', 'gold_nova3', 'gold_nova_master', 'master_guardian1',
              'master_guardian2', 'master_guardian_elite', 'distinguished_master_guardian',
              'legendary_eagle', 'legendary_eagle_master', 'supreme_master_first_class',
              'the_global_elite' ];

var UserSchema = new mongoose.Schema({
  identifier: {
    type: String,
    index: true
  },
  communitySteamId: {
    type: String,
    index: true
  },
  nick: String,
  fullName: String,
  team: ObjectId,
  guild: String,
  rank: {
    type: String,
    enum: ranks
  }
});

module.exports = exports = mongoose.model('users', UserSchema);
