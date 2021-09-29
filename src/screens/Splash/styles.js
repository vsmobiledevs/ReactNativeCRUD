import {StyleSheet} from 'react-native';
import {color} from 'react-native-reanimated';
import {colors, HP, WP} from '../../utilities';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyles: {
    width: WP('50%'),
    height: HP('50%'),
    borderRadius: 50,
  },
});

export default styles;
