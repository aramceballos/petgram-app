import React from 'react';
import {StatusBar,Text} from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tabs = createBottomTabNavigator();

const Home = () => {
  return <Text>This is the Home</Text>
}

const Favorites = () => {
  return <Text>This is the Favorites</Text>
}

const User = () => {
  return <Text>This is the User</Text>
}

const App = () => {
  return (
    <>
    <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Tabs.Navigator>
          <Tabs.Screen name="Home" component={Home} />
          <Tabs.Screen name="Favorites" component={Favorites} />
          <Tabs.Screen name="User" component={User} />
        </Tabs.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
