import React, {useEffect, useRef, useState} from 'react';
import MapView, {Polyline} from 'react-native-maps';
import {StyleSheet} from 'react-native';
import useLocation from '../hooks/useLocation';
import LoadingScreen from '../screens/LoadingScreen';
import Fab from './Fab';

const Map = () => {
  const {
    hasLocation,
    initialPosition,
    currentLocation,
    followUserLocation,
    userLocation,
    stopFollowUserLocation,
    routeLines,
  } = useLocation();

  const [showPolyline, setShowPolyline] = useState(true);
  const mapViewRef = useRef<MapView | null>();
  const following = useRef<boolean>(true);

  const centerPosition = async () => {
    following.current = true;
    const {latitude, longitude} = await currentLocation();
    mapViewRef.current?.animateCamera({
      center: {latitude, longitude},
      zoom: 15,
    });
  };

  useEffect(() => {
    followUserLocation();
    return () => {
      stopFollowUserLocation();
    };
  }, []);

  useEffect(() => {
    if (!following.current) return;
    centerPosition();
  }, [userLocation]);

  if (!hasLocation) return <LoadingScreen />;

  return (
    <>
      <MapView
        ref={element => (mapViewRef.current = element)}
        showsUserLocation
        style={styles.map}
        region={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.latitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onTouchStart={() => {
          following.current = false;
        }}>
        {showPolyline ? (
          <Polyline
            coordinates={routeLines}
            strokeColor="#000"
            strokeWidth={5}
          />
        ) : null}
        {/* <Marker
          image={require('../assets/custom-marker.png')}
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title="here que fue mano"
          description="Que fueeeee manooooooooooooooooo"
        /> */}
      </MapView>

      <Fab
        label="PL"
        onPress={() => setShowPolyline(!showPolyline)}
        position={{bottom: 25, left: 25}}
      />
      <Fab label="ST" onPress={centerPosition} />
    </>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
