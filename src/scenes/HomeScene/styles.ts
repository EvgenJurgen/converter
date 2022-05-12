import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../core/styles/colors';

export const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: colors.WHITE
  }
});
