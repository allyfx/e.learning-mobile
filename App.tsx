import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';

import { useFonts } from 'expo-font';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Rubik_400Regular } from '@expo-google-fonts/rubik';

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Rubik_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Routes />
      <StatusBar backgroundColor="#6548A3" />
    </>
  );
}
