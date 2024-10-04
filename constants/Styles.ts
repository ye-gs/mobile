import Colors, {otherColors} from "@/constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "@/contexts/theme";

export function GeneralStyles() {
    const { theme } = useTheme();

    const addButton1 = {
        position: "absolute",
        right: 30,
        bottom: 30,
        backgroundColor: Colors[theme].altTextColor,
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: otherColors.shadowColor1,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        tintColor: otherColors.black1,
    }
    const container1 = {
        flexGrow: 1,
        paddingBottom: RFValue(100, 808),
        alignItems: 'center'
    }
    const container2 = {
        flex: 1,
        backgroundColor: Colors[theme].background,
    }
    const messageList1 = {
        flexGrow: 1,
        justifyContent: "flex-end",
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
    const userMessage = {
        alignSelf: "flex-end",
        backgroundColor: Colors[theme].primaryLighter, // "#DCF8C6", // i love whatsapp,
    }

    return {
        addButton1: addButton1,
        container1: container1,
        container2: container2,
        messageList1: messageList1, 
        menu1: menu1,
        menuContent1: menuContent1,
        menuItemTitle1: menuItemTitle1,
        shadow1: shadow1,
        size24: RFValue(24), //24,
        size25: RFValue(25, 1200), //25,
        size28: RFValue(28, 1200), //28,
        size30: RFValue(30, 800), //30,
        tabBarIcon1: tabBarIcon1,
        userMessage: userMessage,
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