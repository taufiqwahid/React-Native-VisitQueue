import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, onValue, ref, set} from 'firebase/database';
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
import Firebase from '../../config/Firebase';
import {stylesColors} from '../../utils/stylesColors';
import {stylesTexts} from '../../utils/stylesTexts';

const Home = ({navigation, route}) => {
  const modalizeRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [sedangMenuju, setSedangMenuju] = useState(false);
  const [dataMonitoring, setDataMonitoring] = useState([]);
  const [btnDisable, setbtnDisable] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const db = getDatabase();
  const auth = getAuth();

  useEffect(() => {
    console.log(getDatabase(Firebase));
    const getAll = ref(db, '/');
    onValue(getAll, snapshot => {
      setLoading(false);
      const data = snapshot.val();
      console.log('Data', data);
      setDataMonitoring(data);
      setSedangMenuju(data?.pengunjung?.sedangMenuju);
      let batasPengunjungMasuk = data?.pengunjung?.pengunjungMasuk?.total + 1;
      setbtnDisable(
        data?.pengunjung?.sedangMenuju &&
          batasPengunjungMasuk < data?.pengunjung?.batas,
      );
    });
  }, []);

  const handleLogin = () => {
    if (email == '' || password == '') {
      showMessage({
        duration: 100,
        statusBarHeight: 20,
        message: 'Form Login',
        description: 'Lengkapi Form Login terlebih dahulu',
        type: 'error',
        icon: 'error',
        backgroundColor: stylesColors.default2,
        color: stylesColors.white,
        style: {
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
        },
      });
    } else {
      setLoadingLogin(true);
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          setLoadingLogin(false);
          // Signed in
          const user = userCredential.user;
          console.log('user', user);

          showMessage({
            duration: 100,
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

          navigation.replace('Dashboard');
        })
        .catch(error => {
          setLoadingLogin(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('ERRR', errorCode, errorMessage);
          showMessage({
            duration: 100,
            statusBarHeight: 20,
            message: 'LOGIN TIDAK BERHASIL',
            description: 'Hanya Admin yang dapat login',
            type: 'error',
            icon: 'error',
            backgroundColor: stylesColors.default2,
            color: stylesColors.white,
            style: {
              borderBottomEndRadius: 20,
              borderBottomStartRadius: 20,
            },
          });
        });
    }
  };

  const handleSedangMenuju = () => {
    set(ref(db, 'pengunjung/sedangMenuju'), !sedangMenuju)
      .then(() => {
        // Data saved successfully!
        console.log('suksess');
        setSedangMenuju(!sedangMenuju);
      })
      .catch(error => {
        // The write failed...
        console.log('gagal', error);
        setSedangMenuju(sedangMenuju);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route?.params?.ScreenLogin) {
        modalizeRef.current?.open();
      }
    });

    return unsubscribe;
  }, [route?.params?.ScreenLogin, navigation, route?.name]);

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
            btnDisable={btnDisable}
            data={dataMonitoring}
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
          <InputComp title="Email" onChangeText={setEmail} />
          <InputComp
            title="Password"
            onChangeText={setPassword}
            password={false}
          />
          <View style={{marginVertical: 20}}>
            <Button
              color={stylesColors.default}
              text="Masuk"
              onPress={handleLogin}
              loadingLogin={loadingLogin}
            />
          </View>
        </View>
      </Modalize>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
