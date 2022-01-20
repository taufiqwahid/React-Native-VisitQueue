import React from 'react';
import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import {stylesTexts} from '../utils/stylesTexts';

const Header = ({title}) => {
  return (
    <View>
      <StatusBar
        animated={true}
        backgroundColor="#fff"
        barStyle="dark-content"
      />
      <View
        style={{
          ...Platform.select({
            ios: {
              paddingTop: 40,
            },
          }),
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 22,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}>
        <Text style={{...stylesTexts.extraLarge}}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
