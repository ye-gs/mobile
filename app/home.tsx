import { StyleSheet, Image } from "react-native";
import { Text, View } from "@/components/Themed";
import { HomeCard } from "@/components/HomeCard";
import { HomeOption } from "@/components/HomeOption";
import { HomeHistoryCard } from "@/components/HomeHistoryCard";
import { Doctor, Glicemia, Heartbeat, Imc, Pill } from "@/assets/images/index"
import { useUser } from './contexts/user';

export default function Home() {
  const { user } = useUser();
  console.log(user?.displayName)
  return <View style={styles.container}>
    <View style={styles.userInfo}>
      <Image
        style={styles.userImage}
        source={{
          uri: user?.photoURL || "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1165301142.jpg",
        }} />
      <Text style={styles.userName}>{user?.displayName || "Gill Bates"}</Text>
    </View>
    <View style={styles.biometricInfo}>
      <HomeCard
        text="IMC"
        ImageComponent={Imc}
        value="31,14"
        status="Obesidade 2" />
      <View style={styles.verticalSeparator} lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)" />
      <HomeCard
        text="Glicemia"
        ImageComponent={Glicemia}
        value="85Mg/Dl"
        status="Normal" />
      <View style={styles.verticalSeparator} lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)" />
      <HomeCard
        text="Pressão"
        ImageComponent={Heartbeat}
        value="150x100"
        status="Normal"
      ></HomeCard>
    </View>
    <View
      style={styles.separator}
      lightColor="#eee"
      darkColor="rgba(255,255,255,0.1)" />
    <View style={styles.options}>
      <HomeOption
        text="Exames"
        ImageComponent={Doctor} />
      <HomeOption
        text="Medicação"
        ImageComponent={Pill}
      ></HomeOption>
    </View>
    <View style={styles.history}>
      <View style={styles.history__heading}>
        <Text style={styles.history__title}>
          Próximas consultas
        </Text>
        <Text style={styles.history__link}>
          Ver todas
        </Text>
      </View>
      <HomeHistoryCard text="Exame de próstata com doutor Flamingo" date="Hoje" imageUrl="https://clinicaunix.com.br/wp-content/uploads/2019/09/COMO-E-REALIZADO-O-EXAME-DE-PROSTATA.jpg" isBookmarked={true}></HomeHistoryCard>
      <HomeHistoryCard text="Tadalafila com doutor Flamingo" date="Hoje" imageUrl="https://clinicaunix.com.br/wp-content/uploads/2019/09/COMO-E-REALIZADO-O-EXAME-DE-PROSTATA.jpg" isBookmarked={false}></HomeHistoryCard>
      <HomeHistoryCard text="Exame de próstata sem as mãos com doutor Flamingo" date="Amanhã" imageUrl="https://clinicaunix.com.br/wp-content/uploads/2019/09/COMO-E-REALIZADO-O-EXAME-DE-PROSTATA.jpg" isBookmarked={false}></HomeHistoryCard>
    </View>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: '400'
  },
  subtitle: {
    fontSize: 15,
  },
  separator: {
    marginVertical: 20,
    height: 1.5,
    width: "80%",
  },
  verticalSeparator: {
    width: 1.5,
    height: "80%",
    alignSelf: "center"
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
  },
  biometricInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
    paddingTop: 30,
  },
  options: {
    flex: 1,
    flexDirection: "row",
    gap: 60,
  },
  history: {
    flex: 2.5,
    paddingTop: 30,
    width: '80%',
    gap: 10,
  },
  history__heading: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  history__title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  history__link: {
    fontSize: 12,
    alignSelf: 'flex-end',
    color: 'rgba(64, 124, 226, 1)'
  },
});
