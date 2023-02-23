import 'react-native-gesture-handler';

import React, {ReactNode} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/navigator/Navigator';
import PermissionsProvider from './src/context/PermissionsContext';

const AppState = ({children}: {children: ReactNode}) => {
  return <PermissionsProvider>{children}</PermissionsProvider>;
};

const App = () => (
  <NavigationContainer>
    <AppState>
      <Navigator />
    </AppState>
  </NavigationContainer>
);

export default App;
