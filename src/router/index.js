import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {
  AdminActive,
  AdminInactive,
  HomeActive,
  HomeInactive,
  LocationActive,
  LocationInactive,
} from '../assets/image';
import {getData} from '../config/LocalStorage';
import Dashboard from '../pages/Admin/Dashboard';
import Home from '../pages/Home';
import IntroScreen from '../pages/Intro';
import Location from '../pages/Location';
import Splash from '../pages/Splash';
import {stylesColors} from '../utils/stylesColors';

const Router = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [statusIntro, setstatusIntro] = useState(false);
  const [statusLogin, setStatusLogin] = useState(false);

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    getData('@statusLogin').then(item => setStatusLogin(item));
  }, []);

  const StackHome = () => {
    return (
      <Stack.Navigator
        initialRouteName="Monitoring"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Monitoring"
          component={Home}
          initialParams={{ScreenLogin: false}}
        />
      </Stack.Navigator>
    );
  };

  const StackLocation = () => {
    return (
      <Stack.Navigator
        initialRouteName="Location"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Monitoring"
          component={Location}
          initialParams={{ScreenLogin: false}}
        />
      </Stack.Navigator>
    );
  };

  const StackAdmin = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Login"
          component={Home}
          initialParams={{ScreenLogin: true, statusLogin: statusLogin}}
        />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    );
  };

  const TabScreen = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: stylesColors.default,
          tabBarAllowFontScaling: false,
        }}>
        <Tab.Screen
          name="Home"
          component={StackHome}
          options={{
            tabBarLabelStyle: {
              fontFamily: 'Roboto-Medium',
              fontSize: 12,
            },
            tabBarIcon: ({color, focused, size}) =>
              focused ? (
                <Image
                  resizeMode="contain"
                  source={HomeActive}
                  style={{height: 25, width: 25}}
                />
              ) : (
                <Image
                  resizeMode="contain"
                  source={HomeInactive}
                  style={{height: 25, width: 25}}
                />
              ),
          }}
        />

        <Tab.Screen
          name="Location"
          component={StackLocation}
          options={{
            tabBarLabelStyle: {
              fontFamily: 'Roboto-Medium',
              fontSize: 12,
            },
            tabBarIcon: ({color, focused, size}) =>
              focused ? (
                <Image
                  resizeMode="contain"
                  source={LocationActive}
                  style={{height: 25, width: 25}}
                />
              ) : (
                <Image
                  resizeMode="contain"
                  source={LocationInactive}
                  style={{height: 25, width: 25}}
                />
              ),
          }}
        />

        {/* <Tab.Screen
          name="Admin"
          component={StackAdmin}
          options={{
            tabBarLabelStyle: {
              fontFamily: 'Roboto-Medium',
              fontSize: 12,
            },
            tabBarIcon: ({color, focused, size}) =>
              focused ? (
                <Image
                  resizeMode="contain"
                  source={AdminActive}
                  style={{height: 25, width: 25}}
                />
              ) : (
                <Image
                  resizeMode="contain"
                  source={AdminInactive}
                  style={{height: 25, width: 25}}
                />
              ),
          }}
        /> */}
      </Tab.Navigator>
    );
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Start" component={TabScreen} />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
