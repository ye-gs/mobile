import { View, Text, ScrollView } from "@/components/Themed";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/contexts/theme";
import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";

export default function UserInfo() {
    const { theme } = useTheme();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            backgroundColor: Colors[theme].background, // Adicionando cor de fundo para melhor visualização
        },
        main: {
            width: "90%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10%",
        },
        header: {
            width: "100%",
            fontSize: RFValue(30, 808),
            fontWeight: "bold",
            color: Colors[theme].altTextColor,
            textAlign: "center",
        },
        mainContent: {
            width: "100%",
            backgroundColor: Colors[theme].primaryLighter,
            color: Colors[theme].primaryDarker,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15,
            paddingVertical: "5%", // Adicionando padding vertical para melhor espaçamento
            paddingHorizontal: "4%",
            marginTop: "2%", // Ajustando o margin-top para espaçamento entre o header e o conteúdo
        },
        mainText: {
            fontSize: RFValue(14, 808),
            fontWeight: "bold",
            textAlign: "justify",
        },
        slogan: {
            fontSize: RFValue(25, 808),
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "5%", // Ajustando margin-top para espaçamento entre o texto principal e o slogan
        },
    });
    return (
        <ScrollView style={styles.container}>
            <StatusBar style="auto" />
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
            >
                <View style={styles.main}>
                    <Text style={styles.header}>YE Gestão de Saúde</Text>
                    <View style={styles.mainContent}>
                        <Text style={styles.mainText}>
                            A YE Gestão de Saúde é uma empresa inovadora no
                            setor de tecnologia para a saúde, dedicada ao
                            desenvolvimento de soluções inteligentes que tornam
                            o gerenciamento da saúde pessoal mais eficiente e
                            acessível. Nosso principal projeto é um aplicativo
                            de gestão de saúde que utiliza inteligência
                            artificial para fornecer lembretes personalizados e
                            dicas médicas, ajudando os usuários a manterem um
                            controle rigoroso sobre sua saúde e bem-estar.
                            {"\n\n"}
                            Nosso aplicativo é projetado para ser um assistente
                            pessoal de saúde, que lembra os usuários de
                            consultas médicas, exames e horários de medicação.
                            Além disso, oferece sugestões e orientações
                            personalizadas com base nas necessidades e histórico
                            de saúde de cada indivíduo. Através da inteligência
                            artificial, buscamos tornar a gestão da saúde mais
                            intuitiva e proativa, promovendo a prevenção e
                            facilitando a adesão a hábitos saudáveis.
                            {"\n\n"}
                            Na YE Gestão de Saúde, acreditamos que a tecnologia
                            pode transformar a forma como cuidamos da nossa
                            saúde, tornando o acesso a informações médicas e a
                            manutenção de uma rotina saudável mais simples e
                            eficaz. Estamos comprometidos em oferecer um
                            aplicativo que não apenas auxilia no dia a dia, mas
                            também contribui para uma vida mais saudável e
                            equilibrada.
                        </Text>

                        <Text style={styles.slogan}>
                            Sua saúde em suas mãos!
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </ScrollView>
    );
}
