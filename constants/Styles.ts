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
    const circle1 = {
        backgroundColor: Colors[theme].circleBackground,
        padding: 5,
        borderRadius: 15,
        overflow: "hidden" as "hidden",
    }
    const container1 = {
        flexGrow: 1,
        paddingBottom: RFValue(100, 808),
        alignItems: "center" as FlexAlignType
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
    }
    const shadow1 = {
        shadowColor: otherColors.shadowColor1, // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.25, // Shadow opacity
        shadowRadius: 3.84, // Shadow radius
        elevation: 5, // Elevation for Android shadow
    }
    const tabBarIcon1 = {
        marginBottom: -3
    }
    const userMessage1 = {
        alignSelf: "flex-end" as FlexAlignType,
        backgroundColor: Colors[theme].primaryLighter, // "#DCF8C6", // i love whatsapp,
    }

    return {
        addButton1: addButton1,
        cadastroContainer1: cadastroContainer1,
        cadastroTitle1: cadastroTitle1,
        circle1: circle1,
        container1: container1,
        container2: container2,
        container3: container3,
        container4: container4,
        messageList1: messageList1, 
        menu1: menu1,
        menuContent1: menuContent1,
        menuItemTitle1: menuItemTitle1,
        options1: options1,
        shadow1: shadow1,
        size24: RFValue(24), //24,
        size25: RFValue(25, 1200), //25,
        size28: RFValue(28, 1200), //28,
        size30: RFValue(30, 800), //30,
        tabBarIcon1: tabBarIcon1,
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