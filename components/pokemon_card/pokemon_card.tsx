import { imageMap } from "@/assets/images/sprites/image_map";
import { ImageMap } from "@/interfaces/custom";
import { Pokemon } from "@/interfaces/pokemon";
import { Image, StyleSheet, View } from "react-native";
import { Card, Text } from 'react-native-paper'

const PokemonCard = ({ name, japanese_name, classfication, pokedex_number, isViewed }: Pokemon) => {
    const imageSource: ImageMap = imageMap[pokedex_number];
    const imageStyle = isViewed ? styles.normal : styles.grayscale;
    const pokeballStyle = isViewed ? styles.pokeball : styles.pokeballSilver;

    return (
        <Card>
            <Card.Content style={{ flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', borderRadius: 500, padding: 10 }}>
                    <Image source={imageSource} style={imageStyle} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '70%', paddingLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>{name} #{pokedex_number}</Text>
                        <Text>{japanese_name}</Text>
                        <Text>{classfication}</Text>
                    </View>
                    <View style={{ width: '5%' }}>
                        <Image source={require('../../assets/images/pokeball.png')} style={pokeballStyle} />
                    </View>
                </View>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    normal: {
        width: 100,
        height: 100,
    },
    grayscale: {
        width: 100,
        height: 100,
        tintColor: 'silver',
    },
    pokeball: {
        width: 30,
        height: 30,
    },
    pokeballSilver: {
        width: 30,
        height: 30,
        tintColor: 'silver',
    }
});

export default PokemonCard;