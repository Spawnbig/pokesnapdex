import { Pokemon } from "@/interfaces/pokemon";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("pokemon_data.db");

export const getPokemonList = async () => {
  const pokemons = await db.getAllAsync("SELECT * FROM pokemon;");
  return pokemons as Pokemon[];
};

export const setViewedPokemon = async (id: number) => {
  await db.execAsync(`UPDATE pokemon SET viewed = 1 WHERE id = ${id};`);
}