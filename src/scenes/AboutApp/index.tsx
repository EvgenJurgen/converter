import React, { useMemo } from 'react';
import { Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './styles';

const applicationFeatures = [
  'This application is designed to convert currencies and view current exchange rate',
  'On the home page there is a drop-down list with the choice of your preferred currency',
  'On the page showing the current exchange rate, you can see the rates of the currencies available in the application, relative to the currency you selected on the home page',
  'On the currency conversion page, you need to select the currency and the amount you are converting'
];

export const AboutAppScene = () => {
  const applicationFeaturesList = useMemo(() => {
    return applicationFeatures.map((applicationFeature) => (
      <Text style={styles.scrollListItem} key={applicationFeature}>
        {'• ' + applicationFeature}
      </Text>
    ));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollList}>
        {applicationFeaturesList}
      </ScrollView>
    </SafeAreaView>
  );
};
