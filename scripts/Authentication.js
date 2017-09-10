import * as firebase from 'firebase';

export default class Authentication {

  static uid() {
    return firebae.auth().currentUser.uid;
  }

  static anonymous() {
    firebase.auth().signInAnonymously().then(function() {

    }).catch(function(error) {
      callback();
    });
  }
}
