'use strict';

var m = angular.module('app.common.constants', []);

m.constant('Ranks', [
  {
    id: 's1',
    fullName: 'Silver I'
  },
  {
    id: 's2',
    fullName: 'Silver II'
  },
  {
    id: 's3',
    fullName: 'Silver III'
  },
  {
    id: 's4',
    fullName: 'Silver IV'
  },
  {
    id: 'se',
    fullName: 'Silver Elite'
  },
  {
    id: 'sem',
    fullName: 'Silver Elite Master'
  },
  {
    id: 'gn1',
    fullName: 'Gold Nova I'
  },
  {
    id: 'gn2',
    fullName: 'Gold Nova II'
  },
  {
    id: 'gn3',
    fullName: 'Gold Nova III'
  },
  {
    id: 'gnm',
    fullName: 'Gold Nova Master'
  },
  {
    id: 'mg1',
    fullName: 'Master Guardian I'
  },
  {
    id: 'mg2',
    fullName: 'Master Guardian II'
  },
  {
    id: 'mge',
    fullName: 'Master Guardian Elite'
  },
  {
    id: 'dmg',
    fullName: 'Distinguished Master Guardian'
  },
  {
    id: 'le',
    fullName: 'Legendary Eagle'
  },
  {
    id: 'lem',
    fullName: 'Legendary Eagle Master'
  },
  {
    id: 'smfc',
    fullName: 'Supreme Master First Class'
  },
  {
    id: 'ge',
    fullName: 'The Global Elite'
  }
]);

m.constant('InvitationTypes', [
  { name: 'admin' },
  { name: 'captain' },
  { name: 'member' },
  { name: 'standin' }
]);
