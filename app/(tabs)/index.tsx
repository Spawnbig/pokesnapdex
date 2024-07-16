import { BottomSheetPokemon, PokemonCard } from "@/components";
import { usePokemon } from "@/hooks";
import { Pokemon } from "@/interfaces/pokemon";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { ActivityIndicator, TextInput, useTheme, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";


export default function HomeScreen() {
  const { isLoading, pokemons, searchQuery, setSearchQuery, loadPokemons } = usePokemon();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const { colors } = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useFocusEffect(
    useCallback(() => {
      setSearchQuery("");
      loadPokemons();
    }, [])
  );

  const renderItem: ListRenderItem<Pokemon> = useCallback(({ item }) => (
    <PokemonCard key={item.pokedex_number} bottomSheetRef={bottomSheetModalRef} pokemon={item} setSelectedPokemon={setSelectedPokemon} />
  ), []);

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <BottomSheetModalProvider>
        <TextInput
          label={'Buscar'}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{ backgroundColor: colors.background }}
          textColor="white"
        />
        {isLoading ? <ActivityIndicator animating size='large' style={{ marginVertical: 20 }} />
          :
          <FlatList
            contentContainerStyle={{ gap: 10 }}
            data={pokemons}
            style={{ padding: 10 }}
            keyExtractor={(item) => item.pokedex_number.toString()}
            renderItem={renderItem} />
        }

        {
          selectedPokemon &&
          <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={['100%']}
          >
            <BottomSheetPokemon {...selectedPokemon} />
          </BottomSheetModal>
        }

      </BottomSheetModalProvider>
    </SafeAreaView>
  );
}