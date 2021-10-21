import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {Modalize} from 'react-native-modalize';
import Button from '../../component/Button';
import Header from '../../component/Header';
import InputComp from '../../component/InputComp';
import Monitoring from '../../component/Monitoring';
import {stylesColors} from '../../utils/stylesColors';
import {stylesTexts} from '../../utils/stylesTexts';

const Home = ({navigation, route}) => {
  const modalizeRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [sedangMenuju, setSedangMenuju] = useState(false);

  const handleSedangMenuju = () => {
    setSedangMenuju(!sedangMenuju);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(false);
      if (route?.params?.ScreenLogin) {
        modalizeRef.current?.open();
      }
    });

    return unsubscribe;
  }, [route?.params?.ScreenLogin, navigation, route?.name]);

  const Login = () => {
    showMessage({
      statusBarHeight: 20,
      message: 'LOGIN BERHASIL',
      description: 'Selamat Datang Admin',
      type: 'success',
      icon: 'success',
      backgroundColor: stylesColors.default,
      color: stylesColors.white,
      style: {
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
      },
    });
    setTimeout(() => {
      navigation.replace('Dashboard');
    }, 500);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F2F6FB'}}>
      <Header title="Monitoring Pengunjung" />
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={stylesColors.default} />
        </View>
      ) : (
        <View style={{margin: 20}}>
          <Monitoring
            disabled={route?.params?.ScreenLogin}
            sedangMenuju={sedangMenuju}
            handleSedangMenuju={handleSedangMenuju}
          />
        </View>
      )}

      <Modalize
        onClosed={() => navigation.navigate('Home')}
        onClose={() => navigation.navigate('Home')}
        ref={modalizeRef}
        adjustToContentHeight={true}
        modalStyle={{padding: 20}}
        HeaderComponent={() => (
          <View style={{marginBottom: 10}}>
            <Text
              style={{
                ...stylesTexts.extraLarge,
                color: stylesColors.default2,
                textAlign: 'center',
              }}>
              LOGIN ADMIN
            </Text>
          </View>
        )}>
        <View>
          <InputComp title="Username" />
          <InputComp title="Password" password={false} />
          <View style={{marginVertical: 20}}>
            <Button color={stylesColors.default} text="Masuk" onPress={Login} />
          </View>
        </View>
      </Modalize>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
