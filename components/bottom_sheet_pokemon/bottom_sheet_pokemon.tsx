import { imageMap } from "@/assets/images/sprites/image_map";
import ColorByType from "@/constants/color_types";
import { Pokemon } from "@/interfaces/pokemon";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { Image, View } from "react-native";
import { Card, Chip, ProgressBar, Text, useTheme } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";
import PairText from "../pair_text/pair_text";
import { ScrollView } from "react-native-gesture-handler";

const BottomSheetPokemon = (pokemon: Pokemon) => {
    const { colors } = useTheme()
    const color = ColorByType[pokemon.type1];

    const malePercent = pokemon.percentage_male ? pokemon.percentage_male.toPrecision(3) : '0';
    const femalePercent = pokemon.percentage_male ? (100 - pokemon.percentage_male).toPrecision(3) : '0';

    const validJsonString = pokemon.abilities.replace(/'/g, '"');
    const abilities = JSON.parse(validJsonString);


    const resistances = [
        { type: 'Normal', value: pokemon.against_normal },
        { type: 'Fire', value: pokemon.against_fire },
        { type: 'Water', value: pokemon.against_water },
        { type: 'Electric', value: pokemon.against_electric },
        { type: 'Grass', value: pokemon.against_grass },
        { type: 'Ice', value: pokemon.against_ice },
        { type: 'Fighting', value: pokemon.against_fight },
        { type: 'Poison', value: pokemon.against_poison },
        { type: 'Ground', value: pokemon.against_ground },
        { type: 'Flying', value: pokemon.against_flying },
        { type: 'Psychic', value: pokemon.against_psychic },
        { type: 'Bug', value: pokemon.againts_bug },
        { type: 'Rock', value: pokemon.against_rock },
        { type: 'Ghost', value: pokemon.against_ghost },
        { type: 'Dragon', value: pokemon.against_dragon },
        { type: 'Dark', value: pokemon.against_dark },
        { type: 'Steel', value: pokemon.against_steel },
        { type: 'Fairy', value: pokemon.against_fairy },
    ]

    return (
        <TabsProvider defaultIndex={0}>
            <BottomSheetView style={{ backgroundColor: color.chipBgColor, flex: 1, paddingVertical: 10 }}>
                <Text variant="displaySmall" style={{ color: 'white', fontWeight: 'bold', marginLeft: 20 }}>{pokemon.name} #{pokemon.pokedex_number}</Text>
                <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 20 }}>{pokemon.japanese_name}</Text>
                <View style={{ width: '30%', flexDirection: 'row', marginLeft: 20, marginTop: 2, gap: 5 }}>
                    <Chip textStyle={{ textTransform: 'capitalize' }}>{pokemon.type1}</Chip>
                    {pokemon.type2 && <Chip textStyle={{ textTransform: 'capitalize' }}>{pokemon.type2}</Chip>}
                </View>
                <View style={{ height: 150, alignContent: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: color.chipBgColor }}>
                    <Image source={imageMap[pokemon.pokedex_number]} style={{ width: 200, height: 200 }} />
                </View>
                <Card style={{ flex: 1, backgroundColor: 'white' }}>
                    <Card.Content style={{ backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                        <View style={{ height: '100%' }}>
                            <Tabs>
                                <TabScreen label="About">
                                    <View style={{ minHeight: 100, gap: 2, padding: 15 }}>
                                        <PairText title="Classification" value={pokemon.classfication} />
                                        <PairText title="Height" value={`${pokemon.height_m} m`} />
                                        <PairText title="Weight" value={`${pokemon.weight_kg} kg`} />
                                        <PairText title="Types" value={`${pokemon.type1} ${pokemon.type2 ? `/ ${pokemon.type2}` : ''}`} />
                                        <PairText title="Base Happiness" value={pokemon.base_happiness} />
                                        <PairText title="Capture Rate" value={pokemon.capture_rate} />
                                        <PairText title="Base Egg Steps" value={pokemon.base_egg_steps} />
                                        <PairText title="Experience Growth" value={pokemon.experience_growth} />
                                        {pokemon.percentage_male && <PairText title="Gender" value={`Male: ${malePercent}% Female: ${femalePercent}%`} />}
                                    </View>
                                </TabScreen>
                                <TabScreen label="Base Stats">
                                    <View style={{ minHeight: 100, gap: 2, padding: 15 }}>
                                        <PairText title="HP" value={pokemon.hp} />
                                        <ProgressBar progress={pokemon.hp / pokemon.base_total} color={colors.tertiary} style={{ height: 5, borderRadius: 5 }} />
                                        <PairText title="Attack" value={pokemon.attack} />
                                        <ProgressBar progress={pokemon.attack / pokemon.base_total} color={colors.primary} style={{ height: 5, borderRadius: 5 }} />
                                        <PairText title="Defense" value={pokemon.defense} />
                                        <ProgressBar progress={pokemon.defense / pokemon.base_total} color={colors.tertiary} style={{ height: 5, borderRadius: 5 }} />
                                        <PairText title="Speed" value={pokemon.speed} />
                                        <ProgressBar progress={pokemon.speed / pokemon.base_total} color={colors.primary} style={{ height: 5, borderRadius: 5 }} />
                                        <PairText title="Special Attack" value={pokemon.sp_attack} />
                                        <ProgressBar progress={pokemon.sp_attack / pokemon.base_total} color={colors.tertiary} style={{ height: 5, borderRadius: 5 }} />
                                        <PairText title="Special Defense" value={pokemon.sp_defense} />
                                        <ProgressBar progress={pokemon.sp_defense / pokemon.base_total} color={colors.primary} style={{ height: 5, borderRadius: 5 }} />
                                        <PairText title="Base Total" value={pokemon.base_total} />
                                    </View>
                                </TabScreen>
                                <TabScreen label="Abilities">
                                    <View style={{ minHeight: 100, gap: 2, padding: 15 }}>
                                        {abilities.map((ability: string, index: number) => (
                                            <PairText key={ability} title={`Ability ${index + 1}`} value={ability} />
                                        ))}
                                    </View>
                                </TabScreen>
                                <TabScreen label="Resistances" >
                                    <ScrollView>
                                        {resistances.map(resistance => (
                                            <PairText key={resistance.type} title={resistance.type} value={resistance.value} />
                                        ))}
                                    </ScrollView>
                                </TabScreen>
                            </Tabs>
                        </View>
                    </Card.Content>
                </Card>
            </BottomSheetView>
        </TabsProvider>
    )
}

export default BottomSheetPokemon;