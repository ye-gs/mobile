import { Image, StyleSheet } from "react-native"
import { Text, View } from "@/components/Themed"
export function HomeOption(props:{text: string, imageUrl: string}){
    return(
        <View style={styles.container}>
            <Image style={styles.optionImage} source={{uri:props.imageUrl}}/>
            <Text style={styles.title}>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionImage:{
        width: 60,
        height: 60
    },
    title:{
        fontSize: 14
    }
})