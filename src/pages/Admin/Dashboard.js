import {getDatabase, onValue, ref, set} from '@firebase/database';
import {getAuth, signOut} from 'firebase/auth';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {ScrollView} from 'react-native-gesture-handler';
import Button from '../../component/Button';
import CardQueue from '../../component/CardQueue';
import Header from '../../component/Header';
import {storeData} from '../../config/LocalStorage';
import {stylesColors} from '../../utils/stylesColors';
import {stylesTexts} from '../../utils/stylesTexts';

const Dashboard = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [updateBatasan, setUpdateBatasan] = useState(3);
  const [updateBatasanBaru, setUpdateBatasanBaru] = useState(5);
  const [jmlPengunjung, setJmlPengunjung] = useState(0);
  const [jmlAntrian, setJmlAntrian] = useState(0);
  const [jmlBatasPengunjung, setJmlBatasPengunjung] = useState(0);
  const [jmlTotalPengunjung, setJmlTotalPengunjung] = useState(0);
  const db = getDatabase();
  const auth = getAuth();

  useEffect(() => {
    const getAll = ref(db, '/');

    const unsubscribe = onValue(getAll, snapshot => {
      setLoading(false);
      const data = snapshot.val();
      setJmlAntrian(data?.antrian?.jumlahSaatIni?.total);
      setJmlPengunjung(data?.pengunjung?.jumlahSaatIni?.total);
      setJmlBatasPengunjung(data?.pengunjung?.batas);
      setUpdateBatasan(data?.pengunjung?.batas);
      setJmlTotalPengunjung(data?.pengunjung?.jumlahPengunjung?.total);
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        showMessage({
          duration: 2000,
          animationDuration: 2000,
          message: 'Logout Berhasil',
          description: 'Jumlah batas pengunjung diubah',
          type: 'success',
          icon: 'success',
          backgroundColor: stylesColors.default,
          color: stylesColors.white,
          style: {
            borderBottomEndRadius: 20,
            borderBottomStartRadius: 20,
          },
        });
        storeData('@statusLogin', false);
        navigation?.replace('Start');
      })
      .catch(error => {
        console.log('errlogout', error);
        showMessage({
          duration: 2000,
          animationDuration: 2000,
          message: 'Logout Gagal',
          description: 'Anda tidak dapat Logout ',
          type: 'info',
          icon: 'info',
          backgroundColor: stylesColors.default2,
          color: stylesColors.white,
          style: {
            borderBottomEndRadius: 20,
            borderBottomStartRadius: 20,
          },
        });
      });
  };

  const handleUpdate = () => {
    console.log(updateBatasanBaru < jmlBatasPengunjung);
    if (updateBatasanBaru < jmlPengunjung) {
      showMessage({
        duration: 2000,
        animationDuration: 2000,
        message: 'Update Gagal',
        description:
          'Jumlah batas terbaru tidak dapat lebih kecil dari jumlah pengunjung yang ada',
        type: 'info',
        icon: 'info',
        backgroundColor: stylesColors.default2,
        color: stylesColors.white,
        style: {
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
        },
      });
    } else {
      setLoadingUpdate(true);
      set(ref(db, 'pengunjung/batas'), parseInt(updateBatasanBaru))
        .then(() => {
          setLoadingUpdate(false);
          showMessage({
            duration: 2000,
            animationDuration: 2000,
            message: 'Update Berhasil',
            description: 'Jumlah batas pengunjung diubah',
            type: 'success',
            icon: 'success',
            backgroundColor: stylesColors.default,
            color: stylesColors.white,
            style: {
              borderBottomEndRadius: 20,
              borderBottomStartRadius: 20,
            },
          });
          // navigation?.goBack();
        })
        .catch(error => {
          // The write failed...
          console.log('error', error);
          setLoadingUpdate(false);
          showMessage({
            duration: 2000,
            animationDuration: 2000,
            message: 'Update Gagal',
            description: 'Tidak dapat melakukan perubahan',
            type: 'info',
            icon: 'info',
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F2F6FB'}}>
      <ScrollView showsHorizontalScrollIndicator={false} style={{flex: 1}}>
        <Header title="Kontrol Jumlah Pengunjung" />
        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={stylesColors.default} />
          </View>
        ) : (
          <View style={{margin: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <CardQueue
                count={jmlPengunjung}
                text1="Jumlah"
                text2="Pengunjung"
              />
              <View style={{width: 20}} />
              <CardQueue count={jmlAntrian} text1="Antrian" text2="Sekarang" />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <CardQueue
                count={jmlBatasPengunjung}
                text1="Batas"
                text2="Pengunjung"
              />
              <View style={{width: 20}} />
              <CardQueue
                count={jmlTotalPengunjung}
                text1="Jumlah Total"
                text2="Pengunjung"
              />
            </View>

            {/* <View style={{marginBottom: 20}}>
              <CardQueue
                count={jmlBatasPengunjung}
                text1="Jumlah Batas"
                text2="Antrian"
              />
            </View> */}

            <View style={{marginVertical: 20}}>
              <Text
                style={{
                  ...stylesTexts.largeBold,
                  color: stylesColors.default2,
                  textAlign: 'center',
                }}>
                Ubah Batasan Pengunjung
              </Text>
              <KeyboardAvoidingView style={{flex: 1}}>
                <TextInput
                  onChangeText={text =>
                    text == ''
                      ? setUpdateBatasanBaru(0)
                      : setUpdateBatasanBaru(text.replace(/[^A-Z0-9]/gi, ''))
                  }
                  maxLength={2}
                  keyboardType="number-pad"
                  defaultValue={updateBatasan.toString()}
                  style={{
                    ...stylesTexts.largeBold,
                    borderBottomColor: stylesColors.default2,
                    borderBottomWidth: 3,
                    color: stylesColors.default,
                    width: 150,
                    textAlign: 'center',
                    padding: 0,
                    alignSelf: 'center',
                  }}
                />
              </KeyboardAvoidingView>
            </View>
            <View style={{marginVertical: 0}}>
              <Button
                loading={loadingUpdate}
                color={stylesColors.default}
                text="Update"
                onPress={handleUpdate}
              />
            </View>

            <TouchableOpacity
              onPress={handleLogout}
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <Text
                style={{
                  ...stylesTexts.mediumBold,
                  color: stylesColors.default2,
                  textAlign: 'center',
                }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
