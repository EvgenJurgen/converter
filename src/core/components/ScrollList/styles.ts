import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  scrollListContainer: {
    position: 'absolute',
    zIndex: -1,
    height: 250,
    top: 310,
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  scrollList: {
    alignItems: 'center',
  },
  scrollListItem: {
    flexDirection: 'row',
  },
  currencyName: {
    height: 40,
    marginTop: 22,
  },
  costLine: {
    height: 40,
    minWidth: 200,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
  },
});
