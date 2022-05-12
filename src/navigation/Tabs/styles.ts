import {StyleSheet} from 'react-native';
import {colors} from '../../core/styles/colors';

export const styles = StyleSheet.create({
  tapBar: {
    backgroundColor: colors.WHITE,
  },
});

export const styleImage = (focused: boolean) =>
  StyleSheet.create({
    image: {
      width: 30,
      height: 30,
      top: 10,
      tintColor: focused ? colors.TYRIAN_PURPLE : colors.MANATEE,
    },
  });
