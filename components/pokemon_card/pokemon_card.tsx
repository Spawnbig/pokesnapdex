import { imageMap } from "@/assets/images/sprites/image_map";
import { ImageMap } from "@/interfaces/custom";
import { Pokemon } from "@/interfaces/pokemon";
import { Image, StyleSheet, View } from "react-native";
import { Card, Text } from 'react-native-paper'

const PokemonCard = ({ name, japanese_name, classfication, pokedex_number, isViewed }: Pokemon) => {
    const imageSource: ImageMap = imageMap[pokedex_number];
    const imageStyle = isViewed ? styles.normal : styles.grayscale;

    return (
        <Card>
            <Card.Content style={{ flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', borderRadius: 500, padding: 10 }}>
                    <Image source={imageSource} style={imageStyle} />
                </View>
                <View>
                    <Text>{name} #{pokedex_number}</Text>
                    <Text>{japanese_name}</Text>
                    <Text>{classfication}</Text>
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
    }
});

export default PokemonCard;