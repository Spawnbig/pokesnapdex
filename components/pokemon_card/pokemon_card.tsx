import { imageMap } from "@/assets/images/sprites/image_map";
import { ImageMap } from "@/interfaces/custom";
import { Pokemon } from "@/interfaces/pokemon";
import getPokemonCardStyle from "@/styles/pokemon_card.style";
import { Image, View } from "react-native";
import { Card, Chip, Text } from 'react-native-paper'

const PokemonCard = (pokemon: Pokemon) => {
    const imageSource: ImageMap = imageMap[pokemon.pokedex_number];
    const cardStyle = getPokemonCardStyle(pokemon.isViewed, pokemon.type1);

    return (
        <Card style={cardStyle.backgroundColor}>
            <Card.Content style={{ flexDirection: 'row' }}>
                <View style={cardStyle.containerImage}>
                    <Image source={imageSource} style={cardStyle.image} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '70%', paddingLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>{pokemon.name} #{pokemon.pokedex_number}</Text>
                        <Text>{pokemon.japanese_name}</Text>
                        <Text>{pokemon.classfication}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 5, gap: 5 }}>
                            <Chip mode="outlined" style={cardStyle.chipStyle} textStyle={cardStyle.chipTextStyle}>{pokemon.type1}</Chip>
                            {pokemon.type2 && <Chip mode="outlined" style={cardStyle.chipStyle} textStyle={cardStyle.chipTextStyle}>{pokemon.type2}</Chip>}
                        </View>
                    </View>
                    <View style={{ width: '5%' }}>
                        <Image source={require('../../assets/images/pokeball.png')} style={cardStyle.pokeball} />
                    </View>
                </View>
            </Card.Content>
        </Card>
    )
}



export default PokemonCard;