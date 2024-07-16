import { Pokemon } from "@/interfaces/pokemon";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("pokemondb");

export const getPokemonList = async () => {
  const pokemons = await db.getAllAsync("SELECT * FROM pokemon;");
  return pokemons as Pokemon[];
};

export const setViewedPokemon = async (id: number) => {
  await db.execAsync(`UPDATE pokemon SET isViewed = 1 WHERE pokedex_number = ${id};`);
}

export const getPokemonById = async (id: string) => {
  const pokemon = await db.getAllAsync(`SELECT * FROM pokemon WHERE pokedex_number = ${id};`);
  return pokemon[0] as Pokemon;
}