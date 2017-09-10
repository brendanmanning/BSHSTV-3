import React, { Component } from 'react';
import {
  Button,
  Text,
  StyleSheet,
  View,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';

import Announcement from '../models/Announcement';

export default class SocialBottomBar extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon.Button name="ios-chatbubbles-outline" iconStyle={styles.action} backgroundColor="white" onPress={this.loginWithFacebook}>
          <Text style={styles.action}></Text>
        </Icon.Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  action: {
    color: 'green',
    fontSize: 16,
    fontSize: 36
  }
})
