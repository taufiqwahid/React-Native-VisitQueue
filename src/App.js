import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {LogBox} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import Router from './router';

const MainApp = () => {
  LogBox.ignoreAllLogs();

  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
    </>
  );
};

const App = () => {
  return <MainApp />;
};

export default App;
