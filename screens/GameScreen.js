import { StackNavigator } from 'react-navigation';

import GamesList from './GamesList';
import GamesAdd from './GamesAdd';

export const GameScreen = StackNavigator({
  Main: {
    screen: GamesList
  },
  Add: {
    screen: GamesAdd
  }
});
