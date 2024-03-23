import { View } from "@/components/Themed";
import { HomeCard } from "@/components/home/HomeCard";
import { Glicemia, Heartbeat, Imc } from "@/assets/images/index";
import { StyleSheet } from "react-native";

export function HomeBiometricInfo() {
  return (
    <View style={styles.biometricInfo}>
      <HomeCard
        text="IMC"
        ImageComponent={Imc}
        value="31,14"
        status="Obesidade 2"
      />
      <View
        style={styles.verticalSeparator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <HomeCard
        text="Glicemia"
        ImageComponent={Glicemia}
        value="85Mg/Dl"
        status="Normal"
      />
      <View
        style={styles.verticalSeparator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <HomeCard
        text="Pressão"
        ImageComponent={Heartbeat}
        value="150x100"
        status="Normal"
      ></HomeCard>
    </View>
  );
}

const styles = StyleSheet.create({
  verticalSeparator: {
    width: 1.5,
    height: "80%",
    alignSelf: "center",
  },
  biometricInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
    paddingTop: 30,
  },
});
