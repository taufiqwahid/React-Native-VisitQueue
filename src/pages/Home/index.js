import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import Header from '../../component/Header';
import Monitoring from '../../component/Monitoring';
import {stylesColors} from '../../utils/stylesColors';

const Home = () => {
  const modalizeRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  useEffect(() => {
    setLoading(false);
  }, []);
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
      <TouchableOpacity onPress={onOpen}>
        <Text>Open the modal</Text>
      </TouchableOpacity>

      <Modalize ref={modalizeRef}>
        <View>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
            dolorum eveniet eaque amet libero fugit alias cum perspiciatis
            quisquam temporibus ut ex, doloremque rerum impedit quis soluta
            incidunt eius, quaerat nostrum voluptatum illo fuga aliquam!
            Cupiditate officiis voluptas beatae illum distinctio alias earum
            voluptate sit blanditiis, nisi iste culpa, pariatur iusto assumenda
            consequatur sunt eos labore esse animi similique ipsa fugiat
            recusandae adipisci! Aliquid nihil iste minus laboriosam accusamus
            ipsam nisi, suscipit provident amet vero exercitationem nulla
            voluptatibus. Numquam consequatur, veniam culpa repellat dolor
            incidunt fugit perferendis. Distinctio tempore molestias, dolore
            enim ducimus culpa quae mollitia aut alias, fugiat odio?
          </Text>
        </View>
      </Modalize>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
