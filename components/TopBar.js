import React, { Component } from 'react';
import {
  Button,
  Text,
  StyleSheet,
  View,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';

import Announcement from '../models/Announcement';

export default class TopBar extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {

    var left = this.renderLeft();
    var right = this.renderRight();

    if(left == null) {
      return null;
    }

    return (
      <View style={styles.container}>
        {left}
        {right}
      </View>
    )
  }

  renderLeft() {
    if(this.props.left.text != undefined) {
      return <Text style={styles.left}>{this.props.left.text}</Text>;
    } else {
      return null;
    }
  }

  renderRight() {
    if(this.props.right.text != undefined) {
      return <Icon.Button name={this.props.right.icon} iconStyle={styles.action} backgroundColor="white">
               <Text style={styles.rightText}>{this.props.right.text}</Text>
             </Icon.Button>;
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',

    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray'
  },
  left: {
    marginLeft: 8,
    flex: 5,
    fontSize: 18,
    fontWeight: 'bold'
  },
  rightText: {
    fontSize: 10,
    color: 'gray',
    textAlign: 'right'
  },
  action: {
    color: 'gray',
    fontSize: 16
  }
})
