import React from 'react';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import PhotoBox from '../components/PhotoBox';

import GridView from 'react-native-grid-view';

import AppConfig from '../AppConfig';

export default class PhotosScreen extends React.Component {
  
  static navigationOptions = function({ navigation }) {
    
        console.log(JSON.stringify(navigation));
    
        return (
          {
            title: `Photos`
          }
        )
      }

  constructor(props) {
    super(props);

    this.state = {
      photos: [1]
    }
  }

  render() {

    var styles = this.styleSheet();

    return (
      <View style={styles.container}>
        <PhotoBox url={"https://instagram.fphl2-2.fna.fbcdn.net/t51.2885-15/e35/17075967_181614435666245_7973885734559940608_n.jpg"} />
      </View>
    )
  }

  styleSheet() {
    return StyleSheet.create({
      container: {
        flex: 1,
        padding: 8
      },
      gridview: {
        flex: 1
      }
    })
  }
}