import React from "react";
import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";
import { Exam } from "@/types/exam";
import UploadExam from "@/components/UploadExam";

const SlugPage = () => {
    const params = useLocalSearchParams() as unknown as Exam;
    return (
        <View style={styles.container}>
            <UploadExam {...params} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
});

export default SlugPage;