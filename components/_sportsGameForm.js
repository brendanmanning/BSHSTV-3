import React , { Component } from 'react';

import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';

import Icon from 'react-native-vector-icons/Ionicons';

import { getTeamsObject, getOpponentsObject } from '../scripts/sportsMeta';

export const Fields = {
  teamSelector : (
    <PickerField ref='team'
      label='Pick your team'
      options={getTeamsObject()}
      value={"0"}
     />
  )

  ,

  opponentSelector : (
    <PickerField ref='opponent'
     label='Pick your opponent'
     options={getOpponentsObject()}
     value={"0"}
     />
  )

  ,

  dateSelector : (
    <DatePickerField ref='gamedate'
      iconRight={<Icon name={'ios-arrow-forward'} size={30} />}
      minimumDate={new Date(new Date().getTime() - (14 * 24 * 60 * 60 * 1000))}
      maximumDate={new Date(new Date().getTime() + (14 * 24 * 60 * 60 * 1000))}
      placeholder='When is/was the game?'
    />
  )

  ,

  shanahanScore : (
    <InputField
     ref='shanahanscore'
     placeholder='Your Score'
     keyboardType = 'numeric'
     validationFunction={(value)=>{
       return(Number(value) >= 0)
     }}
    />
  )

  ,

  opponentScore : (
    <InputField
     ref='opponentscore'
     placeholder="Opponent's Score"
     keyboardType = 'numeric'
     validationFunction={(value)=>{
       return(Number(value) >= 0)
     }}
    />
  )

  , stadiumSelector : (
    <SwitchField label='This game is at home'
          ref="athome"
    />
  )

}

export function formValid(formData) {

  var teamSelected = false;
  var opponentSelected = false;
  var datesValid = false;
  var scoresValid = false;

  console.log("Form data: " + JSON.stringify(formData));

  // Are any fields undefined?
  if( formData['team'] == undefined || formData['opponent'] == undefined || formData['gamedate'] == undefined) {
    return false;
  }

  if(formData['shanahanscore'] == undefined) {
    formData['shanahanscore'] = 0;
  }
  if(formData['opponentscore'] == undefined) {
    formData['opponentscore'] = 0;
  }

  if(formData['team'] == "0" || formData['opponent'] == "0") {
    return false;
  }

  console.log("Form data: " + JSON.stringify(formData));

  // Is a team selected?
  teamSelected = formData['team'].length > 0;

  // Is an opponent selected
  opponentSelected = formData['opponent'].length > 0;

  // The control validates this for us
  datesValid = formData['gamedate'] != undefined;

  // Are the scores valid
  var shanahanScoreValid = false;
  var opponentScoreValid = false;

  var shanahanScore = Number(formData['shanahanscore']);
  var opponentScore = Number(formData['opponentscore']);

  shanahanScoreValid = shanahanScore != undefined && shanahanScore >= 0 && ("" + shanahanScore).indexOf(".") < 0;
  opponentScoreValid = opponentScore != undefined && opponentScore >= 0 && ("" + opponentScore).indexOf(".") < 0;

  scoresValid = shanahanScoreValid && opponentScoreValid;

  console.log("team valid: " + teamSelected);
  console.log("opponent valid: " + opponentSelected);
  console.log("dates valid: " + datesValid);
  console.log("scores valid: " + scoresValid);

  // Is the entire form valid?
  return teamSelected && opponentSelected && datesValid && scoresValid;
}
