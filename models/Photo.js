import * as firebase from 'firebase';
import Authentication from '../scripts/Authentication';

export default class Photo {

    /**
     * Instance variables
     */
    _id = null;
    _url = null;
    _user = null;
    _likes = null; 
    _db_photo_ref = null;
    _db_likes_ref = null;

    /**
     * Constructor for objects of the Photo class
     * @param snapshot A firebase database snapshot with the photo data (see photos/ key)
     */
    constructor(snapshot) {

      _id = snapshot.key();

      _url = snapshot.val().url;
      _user = snapshot.val().user;
      _likes = snapshot.val().likes;

      _db_photo_ref = firebase.database().ref().child('photos').child(this._id);
      _db_likes_ref = firebase.database().ref().child('photoslikes').child(this._id);

    }

    /**
     * Observes if the current firebase user is allowed to like this picture
     * The user is forbidden from liking it if they have already liked it before
     * @param callback A callback to be called upon this method checking the availibility of the like commands. Callback signature: (permission:Bool) -> Void
     */
    observeLikingPermission(callback) {
      this._db_likes_ref.child(Authentication.uid()).on('value', function(snapshot) {
        callback(snaphot.val() == true);
      });
    }

    /**
     * Observes the amount of likes this picture has
     * @param callback Callback is called when the number of likes is updated. It is also called once with the initial value before any updates. Callback signature: (likes:Int) -> Void
     */
    observeLikes(callback) {
      this._db_photo_ref.child("likes").on('value', function(snapshot) {
        callback(snapshot.val());
      });
    }

    /**
     * Likes a picture
     */
    like() {

        // Increment the likes count
        this._db_photo_ref.child("likes").transaction(function(currentvalue) {
            return currentvalue + 1;
        });

        // Add this user to the list of users that have liked the picture
        this._db_likes_ref.child(Authentication.uid()).set(true);
    }

    /**
     * Accessor methods
     */

    /**
     * Get the id of the picture
     * @return the firebase database key of this photo object
     */
    id() {
        return this._id;
    }
}