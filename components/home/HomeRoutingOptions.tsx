import { View } from "@/components/Themed";
import { HomeOption } from "@/components/home/HomeOption";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import { Doctor, Pill } from "@/assets/images/index";

export function HomeRoutingOptions() {
  return (
    <View style={styles.options}>
      <HomeOption
        text="Exames"
        onPress={() => router.replace("/exams")}
        ImageComponent={Doctor}
      />
      <HomeOption
        text="Medicação"
        onPress={() => router.replace("/meds")}
        ImageComponent={Pill}
      ></HomeOption>
    </View>
  );
}

const styles = StyleSheet.create({
  options: {
    flex: 0,
    flexDirection: "row",
    gap: 60,
  },
});
