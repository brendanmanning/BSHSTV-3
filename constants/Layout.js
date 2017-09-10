import { Dimensions, Platform } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 500,
  itemsPerRow: (width < 500) ? 1 : 2,
  maxWidth: (width < 500) ? 500 : (width / 2)
};
