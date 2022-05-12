import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import createSagaMiddleware from 'redux-saga';
import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './src/core/reducers';
import {Provider} from 'react-redux';
import {rootWatcher} from './src/core/sagas';

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: [saga],
});

saga.run(rootWatcher);

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
