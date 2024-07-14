import { Pokemon } from "@/interfaces/pokemon";
import { PokemonRepo } from "@/repositories";
import { useEffect, useState } from "react";

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
    } finally {
      setIsLoading(false);
    }
  };

  return {
    pokemons,
    isLoading,
  };
};
