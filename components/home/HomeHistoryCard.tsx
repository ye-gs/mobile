import React, { useState, useRef } from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    Animated,
    FlatList,
} from "react-native";
import { Bookmark, MarkedBM } from "@/assets/images/index";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "@/contexts/theme";
import Colors from "@/constants/Colors";
import { Appointment, AppointmentData } from "@/types/appointment";
interface HomeHistoryCardProps {
    description: string;
    text: string;
    date: string;
    imageUrl: string;
    isBookmarked: boolean;
    onPress?: () => void;
}
export function HomeHistoryCard(props: HomeHistoryCardProps) {
    const { theme } = useTheme();
    const [isBookmarked, setBookmarked] = useState(props.isBookmarked);
    const BookmarkImage = isBookmarked ? MarkedBM : Bookmark;

    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const toggleBookmark = () => {
        setBookmarked(!isBookmarked);
    };

    // Merge base styles with theme-specific styles
    const styles = StyleSheet.create({
        ...baseStyles,
        container: {
            ...baseStyles.container,
            borderBottomColor: Colors[theme].tabIconSelected,
            backgroundColor: Colors[theme].cardBackground,
        },
        text: {
            ...baseStyles.text,
            color: Colors[theme].text,
        },
        date: {
            ...baseStyles.date,
            color: Colors[theme].secondaryText,
        },
    });

    return (
        <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={props.onPress}
        >
            <Animated.View
                style={[
                    styles.container,
                    { transform: [{ scale: scaleAnim }] },
                ]}
            >
                <View style={styles.cardText}>
                    <Text style={styles.text}>{props.text}</Text>
                    <Text style={styles.text}>{props.description}</Text>
                    <Text style={styles.date}>{props.date}</Text>
                </View>

                <Pressable onPress={toggleBookmark} style={styles.bookmarkView}>
                    <BookmarkImage
                        style={styles.bookmark}
                        fill={Colors[theme].tabIconSelected}
                        width={styles.bookmark.width}
                        height={styles.bookmark.height}
                    />
                </Pressable>
            </Animated.View>
        </Pressable>
    );
}

export function ConsultationsList(props: { consultations: HomeHistoryCardProps[] }) {
    const renderItem = ({ item }: { item: HomeHistoryCardProps }) => (
        <HomeHistoryCard
            description={item.description}
            text={item.text}
            date={item.date}
            imageUrl={item.imageUrl}
            isBookmarked={item.isBookmarked}
            onPress={item.onPress}
        />
    );

    return (
        <FlatList
            data={props.consultations}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={baseStyles.listContainer}
        />
    );
}

// Define base styles that don't depend on theme
const baseStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderRadius: 15,
        width: "90%",
        alignSelf: "center",
        padding: RFValue(12, 808),
        borderBottomWidth: 1,
        marginVertical: RFValue(10, 808),
    },
    cardText: {
        flex: 3,
        justifyContent: "space-around",
    },
    text: {
        fontSize: RFValue(20, 808),
        fontWeight: "400",
    },
    date: {
        fontSize: RFValue(15, 808),
    },
    bookmarkView: {
        flex: 1,
        alignItems: "flex-end",
    },
    bookmark: {
        width: RFValue(22, 808),
        height: RFValue(22, 808),
        marginTop: RFValue(3, 808),
        marginRight: RFValue(8, 808),
    },
    listContainer: {
        paddingBottom: RFValue(10, 808),
    },
});
