import Authentication from './../Scripts/Authentication';
// Import react framework
import React from 'react';

// Import the react native required components
import { StyleSheet, Text, View, Button } from 'react-native';

import TextField from '../Components/TextField';
import FancyButton from '../Components/FancyButton';
export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            name: '',
            email: '',
            finished: false,
            error: false,
        }
    }

    render() {

        if(this.state.finished) {
            var content = (<View style={{flex: 1, alignSelf: 'stretch',  alignItems: 'center', justifyContent: 'center'}}><Text style={{textAlign: 'center'}}>We are processing your request now</Text><Text style={{textAlign: 'center'}}>Please check your email for login details</Text></View>);

            if(this.state.error) {
                content = (<Text style={{textAlign: 'center'}}>Error making account</Text>);
            }

            return (<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>{content}</View>)
        } else {
            return (
                <View>
                    <TextField
                        style={{flex: 1, alignSelf: 'stretch'}}
                        placeholder="Your name here"
                        onTextChange = {
                            (
                                function(text) {
                                    this.setState({
                                        name: text
                                    })
                                }
                            ).bind(this)
                        }
                    />
                    <TextField
                        style={{flex: 1, alignSelf: 'stretch'}}
                        placeholder="Your email here"
                        onTextChange = {
                            (
                                function(text) {
                                    this.setState({
                                        email: text
                                    })
                                }
                            ).bind(this)
                        }
                    />
                    <View style={{height: 60}}>
                        <FancyButton
                            title="Sign up"
                            onPress={(function() {

                                if(this.state.name.length < 3 || this.state.email.length < 5) return;

                                Authentication.requestAccount(this.state.name, this.state.email, (function(success) {
                                    this.setState({
                                        finished: true,
                                        error: !success
                                    })
                                }).bind(this))
                            }).bind(this)}
                        />
                    </View>
                </View>
            );
        }
    }
}
