import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Currency} from '../../interfaces/currencyInterface';
import {styles, styleDropdownImage, styleDropdownItem} from './styles';

export const Dropdown = ({
  dropdownTitle,
  dropdownItems,
  selectedValue,
  onSelect,
}: {
  dropdownTitle: string;
  dropdownItems: Currency[];
  selectedValue: Currency;
  onSelect: (currency: Currency) => any;
}) => {
  const [showOption, setShowOption] = useState(false);

  const onSelectedItem = (val: any) => {
    onSelect(val);
    setShowOption(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        activeOpacity={0.7}
        onPress={() => setShowOption(!showOption)}>
        <Text>{selectedValue.name ? selectedValue.name : dropdownTitle}</Text>
        <Image
          style={styleDropdownImage(showOption).dropdownImage}
          source={require('../../../assets/images/dropdown.png')}
        />
      </TouchableOpacity>
      {showOption && (
        <SafeAreaView style={styles.dropdownListContainer}>
          <ScrollView style={styles.dropdownList} contentContainerStyle={styles.dropdownContainer}>
            {dropdownItems.map(item => (
              <TouchableOpacity
                key={item.name}
                onPress={() => onSelectedItem(item)}
                style={styleDropdownItem(selectedValue.name === item.name).dropdownItem}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};
