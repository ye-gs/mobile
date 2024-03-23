import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { router } from "expo-router";
import { GenericButton } from "@/components/GenericButton";

export default function Home() {
  return (
    <View style={styles.container}>
      <GenericButton title="Login" onPress={() => router.navigate("login")} />
      <GenericButton title="Signup" onPress={() => router.navigate("signup")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
