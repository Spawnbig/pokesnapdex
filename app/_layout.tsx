import { Stack } from 'expo-router';
import React from 'react';
import 'react-native-reanimated';
import { DefaultTheme, PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false  }} />
      </Stack>
    </PaperProvider>
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
