import React from 'react';
import {Text, View} from 'react-native';
import {stylesColors} from '../utils/stylesColors';
import {stylesTexts} from '../utils/stylesTexts';

const CardQueue = ({count, text1, text2}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        backgroundColor: stylesColors.white,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}>
      <Text
        style={{
          ...stylesTexts.extraLarge,
          textAlign: 'center',
          fontSize: 40,
        }}>
        {count}
      </Text>
      <Text style={{...stylesTexts.largeBold, textAlign: 'center'}}>
        {text1}
      </Text>
      <Text style={{...stylesTexts.largeBold, textAlign: 'center'}}>
        {text2}
      </Text>
    </View>
  );
};

export default CardQueue;
