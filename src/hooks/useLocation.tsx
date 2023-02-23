import {useEffect, useRef, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';

interface Location {
  latitude: number;
  longitude: number;
}

const useLocation = () => {
  const watchId = useRef<number>();
  const isMounted = useRef<boolean>(true);

  const [hasLocation, setHasLocation] = useState(false);
  const [routeLines, setRouteLines] = useState<Array<Location>>([]);
  const [initialPosition, setInitialPosition] = useState<Location>({
    longitude: 0,
    latitude: 0,
  });
  const [userLocation, setUserLocation] = useState<Location>({
    longitude: 0,
    latitude: 0,
  });

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    currentLocation().then(location => {
      if (!isMounted.current) return;

      setInitialPosition(location);
      setUserLocation(location);
      setRouteLines(routes => [...routes, location]);
      setHasLocation(true);
    });
  }, []);

  const currentLocation = (): Promise<Location> => {
    return new Promise<Location>((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        error => reject({error}),
        {enableHighAccuracy: true},
      );
    });
  };

  const followUserLocation = () => {
    watchId.current = Geolocation.watchPosition(
      ({coords}) => {
        if (!isMounted.current) return;

        const location: Location = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };

        setUserLocation(location);
        setRouteLines(routes => [...routes, location]);
      },
      error => console.log({error}),
      {enableHighAccuracy: true, distanceFilter: 10},
    );
  };

  const stopFollowUserLocation = () => {
    if (!watchId.current) return;
    Geolocation.clearWatch(watchId.current);
  };

  return {
    hasLocation,
    initialPosition,
    userLocation,
    routeLines,
    currentLocation,
    followUserLocation,
    stopFollowUserLocation,
  };
};

export default useLocation;
