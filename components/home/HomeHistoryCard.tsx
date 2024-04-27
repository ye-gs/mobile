import { View, Text } from "@/components/Themed";
import { StyleSheet, Image } from "react-native";
import { Bookmark, MarkedBM } from "@/assets/images/index";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "@/contexts/theme";
import Colors from "@/constants/Colors";
import { useState } from "react";

export function HomeHistoryCard(props: {
    text: string;
    date: string;
    imageUrl: string;
    isBookmarked: boolean;
}) {
    const { theme } = useTheme();
    const [isBookmarked, setBookmarked] = useState(props.isBookmarked);
    const markBookmarked = () => {
        setBookmarked(!isBookmarked);
    };
    const BookmarkImage = isBookmarked ? MarkedBM : Bookmark;

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: props.imageUrl }} />
            <View style={styles.cardText}>
                <Text style={styles.text}>{props.text}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <View style={styles.bookmarkView}>
                <BookmarkImage
                    style={styles.bookmark}
                    onPress={markBookmarked}
                    fill={Colors[theme].tabIconSelected}
                    width={styles.bookmark.width}
                    height={styles.bookmark.height}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderWidth: RFValue(1, 808),
        borderColor: "#ccc",
        borderRadius: 10,
        height: "auto",
    },
    image: {
        width: RFValue(50, 808),
        height: RFValue(50, 808),
        borderRadius: 8,
        margin: RFValue(4, 808),
    },
    cardText: {
        alignItems: "flex-start",
        justifyContent: "space-around",
    },
    text: {
        fontSize: RFValue(10, 808),
        fontWeight: "400",
    },
    date: {
        fontSize: RFValue(8, 808),
    },
    bookmarkView: {
        flex: 1,
        alignItems: "flex-end",
        borderRadius: 10,
    },
    bookmark: {
        width: RFValue(22, 808),
        height: RFValue(22, 808),
        marginTop: RFValue(3, 808),
        marginRight: RFValue(8, 808),
    },
});
