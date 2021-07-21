import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Main from './src/Main';
import rootReducer from './src/reducers';
import LoadingIndicator from './src/components/LoadingIndicator';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, {
  token: '',
  userInfo: {
    id: '',
    name: '',
    username: '',
  },
});
const persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingIndicator />} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
};

export default App;
