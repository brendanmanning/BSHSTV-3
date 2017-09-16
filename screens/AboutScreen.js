// Import react framework
import React from 'react';

// Import the react native required components
import { StyleSheet, Text, View, Button } from 'react-native';

import AppConfig from '../AppConfig';
import SimpleButton from '../components/SimpleButton';
import { WebBrowser } from 'expo';

export default class AboutScreen extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.big}>Ch2 (Channel 2) - Version 3</Text>
                <Text style={styles.text}>Version 3.0.2</Text>
                <Button title={"View Open Source Attributions"} color={AppConfig.Colors.PRIMARY} onPress={ function() { WebBrowser.openBrowserAsync('https://goo.gl/wgmBC6') } }/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    big: {
        textAlign: 'center',

        color: 'rgb(200,200,200)',
        fontSize: 36
    },
    text: {
        textAlign: 'center',
     
        color: 'rgb(200,200,200)'
    }
})