import React, { Component } from 'react';
import {
  AsyncStorage,
  Alert,
  Button,
  Image,
  Text,
  StyleSheet,
  View,
} from 'react-native'

import Icon from '@expo/vector-icons/Ionicons';

import Photo from '../models/Photo';
import Layout from '../constants/Layout';

export default class PhotoBox extends React.Component {

  /**
   * Constructor for components of the PhotoBox type
   * @param props Parameters specified in JSX. For this component, the props should be like this: <PhotoBox url="photourl" likes={12} canlike={false}/>
   */
  constructor(props) {
    super(props);

    this.props = props;

    this.state = {
      url: undefined,
      likes: 0,
      canlike: false
    }

  }

  componentDidMount() {
  }

  render() {

    return (
      <View style={styles.container}>
        <Image source={{uri: this.props.url}} style={styles.image}>
          <Icon name={"ios-heart-outline"} style={styles.likebuttoninactive}></Icon>
          <Text style={styles.likestext}>17 likes</Text>
        </Image>
      </View>
    );
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
  image: {
    flex: 1,
    alignSelf: 'stretch',
    resizeMode: 'cover'
  },
  likestext: {

    position: 'absolute',
    bottom: 18,
    right: 48,

    backgroundColor: 'transparent',
    fontSize: 18,
    color: 'white'
  },
  likebuttoninactive: {

    position: 'absolute',
    bottom: 8,
    right: 18,
    
    backgroundColor: 'transparent',
    color: 'pink',
    
    fontSize: 32
  }
})
