import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Currency} from '../../core/interfaces/currencyInterface';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import {Link, useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {getExchangeRate} from '../../core/reducers/currencyReducer/currencyReducer';
import {useSelector} from 'react-redux';
import {RootState} from '../../core/types/storeTypes';
import {ScrollList} from '../../core/components/ScrollList';
import {HOME_SCENE_NAME} from '../../navigation/Tabs';
import {asyncStorageItemName} from '../../core/constants/asyncStorageItemName';
import {Loader} from '../../core/components/Loader/Loader';

const SELECT_THE_BASE_CURRENCY_MESSAGE = 'Select the base currency';

export const ExchangeRateScene = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [selectedCurrency, setSelectedCurrency] = useState<Currency>({name: '', amount: 1});

  const isLoading = useSelector((state: RootState) => state.currency.isLoading);

  const getSelectedCurrencyName = async () => {
    try {
      const selectedCurrencyName = await AsyncStorage.getItem(asyncStorageItemName);
      if (selectedCurrencyName) {
        setSelectedCurrency(prevState => ({...prevState, name: selectedCurrencyName}));
      }
    } catch (err) {
      console.log('[ExchangeRateScene getSelectedCurrencyName]', err);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getSelectedCurrencyName();
    }
  }, [isFocused]);

  useEffect(() => {
    if (selectedCurrency.name) {
      dispatch(getExchangeRate(selectedCurrency));
    }
  }, [dispatch, selectedCurrency]);

  const exchangeRate = useSelector((state: RootState) => state.currency.exchangeRate);

  return (
    <SafeAreaView style={styles.container}>
      {selectedCurrency.name ? (
        <>{isLoading ? <Loader /> : <ScrollList convertedCurrencies={exchangeRate} />}</>
      ) : (
        <Link to={{screen: HOME_SCENE_NAME}} style={styles.noBaseCurrencyMessage}>
          {SELECT_THE_BASE_CURRENCY_MESSAGE}
        </Link>
      )}
    </SafeAreaView>
  );
};
