import {StyleSheet} from 'react-native';
import {WP, HP, colors, size} from '../../../utilities';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingBottom: 10,
    backgroundColor: colors.white,
  },
  headerView: {
    padding: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.p1,
    justifyContent: 'space-between',
  },
  titleTxtStyle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.white,
  },
  titleTxtStyle1: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.p1,
  },
  imageStyles: {
    width: WP('20%'),
    height: HP('20%'),
    borderRadius: 50,
  },
  cardView: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  leftView: {
    flexGrow: 1,
  },
  rightView: {
    flexGrow: 0.1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  recordsTextStyle: {
    color: colors.b1,
    alignSelf: 'center',
    fontSize: size.large,
  },
});

export default styles;
