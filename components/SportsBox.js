import React, { Component } from 'react';
import {
  AsyncStorage,
  Alert,
  Button,
  Text,
  StyleSheet,
  View,
} from 'react-native'

import SportsGame from '../models/SportsGame';

import { updateSportsEventScore } from '../api/sports';

import SportsHeader from './SportsHeader';
import BottomBar from './BottomBar';

import Fields from './_sportsBox';

import Layout from '../constants/Layout';

import BetterExpoNotifications from '../api/better-expo-notifications';

export default class SportsBox extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;


    console.log("Creating SportsBox with game: " + JSON.stringify(this.props.game.getTeam()));

    this.state = {
      subscribed: false,
      subscribing: false,
      renders: 0
    }

  }

  componentDidMount() {

    BetterExpoNotifications.notifications().isUserRegisteredForTopic(
      BetterExpoNotifications.notifications().userid,
      "game_" + this.props.game.getKey() + "_score",
      (function (registered) {
        console.log("Registered: "+ registered);
        this.setState({
          subscribed: registered
        });
      }).bind(this)
    );

    // Calculate how many seconds until this game will go live
    var gameStartTime = this.props.game.getGameDate();

    // Has the game already started?
    if(this.props.game.hasGameStartedYet()) {
      return;
    }

    // How many milliseconds until it does?
    var timeout = gameStartTime - ( (new Date()).getTime() );
    timeout /= 1000;
    console.log("Timeout = " + timeout);

    // Add a little bit for padding
    timeout + 5;

    setTimeout(
      (function() {
        console.log("REFRESHING STARTONG GAME...");
        this.state.renders++;
        this.setState({
          renders: this.state.renders
        })
        this.forceUpdate();
      }).bind(this),
      timeout
    )

  }

  render() {

    this.state.renders++;

    var game = this.props.game;
    console.log("rendering internally...");

    var shanahan = this.props.game.getShanahanScore();
    var opponent = this.props.game.getOpponentScore();

    // Only enable subscribing BEFORE the game starts
    var bottombar = this._bottomBar();
    if(game.hasGameLikelyEnded()) {
      bottombar = null;
    }

    return (
      <View style={styles.container}>
        <SportsHeader key={this.state.renders} game={this.props.game} onUpdateScore={ (function(leftScore, rightScore) {
          updateSportsEventScore(this.props.game, leftScore, rightScore, function() {});
        }).bind(this)}/>
        <View style={styles.content}>
          <Text><Text style={{fontWeight: 'bold'}}>{this.props.game.getTeam()}</Text> vs {this.props.game.getOpponent()}</Text>
          <Text />
          <Text>Game is {this.props.game.getLocation()}</Text>
        </View>
        {bottombar}
      </View>
    );
  }

  _bottomBar() {
   return (
      <BottomBar
      style={{
        flex: 1
      }}
        icons ={[
          Fields.scoreAlerts(this.state, {
            onPress: (function() {
              this.setState({
                subscribing: true
              })
              BetterExpoNotifications.notifications().subscribe("game_" + this.props.game.getKey() + "_score", (function(success) {
                  if(success) {
                    this.setState({
                      subscribed: true,
                      subscribing: false
                    })
                   }
              }).bind(this));
            }).bind(this)
          })
        ]}
      />
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 8,

    padding: 0,

    borderWidth: 1,
    borderColor: 'rgb(200,200,200)',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    height: 60,
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white'
  }
})
