import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Favorites from '../screens/Favorites';
import Header from '../components/Header';

const Stack = createStackNavigator();

const FavoritesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{
          headerTitle: () => <Header />,
        }}
      />
    </Stack.Navigator>
  );
};

export default FavoritesStack;
