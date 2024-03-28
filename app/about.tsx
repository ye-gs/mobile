import { View, Text } from "@/components/Themed";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/contexts/theme";
import { useUser } from "@/contexts/user";
import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function UserInfo() {
    const { theme } = useTheme();
    const { user } = useUser();
    const styles = StyleSheet.create({
        container:{
            flex:1,
            alignItems: 'center',
        },
        main:{
            width: '80%',
            top: '10%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        header:{
            width: '100%',
            height: 'auto',
            fontSize: RFValue(30, 808),
            fontWeight: 'bold',
            color: Colors[theme].altTextColor,
            textAlign: 'center'
        },
        mainContent:{
            width: '100%',
            backgroundColor: Colors[theme].primaryLighter,
            color: Colors[theme].primaryDarker,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            top: '2%',
        },
        mainText:{
            fontSize: RFValue(14, 808),
            fontWeight: 'bold',
            paddingHorizontal: '6%',
            paddingVertical: '10%',
            textAlign: 'justify'
        },
        slogan:{
            fontSize: RFValue(25, 808),
            fontWeight: 'bold',
            paddingHorizontal: '6%',
            paddingBottom: '10%',
            textAlign: 'center'
        }
    })
    return (
        <View style={styles.container}>
            <View style={styles.main}>
            <Text style={styles.header}>YE Gestão de Saúde</Text>
            <View style={styles.mainContent}>
                <Text style={styles.mainText}>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam quo voluptates facilis assumenda ex atque, voluptatum nostrum quisquam eius nemo cumque molestias? Corporis vero velit harum! Sed quas non temporibus excepturi quisquam doloribus dolores quibusdam ratione quae cupiditate amet, soluta et ipsum cum facilis sunt.{"\n"}  Mollitia error possimus numquam labore nesciunt aperiam similique, nemo culpa placeat aut molestiae odio minus? Eligendi, quis? Ea, placeat ipsam! Sunt debitis necessitatibus, quis est doloremque accusantium quia iure quae quo ipsum aperiam sed repudiandae sequi at distinctio, excepturi magnam corporis aspernatur nam laboriosam suscipit vitae nihil officiis? Numquam modi aut, voluptatem quis cupiditate ea!</Text>
                <Text style={styles.slogan}>Sua saúde em suas mãos!</Text>
            </View>
            <StatusBar style={theme} />
            </View>
        </View>
    );
}

