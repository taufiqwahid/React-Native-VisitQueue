import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {ImageIntro1} from '../../assets/image';
import {getData} from '../../config/LocalStorage';

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
          source={ImageIntro1}
          width={100}
          height={100}
          style={{height: 100, width: 100}}
        />
        <Text
          style={{textAlign: 'center', fontFamily: 'Poppins', color: 'red'}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur,
          ipsum.
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Poppins-SemiBold',
            color: 'red',
          }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur,
          ipsum.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({});
