import { View, Text } from "@/components/Themed"
import { StyleSheet, Image } from "react-native"

export function HomeCard(props: {text: string, value: string, imageUrl: string, status: string}){
    return(
        <View style={styles.card}>
            <Image style={styles.image} source={{uri:props.imageUrl}}/>
        <Text style={styles.title}>{props.text}</Text>
        <Text style={styles.value}>{props.value}</Text>
        <Text style={styles.status}>{props.status}</Text>
        </View>
    )
    }



const styles = StyleSheet.create({
    card:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        width: 100
    },
    image:{
        width:50,
        height:50,
    },
    title:{
        fontSize:10,
    },
    value:{
        fontSize:16
    },
    status:{
        fontSize:5
    }
})