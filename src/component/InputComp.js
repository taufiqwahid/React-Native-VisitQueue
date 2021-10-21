import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {stylesColors} from '../utils/stylesColors';
import {stylesTexts} from '../utils/stylesTexts';

const InputComp = ({title}) => {
  return (
    <View>
      <Text style={{...stylesTexts.largeNormal, color: stylesColors.black2}}>
        {title}
      </Text>
      <TextInput
        maxLength={10}
        style={{
          borderRadius: 10,
          borderColor: stylesColors.gray2,
          borderWidth: 1,
          marginTop: 8,
        }}
      />
    </View>
  );
};

export default InputComp;

const styles = StyleSheet.create({});
