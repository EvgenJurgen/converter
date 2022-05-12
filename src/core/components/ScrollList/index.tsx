import React, {useMemo} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Currency} from '../../interfaces/currencyInterface';
import {styles} from './styles';

export const ScrollList = ({convertedCurrencies}: {convertedCurrencies: Currency[]}) => {
  const convertedCurrenciesScrollItems = useMemo(() => {
    return convertedCurrencies.map(convertedCurrency => (
      <View style={styles.scrollListItem} key={convertedCurrency.name}>
        <Text style={styles.currencyName}>{convertedCurrency.name}</Text>
        <Text style={styles.costLine}>{convertedCurrency.amount}</Text>
      </View>
    ));
  }, [convertedCurrencies]);

  return (
    <SafeAreaView style={styles.scrollListContainer}>
      <ScrollView contentContainerStyle={styles.scrollList}>
        {convertedCurrenciesScrollItems}
      </ScrollView>
    </SafeAreaView>
  );
};
