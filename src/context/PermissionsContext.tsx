import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {AppState, Platform} from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  PermissionStatus,
  openSettings,
} from 'react-native-permissions';

export interface PermissionState {
  locationStatus: PermissionStatus;
}

export const permissionInitState: PermissionState = {
  locationStatus: 'unavailable',
};

type PermissionContextProps = {
  permissions: PermissionState;
  askLocationPermission: () => void;
  checkLocationPermission: () => void;
};

export const PermissionContext = createContext({} as PermissionContextProps);

export const usePermissionsContext = () => useContext(PermissionContext);

const PermissionsProvider = ({children}: {children: ReactNode}) => {
  const [permissions, setPermissions] = useState(permissionInitState);

  useEffect(() => {
    checkLocationPermission();
    AppState.addEventListener('change', state => {
      if (state !== 'active') return;
      checkLocationPermission();
    });
  }, []);

  const askLocationPermission = async () => {
    const permissionStatus: PermissionStatus = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );

    if (['denied', 'blocked'].includes(permissionStatus)) {
      openSettings();
    }

    setPermissions({...permissions, locationStatus: permissionStatus});
  };

  const checkLocationPermission = async () => {
    const permissionStatus: PermissionStatus = await check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );

    setPermissions({...permissions, locationStatus: permissionStatus});
  };

  return (
    <PermissionContext.Provider
      value={{permissions, checkLocationPermission, askLocationPermission}}>
      {children}
    </PermissionContext.Provider>
  );
};

export default PermissionsProvider;
