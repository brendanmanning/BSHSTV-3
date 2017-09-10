
import Announcement from '../models/Announcement';

import * as firebase from 'firebase';

// Callback of form: (announcement:Announcement)
export function announcementAdded(callback) {
  var activitiesRef = firebase.database().ref().child('announcements');
  activitiesRef.on('child_added', function(snapshot) {
    callback(new Announcement(snapshot));
  });
}
