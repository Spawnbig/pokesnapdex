import { Pokemon } from "@/interfaces/pokemon";
import { PokemonRepo } from "@/repositories";
import { useEffect, useState } from "react";

export const usePokemon = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    loadPokemons();
  }, [searchQuery]);

  const loadPokemons = async () => {
    setIsLoading(true);
    try {
      const res = await PokemonRepo.searchPokemon(searchQuery);
      setPokemons(res);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    pokemons,
    isLoading,
    searchQuery,
    setSearchQuery,
    loadPokemons
  };
};
