import React, { Component } from 'react';
import {
  Button,
  Text,
  StyleSheet,
  View,
} from 'react-native'

import AppConfig from '../AppConfig';

import Icon from 'react-native-vector-icons/Ionicons';

import Announcement from '../models/Announcement';

export default class BottomBar extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    var views = [];

    if(this.props.icons != undefined) {
      for(var icon of this.props.icons) {
        views.push(this.renderIcon(icon));
      }
    }

    if(views.length > 0) {
      return <View style={styles.container}>{views}</View>
    } else {
      return null;
    }
  }

  renderIcon(icon) {

    var textStyleOverrides = {};

    // Is color overridden?
    if(icon.color != undefined) {
      textStyleOverrides['color'] = icon.color;
    }

    return (
      <Icon.Button name={icon.icon} iconStyle={styles.action} backgroundColor="white" onPress={icon.onPress}>
        <Text style={[styles.actionText, textStyleOverrides]}>{icon.text}</Text>
      </Icon.Button>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderColor: 'white'
  },
  action: {
    borderColor: 'green',
    color: AppConfig.Colors.PRIMARY,
    fontSize: 16
  },
  actionText: {
    color: AppConfig.Colors.PRIMARY,
    fontSize: 16
  }
})
