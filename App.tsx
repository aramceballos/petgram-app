import React from 'react';
import { StatusBar, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from './src/stacks/Home';
import FavoritesStack from './src/stacks/Favorites';
import UserStack from './src/stacks/User';
import home_icon from './src/assets/home.png';
import heart from './src/assets/heart.png';
import profile from './src/assets/profile_placeholder.jpeg';

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Tabs.Navigator
          tabBarOptions={{
            showLabel: false,
          }}>
          <Tabs.Screen
            name="Home"
            component={HomeStack}
            options={{
              tabBarIcon: ({ size }) => (
                <Image
                  style={{ width: size, height: size }}
                  source={home_icon}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="Favorites"
            component={FavoritesStack}
            options={{
              tabBarIcon: ({ size }) => (
                <Image style={{ width: size, height: size }} source={heart} />
              ),
            }}
          />
          <Tabs.Screen
            name="User"
            component={UserStack}
            options={{
              tabBarIcon: ({ size }) => (
                <Image style={{ width: size, height: size }} source={profile} />
              ),
            }}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
