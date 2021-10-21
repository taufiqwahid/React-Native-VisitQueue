import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {stylesColors} from '../utils/stylesColors';
import {stylesTexts} from '../utils/stylesTexts';

const Button = ({text, color, onPress, type}) => {
  return (
    <TouchableOpacity
      disabled={type}
      onPress={onPress}
      style={{
        backgroundColor: color,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}>
      <Text style={{...stylesTexts.largeBold, color: '#fff'}}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
