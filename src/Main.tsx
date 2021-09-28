/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { StatusBar, Image, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';

import HomeStack from './stacks/Home';
import FavoritesStack from './stacks/Favorites';
import UserStack from './stacks/User';
import home_icon from './assets/home.png';
import home_icon_filled from './assets/home_filled.png';
import heart from './assets/heart.png';
import heart_filled from './assets/heart_filled.png';
import profile from './assets/profile_placeholder.jpeg';
import Login from './screens/Login';

const Tabs = createBottomTabNavigator();

const App = ({ token }) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

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
                tabBarIcon: ({ size, focused }) => (
                  <View
                    style={
                      focused
                        ? {
                            borderWidth: 2,
                            borderRadius: 50,
                          }
                        : {}
                    }>
                    <Image
                      style={{
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                      }}
                      source={profile}
                    />
                  </View>
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

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps)(App);
