import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {stylesColors} from '../utils/stylesColors';
import {stylesTexts} from '../utils/stylesTexts';

const InputComp = ({title, password}) => {
  return (
    <View>
      <Text style={{...stylesTexts.largeNormal, color: stylesColors.black2}}>
        {title}
      </Text>
      <TextInput
        maxLength={10}
        secureTextEntry={password}
        style={{
          ...stylesTexts.mediumBold,
          padding: 10,
          color: stylesColors.default2,
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
