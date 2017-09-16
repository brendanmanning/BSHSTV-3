import { Lexicon, LexiconOverrides } from '../constants/Lexicon'

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

    // Check if any overridden words are contained in the text
    for(var word of LexiconOverrides) {
      if(this._value.text.indexOf(word) >= 0) {
        return word;
      }
    }

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

      // Make sure we didn't get some random word
      if(detectedOrganizations[0].length <= 6) {
        return undefined;
      }

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
      //return undefined;
    }

  }

  getMentionedRoom() {
    return undefined;
  }

  // Sorts the Announcement
  getPriority() {
    return (this._value.priority != undefined) ? this.value.priority : (

      // -1 or -2 or -3, etc
      // We can actually just leave it with the dash. This makes the value negative and thus
      // announcements 1, 2, 3 and three (-1,-2,-3) appear closer to the top
      Number(this._snapshot.key)
    );
  }
}
