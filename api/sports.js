import * as firebase from 'firebase';

import SportsGame from '../models/SportsGame';

import Notifications from './notifications';

import { Alert } from 'react-native';

export function addSportsEvent(formData, callback) {

  var firebaseRef = firebase.database().ref();

  formData['team'] = Number(formData['team']);
  formData['opponent'] = Number(formData['opponent']);
  formData['gamedate'] = formData['gamedate'].getTime();
  formData['shanahanscore'] = Number(formData['shanahanscore']);
  formData['opponentscore'] = Number(formData['opponentscore']);
  formData['owner'] = firebase.auth().currentUser.uid;

  // Add a new child of the "sports" key
  firebaseRef.child('sports').push(formData, function(error) {
    callback(error == undefined || error == null);
  });

  // Do we have to show the future game explanation?
  if(formData['gamedate'] > (new Date()).getTime()) {
    showFutureGameExplanation();
  }
}

export function updateSportsEventScore(event, leftScore, rightScore, callback) {
  
  var firebaseRef = firebase.database().ref();

  firebaseRef.child('sports').child(event.getKey()).update({
    shanahanscore: leftScore,
    opponentscore: rightScore
  }, function(error) {
    callback(error == null);
  });

      // Update the game object for sending the push notification
      event['_shanahanscore'] = leftScore;
      event['_opponentscore'] = rightScore;

      // Send a push notification
    Notifications.sendScoreUpdate(event);
}

export function sportsEventAdded(callback) {
  var firebaseRef = firebase.database().ref();
  firebaseRef.child('sports').on('child_added', function(snapshot) {
    console.log(JSON.stringify(snapshot));
    callback(new SportsGame(snapshot));
  });
}

// Callback (changed_value)
export function sportsEventChanged(callback) {
  var firebaseRef = firebase.database().ref();
  firebaseRef.child('sports').on('child_changed', function(snapshot) {
    console.log("New snapshot: " + JSON.stringify(snapshot));
    callback(new SportsGame(snapshot));
  });
}

// MARK: - Utility function
function showFutureGameExplanation() {
  Alert.alert("Live score updates", 'You can use the up and down arrows on top of your game to change the score. Everyone who clicks Get Updates will get a notification when you update the score.');
}