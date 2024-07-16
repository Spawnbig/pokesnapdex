import ColorByType from "@/constants/color_types";
import { PokemonType } from "@/interfaces/pokemon";
import { StyleSheet } from "react-native";

const getPokemonCardStyle = (isViewed: boolean, type1: PokemonType) => {
  const color = ColorByType[type1];

  return StyleSheet.create({
    backgroundColor: {
      backgroundColor: color.bgCardColor,
    },
    containerImage: {
      backgroundColor: isViewed ? "white" : "gray",
      borderRadius: 500,
      padding: 10,
    },
    image: {
      width: 100,
      height: 100,
      ...(!isViewed && { tintColor: "silver" }),
    },
    pokeball: {
      width: 30,
      height: 30,
      ...(!isViewed && { tintColor: "silver" }),
    },
    chipStyle: {
      backgroundColor: color.chipBgColor,
    },
    chipTextStyle: {
      textTransform: "capitalize",
    },
  });
};

export default getPokemonCardStyle;
