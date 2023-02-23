import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import BlackButton from '../components/BlackButton';
import {usePermissionsContext} from '../context/PermissionsContext';

const PermissionsScreen = () => {
  const {permissions, askLocationPermission} = usePermissionsContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Es necesario el uso del GPS para usar esta aplicación
      </Text>
      <BlackButton title="Permiso" onPress={askLocationPermission} />
      <Text style={{marginTop: 20}}>
        {JSON.stringify(permissions, null, 5)}
      </Text>
    </View>
  );
};

export default PermissionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: 250,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
});
