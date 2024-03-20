import React, { useRef, useEffect } from 'react';
import { Alert, BackHandler } from 'react-native'
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';
import Header from '../components/Header';
import PostAvailableFood from '../Screens/PostAvailableFood';

const Stack = createNativeStackNavigator();
export const navigationRef = createNavigationContainerRef()

const Navigator = () => {
  const routeNameRef = useRef();

  useEffect(() => {
    const backAction = () => {
      if (routeNameRef.current == 'Home') {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        routeNameRef.current = currentRouteName;
      }}>
      <Header navigation={navigationRef}/>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, animation: 'default' }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="PostAvailableFood" component={PostAvailableFood} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;