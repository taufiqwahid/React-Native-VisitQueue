import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ImageIntro1} from '../assets/image';
import {stylesColors} from '../utils/stylesColors';
import {stylesTexts} from '../utils/stylesTexts';
import Button from './Button';
import TextCount from './TextCount';

const Monitoring = () => {
  return (
    <View
      style={{
        backgroundColor: stylesColors.default,
        borderRadius: 10,
        padding: 20,
      }}>
      <Text
        style={{...stylesTexts.extraLarge, color: '#fff', textAlign: 'center'}}>
        REAL TIME MONITORING ANTRIAN SAAT INI{' '}
      </Text>
      <View
        style={{
          justifyContent: 'space-evenly',
          flexDirection: 'row',
        }}>
        <Image
          source={ImageIntro1}
          resizeMode="contain"
          style={{width: 150, height: 150}}
        />
        <TextCount count={30} text1="Antrian" text2="Tersisa" />
      </View>
      <View
        style={{
          justifyContent: 'space-around',
          flexDirection: 'row',
        }}>
        <TextCount count={40} text1="Jumlah" text2="Pengunjung" />
        <TextCount count={40} text1="Batas" text2="Pengunjung" />
      </View>
      <View style={{height: 30}} />
      <Button
        type={false}
        text="Sedang menuju kesana ?"
        color={stylesColors.green}
        onPress={() => alert('sedangmenuju')}
      />
    </View>
  );
};

export default Monitoring;

const styles = StyleSheet.create({});
