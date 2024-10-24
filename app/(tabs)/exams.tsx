import React, { useEffect } from "react";
import { TouchableOpacity, StyleSheet, FlexAlignType } from "react-native";
import { ScrollView } from "@/components/Themed";
import { AntDesign } from "@expo/vector-icons";
import { ExamCard } from "@/components/ExamCard";
import { RFValue } from "react-native-responsive-fontsize";
import { router } from "expo-router";
import Colors, { otherColors } from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { routeAndTransformExams } from "@/utils/routeAndTransform";
import { useExams } from "@/hooks/exams";
import { GeneralStyles } from "@/constants/Styles";
import { AddButton } from "@/components/AddButton";

const Exams = () => {
    const { exams } = useExams();
    // const { theme } = useTheme();
    // const styles = StyleSheet.create({
    //     addButton: {
    //         position: "absolute",
    //         right: 30,
    //         bottom: 30,
    //         backgroundColor: Colors[theme].altTextColor,
    //         borderRadius: 50,
    //         width: 60,
    //         height: 60,
    //         justifyContent: "center",
    //         alignItems: "center",
    //         shadowColor: "#000",
    //         shadowOffset: { width: 0, height: 2 },
    //         shadowOpacity: 0.25,
    //         shadowRadius: 3.84,
    //         elevation: 5,
    //         tintColor: "black",
    //     },
    //     shadow: {
    //         shadowColor: "#000", // Shadow color
    //         shadowOffset: { width: 0, height: 2 }, // Shadow offset
    //         shadowOpacity: 0.25, // Shadow opacity
    //         shadowRadius: 3.84, // Shadow radius
    //         elevation: 5, // Elevation for Android shadow
    //     },
    // });
    return (
        <ScrollView contentContainerStyle={GeneralStyles().container1}>
            {exams.map((exam) => (
                <ExamCard
                    id={exam.id}
                    key={exam.id}
                    onPress={() =>
                        routeAndTransformExams({
                            ...exam,
                        })
                    }
                />
            ))}
            <TouchableOpacity
                style={[GeneralStyles().addButton1, GeneralStyles().shadow1]}
                onPress={() => router.push("/exams/new")}
            >
                <AntDesign
                    name="plus"
                    size={GeneralStyles().size24}
                    color={otherColors.white1}
                />
            </TouchableOpacity>
        </ScrollView>
    );
};

export default Exams;
