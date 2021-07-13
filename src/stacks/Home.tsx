import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import User from '../screens/UserDetail';
import Post from '../screens/Post';
import Header from '../components/Header';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        gestureResponseDistance: { horizontal: 500 },
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => <Header />,
          headerStyle: { shadowColor: 'transparent' },
        }}
      />
      <Stack.Screen
        name="User"
        component={User}
        options={{
          headerTitle: () => <Header />,
          headerStyle: { shadowColor: 'transparent' },
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

export default HomeStack;
