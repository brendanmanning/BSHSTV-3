import React , { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react';

import GridView from 'react-native-grid-view';

import Layout from '../constants/Layout';

import SportsGame from '../models/SportsGame';

import SportsBox from './SportsBox';

import { sportsEventAdded, sportsEventChanged } from '../api/sports';

export default class SportsGridView extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      dataSource: []
    }
  }

  componentDidMount() {
    sportsEventAdded((function(game) {

      var ds = this.state.dataSource;
      ds.push(game);

      ds.sort(function(a1, a2) {
        return a1.getGameTime() - a2.getGameTime();
      })

      this.setState({
        dataSource: ds
      });

      this.forceUpdate();
    }).bind(this));

    sportsEventChanged((function(game) {

      console.log("game changed!!!");

      console.log("New game:" + JSON.stringify(game));
      
      // Get the current data source
      var ds = this.state.dataSource;

      // Find and replace the changed object by it's key
      for(var i = 0; i < ds.length; i++) {
        if(ds[i].getKey() == game.getKey()) {
          ds.splice(i, 1);
          break;
        }
      }

      ds.push(game);

      ds.sort(function(a1, a2) {
        return a1.getGameTime() - a2.getGameTime();
      })

      // Update the state
      this.setState({
        dataSource: ds
      });

      // Force an update
      this.forceUpdate();

    }).bind(this));

    this.forceUpdate();
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

  renderItem = function(game) {

    console.log("Rendering game " + JSON.stringify(game));

    return (
      
        <SportsBox game={game}/>
     
    )
  }
}
