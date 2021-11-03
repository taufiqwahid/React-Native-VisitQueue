/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

import {initializeApp} from 'firebase/app';
import firebaseConfig from './src/config/Firebase';

initializeApp(firebaseConfig);

AppRegistry.registerComponent(appName, () => App);
