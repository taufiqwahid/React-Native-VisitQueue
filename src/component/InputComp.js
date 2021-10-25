import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {stylesColors} from '../utils/stylesColors';
import {stylesTexts} from '../utils/stylesTexts';

const InputComp = ({
  title,
  password,
  onChangeText,
  onBlur,
  onfocus,
  onSubmitEditing,
  ref,
}) => {
  return (
    <View>
      <Text style={{...stylesTexts.largeNormal, color: stylesColors.black2}}>
        {title}
      </Text>
      <TextInput
        blurOnSubmit={false}
        onSubmitEditing={onSubmitEditing}
        ref={ref}
        returnKeyType="next"
        autoCapitalize="none"
        onFocus={onfocus}
        onBlur={onBlur}
        keyboardType={title == 'Email' ? 'email-address' : 'default'}
        maxLength={30}
        secureTextEntry={password}
        onChangeText={text => onChangeText(text.replace(/\s+/g, ''))}
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
