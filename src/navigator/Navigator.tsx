import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PermissionsScreen from '../screens/PermissionsScreen';
import MapScreen from '../screens/MapScreen';
import {usePermissionsContext} from '../context/PermissionsContext';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createStackNavigator();

const Navigator = () => {
  const {permissions} = usePermissionsContext();

  if (permissions.locationStatus === 'unavailable') {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#FFF',
        },
      }}>
      {permissions.locationStatus === 'granted' ? (
        <Stack.Screen name="Maps" component={MapScreen} />
      ) : (
        <Stack.Screen name="Permissions" component={PermissionsScreen} />
      )}
    </Stack.Navigator>
  );
};

export default Navigator;
