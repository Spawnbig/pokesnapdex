export interface Pokemon {
  classfication: string;
  japanese_name: string;
  name: string;
  pokedex_number: number;
  is_legendary: boolean;
  isViewed: boolean;
  type1: PokemonType;
  type2: string | undefined;
}

type PokemonType =
  | "bug"
  | "dragon"
  | "electric"
  | "fairy"
  | "fighting"
  | "fire"
  | "ghost"
  | "grass"
  | "ground"
  | "ice"
  | "normal"
  | "poison"
  | "psychic"
  | "rock"
  | "water";
