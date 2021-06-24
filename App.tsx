import React, { useEffect, useState } from 'react';
import { StatusBar, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from './src/stacks/Home';
import FavoritesStack from './src/stacks/Favorites';
import UserStack from './src/stacks/User';
import home_icon from './src/assets/home.png';
import home_icon_filled from './src/assets/home_filled.png';
import heart from './src/assets/heart.png';
import heart_filled from './src/assets/heart_filled.png';
import profile from './src/assets/profile_placeholder.jpeg';
import Login from './src/screens/Login';

const Tabs = createBottomTabNavigator();

const App = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      setToken(value);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        {token ? (
          <Tabs.Navigator
            tabBarOptions={{
              showLabel: false,
            }}>
            <Tabs.Screen
              name="Home"
              component={HomeStack}
              options={{
                tabBarIcon: ({ size, focused }) => (
                  <Image
                    style={{ width: size, height: size }}
                    source={focused ? home_icon_filled : home_icon}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="Favorites"
              component={FavoritesStack}
              options={{
                tabBarIcon: ({ size, focused }) => (
                  <Image
                    style={{ width: size, height: size }}
                    source={focused ? heart_filled : heart}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="User"
              component={UserStack}
              options={{
                tabBarIcon: ({ size }) => (
                  <Image
                    style={{ width: size, height: size }}
                    source={profile}
                  />
                ),
              }}
            />
          </Tabs.Navigator>
        ) : (
          <Login />
        )}
      </NavigationContainer>
    </>
  );
};

export default App;
