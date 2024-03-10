import { View, Text } from "@/components/Themed"
import { StyleSheet, Image } from "react-native"
import { Bookmark, MarkedBM } from "@/assets/images/index"
import { SvgProps } from "react-native-svg";

export function HomeHistoryCard(props:{text: string, date: string, imageUrl: string, isBookmarked: boolean}){
    const BookmarkImage = props.isBookmarked ? MarkedBM : Bookmark
    return(
        <View style={styles.container}>
            <Image style={styles.image} source={{uri:props.imageUrl}}/>
            <View style={styles.cardText}>
                <Text style={styles.text}>{props.text}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <View style={styles.bookmarkView}>
            <BookmarkImage style={styles.bookmark} width={styles.bookmark.width} height={styles.bookmark.height}/>
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
        flex:1,
        width:50,
        height:50,
        borderRadius: 8,
        margin:4
    },
    cardText:{
        flex:4,
        alignItems: 'flex-start',
        justifyContent: 'space-around'
    },
    text:{
        fontSize:10,
        fontWeight:'600',
    },
    date:{
        fontSize:8,
    },
    bookmarkView:{
        flex:1,
        alignItems:'flex-end',
        borderRadius: 10,
    },
    bookmark:{
        width: 22,
        height:22,
        marginTop:3,
        marginRight:8,
    },
    

})