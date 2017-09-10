import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';

import Authentication from './scripts/Authentication';

import * as firebase from 'firebase';

import BetterExpoNotifications from './api/better-expo-notifications';

const firebaseConfig = {
    apiKey: "AIzaSyAwsGksmbsSkdJs-v6EAN3Bbiqke3kI014",
    authDomain: "bshstv3.firebaseapp.com",
    databaseURL: "https://bshstv3.firebaseio.com",
    projectId: "bshstv3",
    storageBucket: "bshstv3.appspot.com",
    messagingSenderId: "645862932935"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      loading: true
    }

    console.disableYellowBox = true; 
  }

  componentWillMount() {

   // Observe the authentication state
   firebase.auth().onAuthStateChanged((function(user) {
     if (user) {

       // Link the
       BetterExpoNotifications.notifications().asUser(user.uid);

       this.setState({loading: false})
     } else {
       Authentication.anonymous();
     }
   }).bind(this));
  }

  render() {
    if (this.state.loading) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' &&
            <View style={styles.statusBarUnderlay} />}
          <RootNavigation />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
