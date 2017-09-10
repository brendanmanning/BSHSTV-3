import React, { Component } from 'react';
import {
  Button,
  Text,
  StyleSheet,
  View,
} from 'react-native'

import Announcement from '../models/Announcement';

import TopBar from './TopBar';

export default class AnnouncementTopBar extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <TopBar
        left={
          {
            text: this.props.announcement.getMentionedClub()
          }
        }
        right={
          {
            text: this.props.announcement.getMentionedDate(),
            icon: 'ios-calendar-outline'
          }
        }
      />
    )
  }
}
