import { Lexicon } from '../constants/Lexicon'

const nlp = require('compromise');

export default class Announcement {

  _snapshot = null;
  _value = null;
  _nlp = null;

  constructor(snapshot) {
    this._snapshot = snapshot;
    this._value = snapshot.val();
    console.log("lex: " + JSON.stringify(Lexicon));
    this._nlp = nlp(this._value.text, Lexicon);
  }

  getText() {
    console.log(this._value);
    return this._value.text;
  }

  getMentionedClub() {

    var detectedOrganizations = this._nlp.organizations().out('array')
    console.log(detectedOrganizations);

    // If we only detected one organization, return that
    if(detectedOrganizations.length == 1) {
      return nlp(detectedOrganizations[0]).toTitleCase().out()
    }

    // Otherwise, return the longest result
    else if(detectedOrganizations.length > 1) {
      detectedOrganizations.sort(function(o1,o2) {
        return o1.length - o2.length;
      })

      return nlp(detectedOrganizations[0]).toTitleCase().out();
    }

    // Otherwise, return undefined
    return undefined;

  }

  getMentionedDate() {

    var detectedDates = this._nlp.dates().all().out('array');

    // We should only have a single date mentioned
    if(detectedDates.length !=1 ) {
      return undefined;
    } else {
      //return detectedDates[0];
      return undefined;
    }

  }

  getMentionedRoom() {
    return undefined;
  }

  // Sorts the Announcement
  getPriority() {
    return (this._value.priority != undefined) ? this.value.priority : 1;
  }
}
