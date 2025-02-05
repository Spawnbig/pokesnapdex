import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function TabLayout() {
  const { colors } = useTheme();

  const PokedexIcon = () => {
    return (
      <Image source={require('../../assets/images/pokedex-icon.png')} style={{ width: 10, height: 20 }} />
    )
  }

  const CameraIcon = () => {
    return (
      <Image source={require('../../assets/images/camera-icon.png')} style={{ width: 20, height: 20 }} />
    )
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: 'black',
        tabBarInactiveBackgroundColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Pokedex',
          headerTintColor: 'white',
          headerShown: true,
          tabBarIcon: PokedexIcon,
          headerStyle: { backgroundColor: colors.primary },
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: 'Camera',
          tabBarIcon: CameraIcon,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
