import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { useCameraPermission } from 'react-native-vision-camera';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SQLiteProvider } from 'expo-sqlite';

export default function RootLayout() {
  const cameraPermissions = useCameraPermission();

  useEffect(() => {
    cameraPermissions.requestPermission();
  }, []);

  return (
    <SQLiteProvider databaseName='pokemon.db' assetSource={{ assetId: require('../assets/db/database.db') }}>
      <GestureHandlerRootView>
        <PaperProvider theme={theme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </PaperProvider>
      </GestureHandlerRootView>
    </SQLiteProvider>
  );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF022C',
    secondary: 'yellow',
    tertiary: 'green',
    background: '#2F2F2F',
  },
};
