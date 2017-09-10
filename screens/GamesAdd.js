import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

import SportsGameFrom from '../components/SportsGameForm';

export default class GamesAdd extends React.Component {
  static navigationOptions = {
    title: 'Add'
  };

  render() {
    return (
      <SportsGameFrom navigation={this.props.navigation} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
