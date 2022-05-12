import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  dropdown: {
    backgroundColor: colors.ALICE_BLUE,
    padding: 8,
    borderRadius: 6,
    width: '80%',
    minHeight: 42,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: colors.TYRIAN_PURPLE
  },
  dropdownListContainer: {
    width: '100%',
    height: 200
  },
  dropdownContainer: {
    alignItems: 'center'
  },
  dropdownList: {
    padding: 8,
    borderRadius: 6,
    width: '100%',
    minHeight: 42
  }
});

export const styleDropdownImage = (showOption: boolean) =>
  StyleSheet.create({
    dropdownImage: {
      tintColor: colors.TYRIAN_PURPLE,
      transform: [{ rotate: showOption ? '180deg' : '0deg' }]
    }
  });

export const styleDropdownItem = (isSelected: boolean) =>
  StyleSheet.create({
    dropdownItem: {
      backgroundColor: colors.ALICE_BLUE,
      padding: 8,
      borderRadius: 6,
      width: '80%',
      minHeight: 42,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6,
      borderWidth: isSelected ? 2 : 0,
      borderColor: isSelected ? colors.TYRIAN_PURPLE : ''
    }
  });
