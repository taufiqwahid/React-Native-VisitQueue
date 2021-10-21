import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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

  console.log('alsdasdasdas', route);
  useEffect(() => {
    console.log('asdasd');

    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(false);
      if (route.name === 'Profile') {
        modalizeRef.current?.open();
      }
    });

    return unsubscribe;
  }, [route, navigation]);

  const Login = () => {
    alert('LOGINNN');
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
          <Monitoring />
        </View>
      )}

      <Modalize
        onClosed={() => navigation.navigate('Home')}
        onClose={() => navigation.navigate('Home')}
        ref={modalizeRef}
        adjustToContentHeight={true}
        modalStyle={{padding: 20}}
        avoidKeyboardLikeIOS={true}
        HeaderComponent={() => (
          <View>
            <Text style={{...stylesTexts.extraLarge, textAlign: 'center'}}>
              LOGIN ADMIN
            </Text>
          </View>
        )}>
        <View>
          <InputComp title="Username" />
          <InputComp title="Password" />
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
