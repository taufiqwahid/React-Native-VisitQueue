import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {ImageIntro1, ImageSplash} from '../../assets/image';
import {getData} from '../../config/LocalStorage';
import {stylesTexts} from '../../utils/stylesTexts';

const Splash = ({navigation}) => {
  useEffect(() => {
    getData('@statusIntro').then(item =>
      setTimeout(() => {
        switch (item) {
          case true:
            navigation.replace('Start');
            break;
          case false:
            navigation.replace('Intro');
            break;
          default:
            navigation.replace('Intro');
            break;
        }
      }, 2000),
    );
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 80,
        }}>
        <Image
          source={ImageSplash}
          resizeMode="contain"
          style={{height: 250, width: 250}}
        />
        <Text
          style={{
            ...stylesTexts.extraLarge,
            textAlign: 'center',
            marginTop: -50,
          }}>
          VisitQue
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({});
