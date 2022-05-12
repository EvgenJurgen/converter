import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Dropdown } from '../../core/components/Dropdown';
import { Loader } from '../../core/components/Loader/Loader';
import { ScrollList } from '../../core/components/ScrollList';
import { currencies } from '../../core/constants/availableCurrencies';
import { DROPDOWN_TITLE } from '../../core/constants/dropdownTitle';
import { Currency } from '../../core/interfaces/currencyInterface';
import { convertCurrency } from '../../core/reducers/currencyReducer/currencyReducer';
import { RootState } from '../../core/types/storeTypes';
import { styles } from './styles';

export const ConverterScene = () => {
  const dispatch = useDispatch();

  const [selectedValue, setSelectedValue] = useState<Currency>({
    name: '',
    amount: 0
  });
  const [stringAmount, setStringAmount] = useState('');

  const { convertedCurrencies, isLoading } = useSelector(
    (state: RootState) => state.currency
  );

  useEffect(() => {
    if (selectedValue.name) {
      dispatch(convertCurrency(selectedValue));
    }
  }, [dispatch, selectedValue]);

  const onSelect = (value: Currency) => {
    setSelectedValue((prevState) => ({ ...prevState, name: value.name }));
  };

  const handleChangeAmount = (text: string) => {
    const validText = text
      .replace(/[^.\d]+/g, '')
      .replace(/^\./, '')
      .replace(/^0{2,}/, '0')
      .replace(/^0([1-9])/g, '$1')
      .replace(/^([^\.]*\.)|\./g, '$1');

    setStringAmount(validText);
    if (validText) {
      setSelectedValue((prevState) => ({
        ...prevState,
        amount: parseFloat(validText)
      }));
    } else {
      setSelectedValue((prevState) => ({ ...prevState, amount: 0 }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Amount"
          value={stringAmount}
          onChangeText={handleChangeAmount}
        />
      </SafeAreaView>
      <Dropdown
        dropdownTitle={DROPDOWN_TITLE}
        dropdownItems={currencies}
        selectedValue={selectedValue}
        onSelect={onSelect}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollList convertedCurrencies={convertedCurrencies} />
      )}
    </SafeAreaView>
  );
};
