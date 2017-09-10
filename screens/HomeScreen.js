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

import AnnouncementsGridView from '../components/AnnouncementsGridView';

import GridView from 'react-native-grid-view';

import AppConfig from '../AppConfig';

export default class HomeScreen extends React.Component {
  
  static navigationOptions = function({ navigation }) {
    
        console.log(JSON.stringify(navigation));
    
        return (
          {
            title: `News`,
            headerRight: <Button color={AppConfig.Colors.PRIMARY} title="About" onPress={function() { navigation.navigate("About")}} />
          }
        )
      }

  constructor(props) {
    super(props);



    this.state = {
      dataSource: []
    }
  }

  render() {

    var styles = this.styleSheet();

    return (
      <View style={styles.container}>
        <AnnouncementsGridView />
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
