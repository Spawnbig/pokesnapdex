import { Pokemon } from "@/interfaces/pokemon";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("pokemondb");

export const setViewedPokemon = async (id: number) => {
  await db.execAsync(
    `UPDATE pokemon SET isViewed = 1 WHERE pokedex_number = ${id};`
  );
};

export const getPokemonById = async (id: string) => {
  const pokemon = await db.getAllAsync(
    `SELECT * FROM pokemon WHERE pokedex_number = ?;`,
    [id]
  );
  return pokemon[0] as Pokemon;
};

export const searchPokemon = async (query: string) => {
  const sanitizedQuery = `%${query}%`;
  const pokemons = await db.getAllAsync(
    "SELECT * FROM pokemon WHERE name LIKE ? OR pokedex_number LIKE ?;",
    [sanitizedQuery, sanitizedQuery]
  );
  return pokemons as Pokemon[];
};
