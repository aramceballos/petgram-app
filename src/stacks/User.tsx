import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import User from '../screens/User';
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
    </Stack.Navigator>
  );
};

export default UserStack;
