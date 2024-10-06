import Colors, {otherColors} from "@/constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "@/contexts/theme";
import { DimensionValue, FlexAlignType } from "react-native";

export function GeneralStyles() {
    const { theme } = useTheme();

    const addButton1 = {
        position: "absolute" as "absolute",
        right: 30,
        bottom: 30,
        backgroundColor: Colors[theme].altTextColor,
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: "center" as "center",
        alignItems: "center" as FlexAlignType,
        shadowColor: otherColors.shadowColor1,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        tintColor: otherColors.black1,
    }
    const analitoName1 = {
        fontSize: 22,
        color: otherColors.primary,
        marginBottom: 20,
        textAlign: "center" as "center",
    }
    const borderBottomWidth1 = {
        borderBottomWidth: 1,
    }
    const cadastroContainer1 = {
        alignItems: "center" as FlexAlignType,
        padding: 10,
    }
    const cadastroTitle1 = {
        fontSize: 18,
        fontWeight: "bold" as "bold",
        color: otherColors.primary,
        marginBottom: 10,
    }
    const card1 = {
        backgroundColor: otherColors.cardBackground,
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        shadowColor: otherColors.shadowColor1,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4, // Shadow for Android
        width: "95%" as DimensionValue,
        alignSelf: "center" as "center",
    }
    const cardDate1 = {
        marginTop: 10,
        fontSize: 16,
        color: otherColors.primary,
    }
    const cardText1 = {
        fontSize: 18,
        fontWeight: "bold" as "bold",
        color: otherColors.primary,
    }
    const checkbox1 = {
        width: 22,
        height: 22,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: otherColors.primary,
        justifyContent: "center" as 'center',
        alignItems: "center" as FlexAlignType,
    }
    const checkboxAndTextContainer1 = {
        flexDirection: "row" as "row",
        alignItems: "center" as FlexAlignType,
    }
    const checkboxContainer1 = {
        marginRight: 15,
    }
    const checkboxFilled1 = {
        width: 12,
        height: 12,
        backgroundColor: otherColors.primary,
    }
    const circle1 = {
        backgroundColor: Colors[theme].circleBackground,
        padding: 5,
        borderRadius: 15,
        overflow: "hidden" as "hidden",
    }
    const container1 = {
        flexGrow: 1,
        paddingBottom: RFValue(100, 808),
        alignItems: "center" as FlexAlignType,
    }
    const container2 = {
        flex: 1,
        backgroundColor: Colors[theme].background,
    }
    const container3 = {
        flex: 1,
        alignItems: "center" as FlexAlignType,
    }
    const container4 = {
        flex: 1,
        justifyContent: "center" as "center",
        alignItems: "center" as FlexAlignType,
        backgroundColor: Colors[theme].background,
    }
    const container5 = {
        flex: 1,
        justifyContent: "center" as "center",
        alignItems: "center" as FlexAlignType,
        padding: 20
    }
    const container6 = {
        flexGrow: 1,
        alignItems: "center" as FlexAlignType,
    }
    const container7 = {
        flex: 1,
        backgroundColor: otherColors.background,
        padding: 20,
    }
    const container8 = {
        flex: 1,
        alignItems: "center" as FlexAlignType,
        justifyContent: "center" as "center",
    }
    const header1 = {
        width: "100%" as DimensionValue,
        fontSize: RFValue(30, 808),
        fontWeight: "bold" as "bold",
        color: Colors[theme].altTextColor,
        textAlign: "center" as "center",
    }
    const headerContainer1 = {
        marginTop: 20,
        flexDirection: "row" as "row",
        justifyContent: "space-between" as "space-between",
        alignItems: "center" as FlexAlignType,
        marginBottom: 20,
    }
    const link1 = {
        marginTop: 15,
        paddingVertical: 15,
    }
    const link2 = {
        fontSize: 16,
        color: otherColors.buttonBackground,
    }
    const linkText1 = {
        fontSize: 14,
        color: "#2e78b7",
    }
    const listContainer1 = {
        paddingBottom: 40,
        width: "98%" as DimensionValue,
        alignSelf: "center" as "center",
    }
    const main1 = {
        width: "90%" as DimensionValue,
        alignItems: "center" as FlexAlignType,
        justifyContent: "center" as "center",
        marginTop: "10%" as DimensionValue,
    }
    const mainContent1 = {
        width: "100%" as DimensionValue,
        backgroundColor: Colors[theme].primaryLighter,
        color: Colors[theme].primaryDarker,
        alignItems: "center" as FlexAlignType,
        justifyContent: "center" as "center",
        borderRadius: 15,
        paddingVertical: "5%" as DimensionValue, // Adicionando padding vertical para melhor espaçamento
        paddingHorizontal: "4%" as DimensionValue, // Adicionando padding horizontal para melhor espaç
        marginTop: "2%" as DimensionValue, // Ajustando o margin-top para espaçamento entre o header e o conteúdo
    }
    const mainText1 = {
        fontSize: RFValue(14, 808),
        fontWeight: "bold" as "bold",
        textAlign: "justify" as "justify",
    }
    const messageList1 = {
        flexGrow: 1,
        justifyContent: "flex-end" as "flex-end",
        padding: RFValue(10),
    }
    const menu1 = {
        backgroundColor: Colors[theme].background,
        borderColor: Colors[theme].borderColor,
        borderRadius: 10,
    }
    const menuContent1 = {
        backgroundColor: Colors[theme].background,
        borderWidth: 1,
        borderColor: Colors[theme].borderColor,
    }
    const menuItemTitle1 = {
        color: Colors[theme].text,
    }
    const options1 = {
        top: "5%" as DimensionValue,
        height: "60%" as DimensionValue,
        justifyContent: "center" as "center",
        backgroundColor: Colors[theme].background,
    }
    const responsiveBackground1 = `
        body {
        background-color: #fff;
        }
        @media (prefers-color-scheme: dark) {
        body {
            background-color: #fff;
        }
    }`
    const selectedCard1 = {
        borderColor: otherColors.buttonBackground,
        borderWidth: 2,
    }
    const shadow1 = {
        shadowColor: otherColors.shadowColor1, // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.25, // Shadow opacity
        shadowRadius: 3.84, // Shadow radius
        elevation: 5, // Elevation for Android shadow
    }
    const slogan1 = {
        fontSize: RFValue(25, 808),
        fontWeight: "bold" as "bold",
        textAlign: "center" as "center",
        marginTop: "5%" as DimensionValue,
    }
    const tabBarIcon1 = {
        marginBottom: -3
    }
    const textContainer1 = {
        flex: 1,
    }
    const title1 = {
        fontSize: 20,
        fontWeight: "bold" as "bold",
    }
    const title2 = {
        fontSize: 26,
        fontWeight: "bold" as "bold",
        color: otherColors.primary,
    }
    const userMessage1 = {
        alignSelf: "flex-end" as FlexAlignType,
        backgroundColor: Colors[theme].primaryLighter, // "#DCF8C6", // i love whatsapp,
    }

    return {
        addButton1: addButton1,
        analitoName1: analitoName1,
        borderBottomWidth1: borderBottomWidth1,
        cadastroContainer1: cadastroContainer1,
        cadastroTitle1: cadastroTitle1,
        card1: card1,
        cardDate1: cardDate1,
        cardText1: cardText1,
        checkbox1: checkbox1,
        checkboxAndTextContainer1: checkboxAndTextContainer1,
        checkboxContainer1: checkboxContainer1,
        checkboxFilled1: checkboxFilled1,
        circle1: circle1,
        container1: container1,
        container2: container2,
        container3: container3,
        container4: container4,
        container5: container5,
        container6: container6,
        container7: container7,
        container8: container8,
        header1: header1,
        headerContainer1: headerContainer1,
        headerTitleAlign1: "center" as "center",
        link1: link1,
        link2: link2,
        linkText1: linkText1,
        listContainer1: listContainer1,
        main1 : main1,
        mainContent1: mainContent1,
        mainText1: mainText1,
        messageList1: messageList1, 
        menu1: menu1,
        menuContent1: menuContent1,
        menuItemTitle1: menuItemTitle1,
        options1: options1,
        responsiveBackground1: responsiveBackground1,
        shadow1: shadow1,
        selectedCard1: selectedCard1,
        size24: RFValue(24), //24,
        size25: RFValue(25, 1200), //25,
        size28: RFValue(28, 1200), //28,
        size30: RFValue(30, 800), //30,
        size38: RFValue(38, 800),
        slogan1: slogan1,
        tabBarIcon1: tabBarIcon1,
        textContainer1: textContainer1,
        title1: title1,
        title2: title2,
        userMessage: userMessage1,
    }
}

// export const GeneralStyles ={
//     addButton1: useGeneralStyles().addButton1,
    // addButton1: addButton1,
    // container1: container1,
    // container2: container2,
    // messageList1: messageList1, 
    // menu1: menu1,
    // menuContent1: menuContent1,
    // menuItemTitle1: menuItemTitle1,
    // shadow1: shadow1,
    // size24: RFValue(24), //24,
    // size25: RFValue(25), //25,
    // size28: RFValue(28, 1200), //28,
    // size30: RFValue(30, 800), //30,
    // tabBarIcon1: tabBarIcon1,
    // userMessage: userMessage,
//}