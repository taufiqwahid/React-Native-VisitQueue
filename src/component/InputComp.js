import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {stylesColors} from '../utils/stylesColors';
import {stylesTexts} from '../utils/stylesTexts';

const InputComp = ({title, password, onChangeText}) => {
  return (
    <View>
      <Text style={{...stylesTexts.largeNormal, color: stylesColors.black2}}>
        {title}
      </Text>
      <TextInput
        keyboardType={title.toLowerCase()}
        maxLength={30}
        secureTextEntry={password}
        onChangeText={text => onChangeText(text)}
        style={{
          ...stylesTexts.defaultBold,
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
