export interface Pokemon {
  classfication: string;
  japanese_name: string;
  name: string;
  pokedex_number: number;
  is_legendary: boolean;
  isViewed: boolean;
  type1: PokemonType;
  type2: string | undefined;
  abilities: string;
  againts_bug: number;
  against_dark: number;
  against_dragon: number;
  against_electric: number;
  against_fairy: number;
  against_fight: number;
  against_fire: number;
  against_flying: number;
  against_ghost: number;
  against_grass: number;
  against_ground: number;
  against_ice: number;
  against_normal: number;
  against_poison: number;
  against_psychic: number;
  against_rock: number;
  against_steel: number;
  against_water: number;
  attack: number;
  base_egg_steps: number;
  base_happiness: number;
  base_total: number;
  capture_rate: string;
  defense: number;
  experience_growth: number;
  height_m: number;
  hp: number;
  percentage_male: number | null;
  sp_attack: number;
  sp_defense: number;
  speed: number;
  weight_kg: number;
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
