import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {stylesTexts} from '../utils/stylesTexts';

const TextCount = ({count, text1, text2}) => {
  return (
    <View
      style={{
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{...stylesTexts.extraLarge, fontSize: 40, color: '#fff'}}>
        {count}
      </Text>

      <Text style={{...stylesTexts.largeBold, color: '#fff', marginTop: -5}}>
        {text1}
      </Text>
      <Text style={{...stylesTexts.largeBold, color: '#fff', marginTop: -5}}>
        {text2}
      </Text>
    </View>
  );
};

export default TextCount;

const styles = StyleSheet.create({});
