import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { User } from "firebase/auth";
import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";

export function ProfileCard(props: { user: User | null }) {
  const { theme } = useTheme()
  const colorScheme = theme

  const styles = StyleSheet.create({
    userName: {
      fontSize: 18,
      color: Colors[colorScheme ?? 'light'].text,
      fontWeight: '400'
    },
    userInfo: {
      flex: 1.5,
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 10,
      paddingTop: 30,
    },
    userImage: {
      marginTop: 10,
      width: 90,
      height: 90,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: '#ccc'
    }
  });
  return <View style={styles.userInfo
  } >
    <Image style={styles.userImage} source={{
      uri: props.user?.photoURL || "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1165301142.jpg"
    }} />
    <Text style={styles.userName}>{props.user?.displayName || "Gill Bates"}</Text>
  </View >;
}

