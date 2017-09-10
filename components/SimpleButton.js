import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native'
import AppConfig from '../AppConfig';
import Icon from 'react-native-vector-icons/Ionicons';

export default class SimpleButton extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {

        var viewExtra = this.props.style != undefined ? this.props.style : {}
        viewExtra['backgroundColor'] = this.props.backgroundColor != undefined ? this.props.backgroundColor : viewExtra['backgroundColor'];
        viewExtra['opacity'] = this.props.disabled != undefined ? ( this.props.disabled ? 1 : 0.5 ) : 1;
        viewExtra['borderRadius'] = this.props.rounded != undefined ? 8 : 0;
        viewExtra['height'] = this.props.height == undefined ? 60 : this.props.height;
        viewExtra['borderColor'] = this.props.border == undefined ? 'transparent' : this.props.color;
        viewExtra['borderWidth'] = this.props.border == undefined ? 0 : 1

        var textExtra = {};
        textExtra['color'] = this.props.color != undefined ? this.props.color : textExtra['color'];
        textExtra['alignSelf'] = this.props.center != undefined ? 'center' : 'flex-start';

        var arrowColor = this.props.iconColor != undefined ? this.props.iconColor : AppConfig.Colors.PRIMARY;

        var arrow = <Icon style={styles.button} name="ios-arrow-forward" size={20} color={arrowColor} />;
        if(this.props.arrow == undefined) arrow = null;

        return (
            <TouchableWithoutFeedback onPress={(function() { if(this.props.disabled != undefined) { return; } this.props.onPress() }).bind(this)} >
                <View style={[styles.view, viewExtra]}>
                    
                    <Text style={[styles.text, textExtra]}>{this.props.title}</Text>
                    {arrow}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    view: {

        margin: 8,
        padding: 8,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    text: {
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontFamily: 'Helvetica Neue',
        fontSize: 18,

    },
    button: {
        position: 'absolute',
        right: 8
    },
    leftButton: {
        position: 'absolute',
        left: 8
    }
});