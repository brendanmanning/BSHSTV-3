import React , { Component } from 'react'

import {
    Alert
} from 'react-native';

import BetterExpoNotifications from '../api/better-expo-notifications';
import BottomBar from './BottomBar';

export default Fields = {
    scoreAlerts: function(state, props) {

        var icon = 'ios-alert';
        var text = 'Get score updates';
        var color = undefined;

        // Customize if we're already subscribed
        if(state.subscribed) {
            text = "You\'ll get score updates"
            color = 'rgb(200,200,200)'
        }

        if(state.subscribing) {
            text = "Subscribing..."
            color = undefined
        }

        console.log(JSON.stringify(state));

        // If we are already subscribed
        return {
            icon: icon,
            text: text,
            color: color,
            onPress: props.onPress
        }
    }
}