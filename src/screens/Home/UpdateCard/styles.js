import {StyleSheet} from 'react-native';
import {WP, HP, colors} from '../../../utilities';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topView: {
    flex: 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyles: {
    width: WP('20%'),
    height: HP('20%'),
    borderRadius: 50,
  },
  inputsView: {
    flex: 0.5,
    justifyContent: 'center',
  },
  bottomView: {
    flex: 0.23,
    justifyContent: 'center',
  },
});

export default styles;
