import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {
  AdminActive,
  AdminInactive,
  HomeActive,
  HomeInactive,
} from '../assets/image';
import Home from '../pages/Home';
import IntroScreen from '../pages/Intro';
import Splash from '../pages/Splash';
import {stylesColors} from '../utils/stylesColors';
import {stylesTexts} from '../utils/stylesTexts';

const Router = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [statusIntro, setstatusIntro] = useState(false);

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const StackHome = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Monitoring" component={Home} />
      </Stack.Navigator>
    );
  };

  const StackAdmin = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Profile" component={Home} />
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
              fontFamily: 'Poppins-Medium',
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
          name="Admin"
          component={StackAdmin}
          options={{
            tabBarLabelStyle: {
              fontFamily: 'Poppins-Medium',
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
        />
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
