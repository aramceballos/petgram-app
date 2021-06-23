import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import Header from '../components/Header';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => <Header />,
          headerStyle: { shadowColor: 'transparent' },
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
