import { PokemonCard } from "@/components";
import { usePokemon } from "@/hooks";
import { Text, FlatList } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";


export default function HomeScreen() {
  const { isLoading, pokemons } = usePokemon();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ backgroundColor: colors.background }}>
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