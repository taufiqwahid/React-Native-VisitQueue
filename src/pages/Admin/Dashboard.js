import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {ScrollView} from 'react-native-gesture-handler';
import Button from '../../component/Button';
import CardQueue from '../../component/CardQueue';
import Header from '../../component/Header';
import {stylesColors} from '../../utils/stylesColors';
import {stylesTexts} from '../../utils/stylesTexts';

const Dashboard = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [updateBatasan, setUpdateBatasan] = useState(40);
  useEffect(() => {
    setLoading(false);
  }, []);

  const update = () => {
    showMessage({
      statusBarHeight: 20,
      message: 'UPDATE BERHASIL',
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
    setTimeout(() => {
      navigation.goBack();
    }, 500);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F2F6FB'}}>
      <ScrollView>
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
              <CardQueue count={40} text1="Jumlah" text2="Pengunjung" />
              <CardQueue count={40} text1="Jumlah" text2="Pengunjung" />
            </View>

            <View style={{marginBottom: 20}}>
              <CardQueue count={40} text1="Jumlah" text2="Pengunjung" />
            </View>

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
                  onChangeText={text => setUpdateBatasan(text)}
                  maxLength={2}
                  keyboardType="number-pad"
                  value={updateBatasan.toString()}
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
            <View style={{marginVertical: 20}}>
              <Button
                color={stylesColors.default}
                text="Update"
                onPress={update}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
