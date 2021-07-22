import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Favorites from '../screens/Favorites';
import Post from '../screens/Post';
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
      <Stack.Screen
        name="Post"
        component={Post}
        options={{
          headerTitle: () => <Header />,
          headerStyle: { shadowColor: 'transparent' },
        }}
      />
    </Stack.Navigator>
  );
};

export default FavoritesStack;
