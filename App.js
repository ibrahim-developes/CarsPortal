import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { store,persistor } from './src/redux/store';
import {authenticate} from './src/config/config';
import AuthNav from "./src/navigation/AuthNav";
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


export default function App() {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer>
   <AuthNav />
   </NavigationContainer>
   </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
