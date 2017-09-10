import { Platform } from 'react';
import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';

export default class BetterExpoNotifications {

  // Register a user for the push notification service
  async register() {

    // Make sure we setup the permissions
    await this.setupPermissions();

    // If they were rejected, return
    if(this.rejected) {
      console.log("Permissions rejected!");
      return false;
    }

    // Build the request url
    var url = this.rootUrl + this.registerRequest;

    // Bind the params
    url = url.replace(/{userid}/gi, this.userid);
    url = url.replace(/{token}/gi, this.token);

    console.log("Hitting " + url);

    // Make a request to the server
    await fetch(url);

    return;
  }

  async subscribe(topic, callback) {

    await this.register();

    var url = this.rootUrl + this.subscribeRequest;
    url = url.replace(/{userid}/gi, this.userid);
    url = url.replace(/{topic}/gi, topic);

    console.log("Hitting " + url);

    await fetch(url);

    // Save the registration to AsyncStorage
    console.log(("Setting key: @BEN:" + this.userid + "::" + topic));
    AsyncStorage.setItem(("@BEN:" + this.userid + "::" + topic), JSON.stringify(true), function(error) {});

    callback(true);

    return;
  }

  // Send a push notification to a topic
  async sendToTopic(topic, message) {

    var url = this.rootUrl + this.sendRequest;

    url = url.replace(/{topic}/, topic);
    url = url.replace(/{title}/, message.title);
    url = url.replace(/{body}/, message.body);
    url = url.replace(/{sound}/, message.sound);

    url = url.replace(/ /g, "%20");

    console.log("Sending by: " + url);

    await fetch(url);

    return;
  }

  // Make all subsequent requests using this userid
  asUser(userid) {
    this.userid = userid;
  }

  // Setup notification permissions
  async setupPermissions() {

    console.log("Setting up permissions...");

    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    // Stop here if the user did not grant permissions
    if (status !== 'granted') {
      this.rejected = true;
      return false;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    this.token = token;
    console.log("Token: " + token);

    // Save the token in self
    this.setup = true;
    this.settingup = false;

    return true;
  }

  // The prepare function is run before subscribing to a notification thread
  /*async prepare() {

    // Make sure the user is registered
    this.isUserRegistered(this.userid, (function(registered) {

      // If they're not registerd, perform the setup function
      await this.setupPermissions();
      await this.register();

    }).bind(this))
  }*/

  // Just singleton stuff...
  static instance = null;
  static notifications() {
    if(this.instance == null) {
      this.instance = new BetterExpoNotifications();
    }
    return this.instance;
  }

  // The constructor
  constructor() {

    this.rootUrl = "http://apps.brendanmanning.com/bshstv/push/api.php";

    this.registerRequest = "?action=register&user={userid}&token={token}";
    this.sendRequest = "?action=push&topic={topic}&title={title}&body={body}&sound={sound}";
    this.subscribeRequest = "?action=subscribe&user={userid}&topic={topic}";

    this.userid = "unknown";

    // Push notification token
    this.token = null;

    // Permission states
    this.setup = false;
    this.settingup = false;
    this.rejected = false;

  }

  // MARK: - AsyncStorage methods

  // Were notifications enabled int he past?
  notificationsEnabled(callback) {
    AsyncStorage.getItem('@BEN:NotificationsEnabled', function(error, value) {
      callback ( value == true );
    });
  }

  // Is this user registered with the web service
  isUserRegistered(userid, callback) {
    AsyncStorage.getItem('@BEN:LastAuthToken', function(error, value) {
      if(error != undefined && error != null) {
        callback(false);
      } else {
        return (value == userid);
      }
    })
  }

  // is the user subscribed to a topic (as cached on this device?)
  isUserRegisteredForTopic(userid, topic, callback) {
    console.log("Getting key: " + "@BEN:" + userid + "::" + topic)
    AsyncStorage.getItem("@BEN:" + userid + "::" + topic, function(error, value) {
      console.log("Got value: " + value);
      callback(value != null && value != undefined);
    });
  }
}
