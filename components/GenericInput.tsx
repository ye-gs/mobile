import { SvgProps } from "react-native-svg";
import { View } from "./Themed";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";

export function GenericInput(props:{placeholderText?: string, placeholderTextColor?: string, borderColor?: string, StartImageComponent?: React.ComponentType<SvgProps>, EndImageComponent?: React.ComponentType<SvgProps>, shouldBeSecure?: boolean}
){
    const placeholderTextColor = props.placeholderTextColor ?? 'grey' //'rgba(34, 31, 31, 0.4)'
    const  { StartImageComponent, EndImageComponent } = props
    return(
        <View style={styles.container}>
            <View style={styles.startImageView}>
            {StartImageComponent?<StartImageComponent/>: ""}
            </View>
            <TextInput
            style ={styles.input}
            placeholder={props.placeholderText?props.placeholderText:""}
            placeholderTextColor={placeholderTextColor}
            secureTextEntry={props.shouldBeSecure}
            keyboardType="default"
            autoCapitalize="none">
            </TextInput>
            <View style={styles.endImageView}>
            {EndImageComponent?<EndImageComponent/>: ""}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height: '22%',
        width: '100%',
        borderColor: 'rgba(34, 31, 31, 0.1)',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 8,
        gap: 8,
        backgroundColor:'rgba(249, 250, 251, 1)'
    },
    startImageView:{
        width: '7%',
        backgroundColor:'rgba(249, 250, 251, 1)'
    },
    endImageView:{
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(249, 250, 251, 1)'
    },
    input:{
        flex:3,
        fontSize: 14,
        left: '3%',
        textAlignVertical:'center',
        color: '#000'
    },
})