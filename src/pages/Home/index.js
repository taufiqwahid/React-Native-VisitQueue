import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, onValue, ref, set} from 'firebase/database';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
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
import {storeData} from '../../config/LocalStorage';
import {notifikasi} from '../../config/Notification';
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
  const [encrypPass, setencrypPass] = useState(false);
  const db = getDatabase();
  const auth = getAuth();

  useEffect(() => {
    const getAll = ref(db, '/');
    const unsubscribe = onValue(getAll, snapshot => {
      setLoading(false);
      const data = snapshot.val();
      console.log('Data', data);
      setDataMonitoring(data);
      setSedangMenuju(data?.pengunjung?.sedangMenuju);
      let batasPengunjungMasuk = data?.pengunjung?.jumlahSaatIni.total + 1;
      setbtnDisable(
        data?.pengunjung?.sedangMenuju &&
          batasPengunjungMasuk >= data?.pengunjung?.batas,
      );
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    handleNavigationLogin();

    const unsubscribe = navigation.addListener('focus', () => {
      handleNavigationLogin();
    });

    return unsubscribe;
  }, [
    route?.params?.ScreenLogin,
    route?.params?.statusLogin,
    navigation,
    route?.name,
  ]);
  console.log(' route?.name', route?.name);
  useEffect(() => {
    if (
      dataMonitoring?.pengunjung?.jumlahSaatIni.total <
        dataMonitoring?.pengunjung?.batas &&
      route?.name == 'Monitoring'
    ) {
      return () => {
        notifikasi.configure();
        notifikasi.buatChannel('1');
        notifikasi.kirimNotifikasi(
          '1',
          'Haloo, kami dapat dikunjungi nih',
          'Silahkan cek aplikasi yah, untuk monitoring jumlah pengunjung yang sudah ada...',
        );
      };
    }
  }, [dataMonitoring?.pengunjung?.triggerNotif]);

  const handleNavigationLogin = () => {
    console.log(route?.params);
    if (route?.params?.statusLogin) {
      navigation?.replace('Dashboard');
    } else {
      if (route?.params?.ScreenLogin) {
        modalizeRef.current?.open();
      }
    }
  };

  const handleLogin = () => {
    if (email == '' || password == '') {
      showMessage({
        duration: 2000,
        animationDuration: 2000,
        message: 'Form Login',
        description: 'Pastikan Email dan Password lengkap',
        type: 'danger',
        icon: 'danger',
        backgroundColor: stylesColors.danger2,
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
          console.log('Signed in', user);
          storeData('@statusLogin', true);

          showMessage({
            duration: 2000,
            animationDuration: 2000,

            message: 'LOGIN BERHASIL',
            description: 'Selamat Datang Admin',
            type: 'success',
            icon: 'success',
            backgroundColor: stylesColors.dangert,
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
            duration: 2000,
            animationDuration: 2000,

            message: 'LOGIN TIDAK BERHASIL',
            description: 'Hanya Admin yang dapat login',
            type: 'danger',
            icon: 'danger',
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
        <ScrollView style={{flex: 1}}>
          <View>
            <InputComp
              onfocus={() => setencrypPass(true)}
              onBlur={() => setencrypPass(false)}
              title="Email"
              onChangeText={setEmail}
              onBlur={() => setencrypPass(false)}
            />
            <InputComp
              onfocus={() => setencrypPass(false)}
              onBlur={() => setencrypPass(true)}
              title="Password"
              onChangeText={setPassword}
              password={encrypPass}
              onSubmitEditing={handleLogin}
            />
            <View style={{marginVertical: 20}}>
              <Button
                color={stylesColors.default}
                text="Masuk"
                onPress={handleLogin}
                loading={loadingLogin}
              />
            </View>
          </View>
        </ScrollView>
      </Modalize>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
