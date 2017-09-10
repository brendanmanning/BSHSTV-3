import React, { Component } from 'react';
import {
  Button,
  Text,
  StyleSheet,
  View,
} from 'react-native'

import Announcement from '../models/Announcement';

import AnnouncementTopBar from './AnnouncementTopBar';
import BottomBar from './BottomBar';

export default class AnnouncementBox extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {

    var text = this.props.announcement.getText();

    var styles = this.styleSheet();
    return (
      <View style={styles.container}>
        <AnnouncementTopBar announcement={this.props.announcement} />
        <View style={styles.maincontent}>
          <Text style={styles.maintext}>
            {text}
          </Text>
        </View>
        <BottomBar />
      </View>
    )
  }

  styleSheet() {
    return StyleSheet.create({
      container: {
        borderWidth: 1,
        borderRadius: 8,
        flex: 1,
        backgroundColor: 'white',
        borderColor: 'white',
        marginTop: 8,
        marginLeft: 4,
        marginRight: 4
      },
      topbar: {
        height: 60,
        flexDirection: 'row'
      },
      maincontent: {
        flex: 1,

        marginTop: 20,
        marginBottom: 20,
        marginLeft: 8,
        marginRight: 8,

        alignItems: 'center',
        justifyContent: 'center'
      },
      maintext: {
        textAlign: 'center',
        fontSize: 20
      }
    });
  }
}
