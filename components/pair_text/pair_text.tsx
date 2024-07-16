import { View } from "react-native";
import { Text } from 'react-native-paper'

interface Props {
    title: string;
    value: string | number;
}

const PairText = ({ title, value }: Props) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
            <Text style={{ color: 'gray', fontWeight: 'bold', textTransform: 'capitalize' }}>{title}</Text>
            <Text style={{ textTransform: 'capitalize' }}>{value}</Text>
        </View>
    )
}
export default PairText;