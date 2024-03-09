import { StyleSheet, TextInput, Button, Image } from "react-native";
import { Text, View } from "@/components/Themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { HomeCard } from "@/components/HomeCard";
import { HomeOption } from "@/components/HomeOption";
import { HomeHistoryCard } from "@/components/HomeHistoryCard";

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          style={styles.userImage}
          source={{
            uri: "https://img.freepik.com/vetores-premium/icone-de-perfil-de-usuario-em-estilo-plano-ilustracao-em-vetor-avatar-membro-em-fundo-isolado-conceito-de-negocio-de-sinal-de-permissao-humana_157943-15752.jpg",
          }}
        />
        <Text style={styles.title}>João Roberto</Text>
      </View>
      <View style={styles.biometricInfo}>
        <HomeCard
          text="IMC"
          imageUrl="https://img.stackshare.io/service/3244/1_Mr1Fy00XjPGNf1Kkp_hWtw_2x.png"
          value="31,14"
          status="Obesidade 2"
        ></HomeCard>
        <View style={styles.verticalSeparator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
        <HomeCard
          text="Glicemia"
          imageUrl="https://img.stackshare.io/service/3244/1_Mr1Fy00XjPGNf1Kkp_hWtw_2x.png"
          value="85Mg/Dl"
          status="Normal"
        ></HomeCard>
        <View style={styles.verticalSeparator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
        <HomeCard
          text="Pressão"
          imageUrl="https://img.stackshare.io/service/3244/1_Mr1Fy00XjPGNf1Kkp_hWtw_2x.png"
          value="150x100"
          status="Normal"
        ></HomeCard>
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.options}>
        <HomeOption
          text="Exames"
          imageUrl="https://cdn-icons-png.flaticon.com/512/4428/4428293.png"
        ></HomeOption>
        <HomeOption
          text="Medicação"
          imageUrl="https://cdn-icons-png.flaticon.com/512/4428/4428293.png"
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
          <HomeHistoryCard text="Exame de próstata com doutor Flamingo" date="Hoje" imageUrl="https://clinicaunix.com.br/wp-content/uploads/2019/09/COMO-E-REALIZADO-O-EXAME-DE-PROSTATA.jpg"></HomeHistoryCard>
          <HomeHistoryCard text="Exame de próstata com doutor Flamingo" date="Hoje" imageUrl="https://clinicaunix.com.br/wp-content/uploads/2019/09/COMO-E-REALIZADO-O-EXAME-DE-PROSTATA.jpg"></HomeHistoryCard>
          <HomeHistoryCard text="Exame de próstata com doutor Flamingo" date="Hoje" imageUrl="https://clinicaunix.com.br/wp-content/uploads/2019/09/COMO-E-REALIZADO-O-EXAME-DE-PROSTATA.jpg"></HomeHistoryCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    fontSize: 15,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "80%",
  },
  verticalSeparator:{
    width:1,
    height: "80%",
    alignSelf: "center"
  },
  userInfo: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  userImage: {
    marginTop: 10,
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  biometricInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 15,
    paddingTop:30,
  },
  options: {
    flexDirection: "row",
    gap: 60,
  },
  history:{
    paddingTop:30,
    width:'80%',
    gap: 10
  },
  history__heading:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  history__title:{
    fontSize:16,
    fontWeight: 'bold'
  },
  history__link:{
    fontSize:12,
    alignSelf:'flex-end'
  },
});
