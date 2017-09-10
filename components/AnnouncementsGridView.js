import React , { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react';

import Layout from '../constants/Layout'

import GridView from 'react-native-grid-view';

import AnnouncementBox from './AnnouncementBox';

import { announcementAdded } from '../api/getAnnouncementsAsync';

export default class AnnouncementsGridView extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      dataSource: []
    }
  }

  componentDidMount() {
    announcementAdded((function(announcement) {

      var ds = this.state.dataSource;
      ds.push(announcement);

      ds.sort(function(a1, a2) {
        return a1.getPriority() - a2.getPriority();
      })

      this.setState({
        dataSource: ds
      });

      this.forceUpdate();
    }).bind(this));
  }

  render() {
    return (
      <GridView
        itemsPerRow={Layout.itemsPerRow}
        items={this.state.dataSource}
        renderItem={this.renderItem}
        style={{flex: 1}}
      />
    )
  }

  renderItem = function(announcement) {
    return (
      <AnnouncementBox announcement={announcement}/>
    )
  }
}
