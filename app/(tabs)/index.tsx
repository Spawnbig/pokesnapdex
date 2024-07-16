import { PokemonCard } from "@/components";
import { usePokemon } from "@/hooks";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { Text, FlatList } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";


export default function HomeScreen() {
  const { isLoading, pokemons, loadPokemons } = usePokemon();
  const { colors } = useTheme();

  useFocusEffect(
    useCallback(() => {
      loadPokemons();
    }, [])
  );

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      {isLoading ? <Text>Loading...</Text>
        :
        <FlatList
          contentContainerStyle={{ gap: 10 }}
          data={pokemons}
          style={{ padding: 10 }}
          renderItem={({ item }) => <PokemonCard key={item.pokedex_number} {...item} />} />
      }
    </SafeAreaView>
  );
}