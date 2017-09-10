import React,{ Component } from 'react';

import {
  Alert,
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View,ScrollView,
  Keyboard
} from 'react-native';

import AppConfig from '../AppConfig';

import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';

import { Fields , formValid } from './_sportsGameForm';

import { addSportsEvent } from '../api/sports';

import SimpleButton from './SimpleButton';

export default class SportsGameForm extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      formData:{}
    }
  }

  componentDidMount() {

  }

  handleFormChange(formData){

    // Handle form data

    this.setState({formData:formData})
    this.props.onFormChange && this.props.onFormChange(formData);
  }

  handleFormFocus(e, component){

  }

  render() {

    // Get the default components
    var teamField = Fields.teamSelector;
    var opponentField = Fields.opponentSelector;
    var dateField = Fields.dateSelector;
    var timeField = Fields.timeSelector;
    var shanahanScoreField = Fields.shanahanScore;
    var opponentScoreField = Fields.opponentScore;
    var scoreSeparator = <Separator />;
    var stadiumField = Fields.stadiumSelector;

    // Hide the time Fields
    if(!this._shouldShowTimeField()) {
      timeField = null;
    }

    // Hide the score fields
    if(this.state.formData.gamedate != undefined) {
      if(this.state.formData.gamedate.getTime() >= ((new Date()).getTime() )) {
        shanahanScoreField = null;
        opponentScoreField = null;
        scoreSeparator = null;
      }
    }

    return (<ScrollView keyboardShouldPersistTaps={"never"} style={{marginTop: 8}}>
      <Form
        ref='gameform'
        onFocus={this.handleFormFocus.bind(this)}
        onChange={this.handleFormChange.bind(this)}
        label="Add your Team's Game"
      >
        {teamField}
        {opponentField}
        {dateField}
        {timeField}

        {scoreSeparator}

        {shanahanScoreField}
        {opponentScoreField}

        <Separator />

        {stadiumField}


        <SimpleButton style={{marginTop: 32}} title={"Post Game!"} height={40} center={true} rounded={true} color={'white'} backgroundColor={AppConfig.Colors.PRIMARY} border={true} onPress={(function() {

          if(formValid(this.state.formData)) {
            console.log(JSON.stringify(this.state.formData))
            addSportsEvent(this.state.formData, function(success) {
              console.log("finished with status: success=" + success);
            });

            // Go back to the last page
            this.props.navigation.goBack();
          } else {
            Alert.alert("You forgot something", "Please go back and finish the form")
          }
        }).bind(this)} />
      </Form>
      </ScrollView>
    );
  }

  _shouldShowTimeField() {
    return ( this.state.formData.gameday == undefined ) || ( this.state.formData.gameday.getTime() > (new Date().getTime()) );
  }

  _shouldShowScoreFields() {
    if(this.state.formData.gameday != undefined) {
      console.log("Form millis: " + this.state.formData.gameday.getTime());
      console.log("Now millis: " + (new Date().getTime()));
    }
    return ( this.state.formData.gameday == undefined ) || ( this.state.formData.gameday.getTime() <= (new Date().getTime()) );
  }
}
