import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../core/styles/colors';

export const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: colors.WHITE
  },
  inputContainer: {
    alignItems: 'center'
  },
  input: {
    height: 40,
    minWidth: 200,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10
  }
});
