import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';

import { ExpoConfigView } from '@expo/samples';

import SportsGridView from '../components/SportsGridView';

import GridView from 'react-native-grid-view';

import * as firebase from 'firebase';
import BetterExpoNotifications from '../api/better-expo-notifications';

import AppConfig from '../AppConfig';

import Icon from 'react-native-vector-icons/Ionicons';

export default class GamesList extends React.Component {

  static navigationOptions = function({ navigation }) {

    console.log(JSON.stringify(navigation));

    return (
      {
        title: `Sports`,
        headerRight: <Button color={AppConfig.Colors.PRIMARY} title="Add my Game" onPress={function() { navigation.navigate("Add")}} />
      }
    )
  }


  componentDidMount() {
    BetterExpoNotifications.notifications().asUser(firebase.auth().currentUser.uid);
  }

  render() {
    return <View style={{flex: 1}}><SportsGridView/></View>
  }
}

const styles = StyleSheet.create({
  action: {
    fontSize: 30,
    color: AppConfig.Colors.Green
  }
})
