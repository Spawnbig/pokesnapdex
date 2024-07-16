import { Pokemon } from "@/interfaces/pokemon";
import { PokemonRepo } from "@/repositories";
import { useCallback, useEffect, useState } from "react";

export const usePokemon = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async () => {
    try {
      const res = await PokemonRepo.getPokemonList();
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
    loadPokemons,
  };
};
