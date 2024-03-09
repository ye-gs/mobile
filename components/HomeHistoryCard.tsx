import { View, Text } from "@/components/Themed"
import { StyleSheet, Image } from "react-native"


export function HomeHistoryCard(props:{text: string, date: string, imageUrl: string}){
    return(
        <View style={styles.container}>
            <Image style={styles.image} source={{uri:props.imageUrl}}/>
            <View style={styles.cardText}>
                <Text style={styles.text}>{props.text}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        borderWidth:1,
        borderColor: '#ccc',
        borderRadius: 10
    },
    image:{
        width:50,
        height:50,
        borderRadius: 8,
        margin:4
    },
    cardText:{
        alignItems: 'flex-start',
        justifyContent: 'space-around'
    },
    text:{
        fontSize:10,
        fontWeight:'600',
    },
    date:{
        fontSize:8,
        color: '#fff' //'rgba(34, 31, 31, 0.4)'
    }

})