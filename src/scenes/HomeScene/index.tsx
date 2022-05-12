import React, {useEffect, useState} from 'react';
import {currencies} from '../../core/constants/availableCurrencies';
import {Dropdown} from '../../core/components/Dropdown';
import {Currency} from '../../core/interfaces/currencyInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DROPDOWN_TITLE} from '../../core/constants/dropdownTitle';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import { asyncStorageItemName } from '../../core/constants/asyncStorageItemName';

export const HomeScene = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>({name: '', amount: 0});

  const onSelect = async (currency: Currency) => {
    try {
      setSelectedCurrency(prevState => ({...prevState, name: currency.name}));
      await AsyncStorage.setItem(asyncStorageItemName, currency.name);
    } catch (err) {
      console.log('[HomeScene onSelect]', err);
    }
  };

  const getSelectedCurrencyName = async () => {
    try {
      const selectedCurrencyName = await AsyncStorage.getItem(asyncStorageItemName);
      if (selectedCurrencyName) {
        setSelectedCurrency(prevState => ({...prevState, name: selectedCurrencyName}));
      }
    } catch (err) {
      console.log('[HomeScene getSelectedCurrencyName]', err);
    }
  };

  useEffect(() => {
    getSelectedCurrencyName();
  }, [selectedCurrency]);

  return (
    <SafeAreaView style={styles.container}>
      <Dropdown
        dropdownTitle={DROPDOWN_TITLE}
        dropdownItems={currencies}
        onSelect={onSelect}
        selectedValue={selectedCurrency}
      />
    </SafeAreaView>
  );
};
