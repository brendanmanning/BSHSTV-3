import { Teams } from '../constants/Teams';
import { Opponents } from '../constants/Opponents';

export function getTeamsObject() {
  var teams = {};
  for(var team of Teams) {
    teams[team.id] = team.name
  }
  return teams;
}

export function getOpponentsObject() {
  var opponents = {};
  for(var opponent of Opponents) {
    opponents[opponent.id] = opponent.name;
  }
  return opponents;
}
