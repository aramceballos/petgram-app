import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import User from '../screens/User';
import Post from '../screens/Post';
import Header from '../components/Header';

const Stack = createStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="User"
        component={User}
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

export default UserStack;
