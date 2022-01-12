import {getDatabase, onValue, ref} from '@firebase/database';
import {getAuth} from 'firebase/auth';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {ImageBank, ImageBike, ImageGps} from '../../assets/image';
import Header from '../../component/Header';
import {apiKeyMaps} from '../../config/Maps';
import {stylesColors} from '../../utils/stylesColors';
import {stylesTexts} from '../../utils/stylesTexts';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Location = () => {
  const GOOGLE_MAPS_APIKEY = apiKeyMaps;
  const [mapView, setMapView] = useState(null);
  const [markerView, setMarkerView] = useState(null);
  const [distace, setDistace] = useState(0);
  const [duration, setDuration] = useState(0);
  const [arrowGps, setArrowGps] = useState(0);
  const [watchId, setWatchId] = useState(0);
  const [region, setRegion] = useState({
    latitude: -5.1113147,
    longitude: 119.3325865,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [coorUser, setCoorUser] = useState({
    latitude: -5.1113147,
    longitude: 119.3325865,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [coorBank, setCoorBank] = useState({
    // latitude: -5.1492722,
    // longitude: 119.4480734,
    latitude: -5.2026051,
    longitude: 119.4799551,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const markerRef = useRef();

  const [zoomCount, setZoomCount] = useState(18);
  const db = getDatabase();
  const auth = getAuth();

  useEffect(() => {
    const getLocation = ref(db, '/admin/lokasi');
    const unsubscribe = onValue(getLocation, snapshot => {
      console.log('data location', snapshot.val());
      const data = snapshot.val();

      setCoorBank({
        latitude: data.latitude,
        longitude: data.longitude,
      });
    });
    return unsubscribe;
  }, []);

  const counterZoom = type => {
    if (type == 'min') {
      setZoomCount(zoomCount <= 1 ? 1 : zoomCount - 2);
    } else {
      setZoomCount(zoomCount >= 20 ? 20 : zoomCount + 2);
    }
  };

  const onMapPress = e => {
    setCoordinates([...coordinates, e.nativeEvent.coordinate]);
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'VisitQue App',
          message: 'VisitQue App access to your location ',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('location permission denied');
        showMessage({
          duration: 2000,
          animationDuration: 2000,
          message: 'Izinkan GPS',
          description: 'location permission denied',
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
        getLocationDevice();
      }
    } catch (err) {
      console.warn(err.response);
    }
  };

  const getLocationOnce = async () => {
    await Geolocation.getCurrentPosition(info => {
      console.log('info', info?.coords);

      setArrowGps(info?.coords?.heading);
      setCoorUser({
        latitude: info?.coords?.latitude,
        longitude: info?.coords?.longitude,
        latitudeDelta: Math.abs(LATITUDE_DELTA),
        longitudeDelta: Math.abs(LONGITUDE_DELTA),
      });

      getLocationDevice();
    }),
      err => {
        alert('Fetching the Position failed, please check location is enable!');
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000};
  };

  const getLocationDevice = async () => {
    // await Geolocation.watchPosition(data => console.log('data', data));

    setWatchId(
      await Geolocation.watchPosition(
        info => {
          // console.log('info', info?.coords);
          // animate(info?.coords?.latitude, info?.coords?.longitude);
          setArrowGps(info?.coords?.heading);
          setCoorUser({
            latitude: info?.coords?.latitude,
            longitude: info?.coords?.longitude,
            latitudeDelta: Math.abs(LATITUDE_DELTA),
            longitudeDelta: Math.abs(LONGITUDE_DELTA),
          });
        },
        err => console.log('erre', err),
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
          distanceFilter: 5,
        },
      ),
    );
  };

  useEffect(() => {
    requestLocationPermission();
    getLocationOnce();
  }, []);

  // console.log('watttt', watchId);

  useEffect(() => {
    getLocationDevice();
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F2F6FB'}}>
      <View style={{flex: 1}}>
        <Header title="Lokasi Bank" />
      </View>

      <View style={styles.container}>
        <MapView
          zoomControlEnabled
          initialRegion={{
            latitude: coorUser.latitude,
            longitude: coorUser.longitude,
            latitudeDelta: Math.abs(LATITUDE_DELTA),
            longitudeDelta: Math.abs(LONGITUDE_DELTA),
          }}
          showsUserLocation={false}
          showsMyLocationButton={false}
          style={StyleSheet.absoluteFill}
          ref={c => setMapView(c)}>
          <Marker
            ref={marker => setMarkerView(marker)}
            key={1}
            coordinate={coorBank}
            title="Bank"
            description={`${coorBank.latitude},${coorBank.longitude}`}>
            <Image
              source={ImageBank}
              style={{
                height: 50,
                width: 50,
                resizeMode: 'contain',
              }}
              resizeMethod="scale"
            />
          </Marker>
          <Marker
            ref={marker => setMarkerView(marker)}
            key={2}
            coordinate={coorUser}
            title="Lokasi Sekarang"
            style={{
              position: 'absolute',
            }}
            description={`${coorUser.latitude},${coorUser.longitude}`}>
            <Image
              source={ImageBike}
              style={{
                height: 30,
                // backgroundColor: 'red',
                width: 30,
                resizeMode: 'contain',
                transform: [{rotate: arrowGps ? `${arrowGps}deg` : `0deg`}],
              }}
              resizeMethod="scale"
            />
          </Marker>

          {coorUser.latitude !== region.latitude ? (
            <MapViewDirections
              origin={coorUser}
              waypoints={[coorBank, coorUser]}
              destination={coorBank}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={7}
              strokeColor={stylesColors.default}
              optimizeWaypoints={true}
              onStart={params => {
                console.log(
                  `Started routing between "${params.origin}" and "${params.destination}"`,
                );
              }}
              onReady={result => {
                setDistace(`${Number(result.distance).toFixed(1)} KM`);
                setDuration(`${Number(result.duration).toFixed(0)} Menit`);
                console.log('distance', result.distance);
                console.log('duration', result.duration);

                mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: width / 20,
                    bottom: height / 20,
                    left: width / 20,
                    top: height / 20,
                  },
                });
              }}
              onError={errorMessage => {
                console.log('GOT AN ERROR', errorMessage);
              }}
            />
          ) : (
            <></>
          )}
        </MapView>

        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 100,
            right: 10,
          }}
          onPress={() => {
            getLocationOnce();
          }}>
          <Image
            source={ImageGps}
            style={{
              height: 40,
              width: 40,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 100,
            left: 10,
            backgroundColor: 'white',
          }}
          onPress={() => counterZoom('plus')}>
          <Image
            source={IconPlus}
            style={{
              height: 40,
              width: 40,
              borderRadius: 10,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 50,
            left: 10,
            backgroundColor: 'white',
          }}
          onPress={() => counterZoom('min')}>
          <Image
            source={IconMin}
            style={{
              height: 40,
              width: 40,
              borderRadius: 10,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity> */}
        <Text style={{...stylesTexts.defaultBold}}>
          Jarak Lokasi :{distace}
        </Text>
        <Text style={{...stylesTexts.defaultBold}}>
          Estimasi Waktu :{duration}
        </Text>
        {(console.log('coorbank', coorBank), console.log('cooruser', coorUser))}
      </View>
    </SafeAreaView>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
