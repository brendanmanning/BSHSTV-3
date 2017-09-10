import React, { Component } from 'react';
import {
  Button,
  Text,
  StyleSheet,
  View,
  Image
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';

import SportsGame from '../models/SportsGame';

import SimpleButton from './SimpleButton';

import AppConfig from '../AppConfig';

import { BlurView } from 'expo';

export default class SportsHeader extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      editing: false,
      data: {
        shanahanscore: this.props.game.getShanahanScore(),
        opponentscore: this.props.game.getOpponentScore()
      }
    }

    this.originalshanahanscore = this.props.game.getShanahanScore()
    this.originalopponentscore = this.props.game.getOpponentScore()
  }

  render() {

    var game = this.props.game;
    var views = [];
    var leftSideBar = null;
    var rightSideBar = null;

    // Should we render the (shanahan) score controls?
    if(game.isOwnedByCurrentUser()) {
      if(game.hasGameStartedYet() && !game.hasGameCertainlyEnded()) {
        leftSideBar = (
          <View style={styles.scoreControlStack}>
            <Icon.Button name={"md-arrow-up"} backgroundColor={"transparent"} onPress={this.incrementLeftScore.bind(this)} size={35}/>
            <Icon.Button name={"md-arrow-down"} backgroundColor={"transparent"} onPress={this.decrementLeftScore.bind(this)} size={20}/>
          </View> 
        );
      }
    }

    // Should we render the date or the score?
    if(game.hasGameStartedYet()) {

      console.log("Shanahan score: " + this.state.data.shanahanscore);
      console.log("Opponent score: " + this.state.data.opponentscore)
    
      // Render the score
      views.push(<Text style={styles.scoreText}>{this.state.data.shanahanscore} - {this.state.data.opponentscore}</Text>)
    
     } else {

      // Format the date
      var moment = require('moment');
      
      console.log("Millis since 1970: " + this.props.game.getGameDate());

      // Create a moment instance
      var m = moment(this.props.game.getGameDate());
      //var dateString = date.get

      // Render the day the game starts
      views.push(<Text style={styles.dateText}>{m.format('MMM Do')}</Text>);
      views.push(<Text style={styles.timeText}>{m.format('h:mm A')}</Text>);
    }

    // If we had added controls for shanahan's score, add controls for the opponent's score
    if(game.isOwnedByCurrentUser()) {
      if(game.hasGameStartedYet() && !game.hasGameCertainlyEnded()) {
        rightSideBar = (
          <View style={styles.scoreControlStack}>
            <Icon.Button name={"md-arrow-up"} backgroundColor={"transparent"} size={35} onPress={this.incrementRightScore.bind(this)}/>
            <Icon.Button name={"md-arrow-down"} backgroundColor={"transparent"} size={20} onPress={this.decrementRightScore.bind(this)}/>
          </View> 
        );
      }
    }

    // If we're editing right now, add a save button
    if(this.state.editing) {
      views.push(<SimpleButton height={30} center={true} title={"Save"} rounded={true} color={AppConfig.Colors.PRIMARY} backgroundColor={"white"} onPress={(function() { this.originalshanahanscore = this.state.data.shanahanscore; this.originalopponentscore = this.state.data.opponentscore; this.state.editing = false; this.forceUpdate(); this.props.onUpdateScore(this.state.data.shanahanscore, this.state.data.opponentscore);}).bind(this)} />);
    }
    
    // Otherwise, show the [ FINAL ] / [ LIVE ] label like normal
    // But only if the game has started yet
    else {
      if(game.hasGameStartedYet()) {
        views.push(<Text style={styles.timeText}>{((game.hasGameLikelyEnded()) ? "[ FINAL ]" : "[ LIVE ]")}</Text>)
      }
    }

    // Set the default styles
    backgroundStyle = {flex: 1, height: 105, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}
    backgroundSource = require('../images/gradient.png');

    // Change the image if the game's team has one
    if(this.props.game.getTeamObject().background != undefined) {
      backgroundSource = game.getTeamObject().background;
    }

    console.log(JSON.stringify(this.props.game));

    return (
 
        <BlurView style={styles.container} intensity={60}>
          <Image source={backgroundSource} style={backgroundStyle} resizeMode={'cover'} blurRadius={3}>
          
         
            {leftSideBar}
            <View style={styles.content}>
              {views}
            </View>
            {rightSideBar}
          
          </Image>
        </BlurView>
 
    );
  }

  // Only show the save button if we have changes
  showSaveButton(shanahanscore, opponentscore) {
    return (shanahanscore != this.originalshanahanscore || opponentscore != this.originalopponentscore);
  }

  incrementLeftScore() {
    var score = this.state.data.shanahanscore + 1;
    console.log("State: " + JSON.stringify(this.state));
    this.setState({
      editing: this.showSaveButton(score, this.state.data.opponentscore),
      data: {
        shanahanscore: score,
        opponentscore: this.state.data.opponentscore
      }
    })
  }

  decrementLeftScore() {
    var score = this.state.data.shanahanscore - 1;
    if(score < 0) {
      return;
    }
    this.setState({
      editing: this.showSaveButton(score, this.state.data.opponentscore),
      data: {
        shanahanscore: score,
        opponentscore: this.state.data.opponentscore
      }
    })
  }

  incrementRightScore() {
    var score = this.state.data.opponentscore + 1;
    this.setState({
      editing: this.showSaveButton(this.state.data.shanahanscore, score),
      data: {
        shanahanscore: this.state.data.shanahanscore,
        opponentscore: score
      }
    })
  }

  decrementRightScore() {
    var score = this.state.data.opponentscore - 1;
    if(score < 0) {
      return;
    }
    this.setState({
      editing: this.showSaveButton(this.state.data.shanahanscore, score),
      data: {
        shanahanscore: this.state.data.shanahanscore,
        opponentscore: score
      }
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 105,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderColor: 'green',
    flexDirection: 'row',
    padding: 0,
    margin: 0
  },
  text: {
    fontSize: 64,
  },
  dateText: {
    fontSize: 24,
    color: 'white',
    
  },
  timeText: {
    fontSize: 16,
    color: 'rgb(200,200,200)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  scoreText: {
    fontSize: 48,
    color: 'white',
  },
  scoreControlStack: {
    flex: 1,
    alignItems: 'center'
  }
})
