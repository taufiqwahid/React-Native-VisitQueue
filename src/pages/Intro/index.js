import React from 'react';
import {Image, SafeAreaView, StatusBar, Text, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {ImageIntro1, ImageIntro2, ImageIntro3} from '../../assets/image';
import {storeData} from '../../config/LocalStorage';
import {stylesColors} from '../../utils/stylesColors';
import {stylesTexts} from '../../utils/stylesTexts';

const slides = [
  {
    key: 'one',
    title: 'Real TIme ',
    text: 'Real Time Monitoring Antrian yang sedang berlangsung dan perkiraan jumlah pengunjung',
    image: ImageIntro1,
  },
  {
    key: 'two',
    title: 'Biaya',
    text: 'Menghemat Biaya tanpa harus mendatangi terlebih dahulu',
    image: ImageIntro2,
  },
  {
    key: 'three',
    title: 'Waktu',
    text: 'Mengurangi waktu tunggu di lokasi pelayanan sehingga meningkatkan efektifitas waktu',
    image: ImageIntro3,
  },
];

const IntroScreen = ({navigation}) => {
  const _renderItem = ({item}) => {
    return (
      <View
        style={{
          marginHorizontal: 70,
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: '30%',
        }}>
        <Image
          source={item.image}
          style={{width: 300, height: 300}}
          resizeMode="contain"
        />
        <Text style={{...stylesTexts.largeBold, color: stylesColors.black}}>
          {item.title}
        </Text>
        <Text
          style={{
            ...stylesTexts.defaultNormal,
            color: stylesColors.black2,
            textAlign: 'center',
            marginTop: 20,
          }}>
          {item.text}
        </Text>
      </View>
    );
  };
  const _onDone = () => {
    storeData('@statusIntro', true);
    navigation.replace('Start');
  };

  const nextText = () => {
    return (
      <View style={{marginTop: 12}}>
        <Text
          style={{
            ...stylesTexts.defaultBold,
            color: stylesColors.default,
            fontSize: 16,
          }}>
          Selanjutnya
        </Text>
      </View>
    );
  };
  const doneText = () => {
    return (
      <View style={{marginTop: 12}}>
        <Text
          style={{
            ...stylesTexts.defaultBold,
            color: stylesColors.default,
            fontSize: 16,
          }}>
          Selesai
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        animated={true}
        backgroundColor="#fff"
        barStyle="dark-content"
      />
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <AppIntroSlider
          renderNextButton={nextText}
          renderDoneButton={doneText}
          renderItem={_renderItem}
          data={slides}
          onDone={_onDone}
          activeDotStyle={{backgroundColor: stylesColors.default}}
        />
      </View>
    </SafeAreaView>
  );
};

export default IntroScreen;
