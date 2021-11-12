import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ImageIntro1} from '../assets/image';
import {stylesColors} from '../utils/stylesColors';
import {stylesTexts} from '../utils/stylesTexts';
import Button from './Button';
import TextCount from './TextCount';

const Monitoring = ({
  disabled,
  sedangMenuju,
  handleSedangMenuju,
  data,
  btnDisable,
}) => {
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
        <TextCount
          count={data?.antrian?.jumlahSaatIni?.total}
          text1="Jumlah"
          text2="Antrian"
        />
      </View>
      <View
        style={{
          justifyContent: 'space-around',
          flexDirection: 'row',
        }}>
        <TextCount
          count={data?.pengunjung?.jumlahSaatIni?.total}
          text1="Jumlah"
          text2="Pengunjung"
        />
        <TextCount
          count={data?.pengunjung?.batas}
          text1="Batas"
          text2="Pengunjung"
        />
      </View>
      <View style={{height: 30}} />
      <Button
        disabled={btnDisable}
        type={disabled || sedangMenuju}
        text={sedangMenuju ? 'Ada yang menuju kesana' : 'Sedang menuju kesana?'}
        color={sedangMenuju ? stylesColors.default2 : stylesColors.green}
        onPress={() => handleSedangMenuju()}
      />
    </View>
  );
};

export default Monitoring;

const styles = StyleSheet.create({});
