import Geolocation from 'react-native-geolocation-service';
import React, {useEffect, useState} from 'react';
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
    latitude: -5.1492722,
    longitude: 119.4480734,
  });

  const [zoomCount, setZoomCount] = useState(5);

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
      console.log('info', info.coords);

      setArrowGps(info.coords.heading);
      setCoorUser({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      });

      setRegion({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        latitudeDelta: Math.abs(LATITUDE_DELTA),
        longitudeDelta: Math.abs(LONGITUDE_DELTA),
      });
    });
  };
  const getLocationDevice = async () => {
    // await Geolocation.watchPosition(data => console.log('data', data));

    setWatchId(
      await Geolocation.watchPosition(
        info => {
          console.log('info', info.coords);

          setArrowGps(info.coords.heading);
          setCoorUser({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
          });
        },
        err => console.log('erre', err),
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
          distanceFilter: 5,
        },
      ),
    );
  };

  useEffect(() => {
    requestLocationPermission();
    getLocationOnce();
  }, []);

  console.log('watttt', watchId);

  useEffect(() => {
    getLocationDevice();
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    // const interval = setInterval(() => {
    //   getLocationDevice();
    // }, 6000);
    // return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F2F6FB'}}>
      <View style={{flex: 1}}>
        <Header title="Lokasi Bank" />
      </View>

      <View style={styles.container}>
        <MapView
          // minZoomLevel={zoomCount}
          // onRegionChangeComplete={R =>
          //   setRegion({
          //     latitude: R.latitude,
          //     longitude: R.longitude,
          //     latitudeDelta: Math.abs(R.latitudeDelta),
          //     longitudeDelta: Math.abs(R.longitudeDelta),
          //   })
          // }
          followsUserLocation
          initialRegion={{
            latitude: coorUser.latitude,
            longitude: coorUser.longitude,
            latitudeDelta: Math.abs(LATITUDE_DELTA),
            longitudeDelta: Math.abs(LONGITUDE_DELTA),
          }}
          showsUserLocation={false}
          showsMyLocationButton={false}
          style={StyleSheet.absoluteFill}
          loadingEnabled
          loadingIndicatorColor={stylesColors.default}
          ref={c => setMapView(c)}
          // onPress={onMapPress}
        >
          <Marker coordinate={coorBank}>
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
          <Marker coordinate={coorUser}>
            <Image
              source={ImageBike}
              style={{
                height: 50,
                width: 50,
                resizeMode: 'contain',

                transform: [{rotate: `${arrowGps}deg`}],
              }}
              resizeMethod="scale"
            />
          </Marker>

          <MapViewDirections
            origin={coorBank}
            // waypoints={
            //   coordinates.length > 2 ? coordinates.slice(1, -1) : undefined
            // }
            destination={coorUser}
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
              setDistace(`${Number(result.distance).toFixed(1)} km`);
              setDuration(`${Number(result.duration).toFixed(0)} menit.`);
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
              // console.log('GOT AN ERROR');
            }}
          />
        </MapView>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 100,
            right: 10,
          }}
          onPress={() => {
            // setRegion({
            //   latitude: coorUser.latitude,
            //   longitude: coorUser.longitude,
            //   latitudeDelta: Math.abs(LATITUDE_DELTA),
            //   longitudeDelta: Math.abs(LONGITUDE_DELTA),
            // });
            setZoomCount(zoomCount + 1);
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
        <Text style={{...stylesTexts.mediumBold}}>Jarak Lokasi :{distace}</Text>
        <Text style={{...stylesTexts.mediumBold}}>
          Estimasi Waktu :{duration}
        </Text>
        {
          (console.log('coorbank', coorBank),
          console.log('cooruser', coorUser),
          console.log('object', StyleSheet.absoluteFill),
          console.log('region', region))
        }
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
