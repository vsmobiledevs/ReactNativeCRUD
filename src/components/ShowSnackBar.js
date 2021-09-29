import React from 'react';
import Snackbar from 'react-native-snackbar';
import {colors} from '../utilities';

const ShowSnackBar = (
  text,
  bgColor = colors.p1,
  duration = Snackbar.LENGTH_SHORT,
) => {
  Snackbar.show({
    text: text,
    textColor: colors.white,
    backgroundColor: bgColor,
    duration: duration,
  });
};

export default ShowSnackBar;
