
import * as firebase from 'firebase';

import { Teams } from '../constants/Teams';
import { Opponents } from '../constants/Opponents';

export default class SportGame {

  _team = null;
  _opponent = null;
  _gametime = null;
  _shanahanscore = 0;
  _opponentscore = 0;
  _home = true;

  _key = null;
  _owner = null;

  constructor(snapshot) {

    var val = snapshot.val()

    this._key = snapshot.key;
    this._owner = val.owner;

    val.team.id = val.team;

    this._team = Teams[Number(val.team) ];
    this._opponent = Opponents[Number(val.opponent) ];
    this._gametime = val.gamedate;
    console.log("\n\n\n\n\n\n" + this._gametime);
    this._shanahanscore = Number(val.shanahanscore);
    this._opponentscore = Number(val.opponentscore);
    this._home = val.athome;
  }

  // Accessor methods
  getKey() {
    return this._key;
  }
  getTeam() {
    return this._team.name;
  }
  getTeamObject() {
    return this._team;
  }
  getOpponent() {
    return this._opponent.name;
  }
  getGameDate() {
    return this._gametime;
  }
  getGameTime() {
    return this._gametime;
  }
  getShanahanScore() {
    return this._shanahanscore;
  }
  getOpponentScore() {
    return this._opponentscore;
  }

  getLocation() {
      if(this._home) {
        return "at Home"
      } else {
        return "away at " + this._opponent.name;
      }
  }
  hasGameStartedYet() {
    console.log("Now:" + (new Date()).getTime());
    return (new Date()).getTime() > this._gametime;
  }
  hasGameLikelyEnded() {
    return (new Date()).getTime() - (60 * 60 * 3 * 1000) > this._gametime;
  }
  hasGameCertainlyEnded() {
    return (new Date()).getTime() - (60 * 60 * 5 * 1000) > this._gametime;
  }

  isOwnedByCurrentUser() {
    return (this._owner == firebase.auth().currentUser.uid);
  }
}
