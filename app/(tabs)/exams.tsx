import React from "react";
import { View, Text, } from "@/components/Themed";
import { StyleSheet, Button } from "react-native";
import * as DocumentPicker from "expo-document-picker";

const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({ 
      type: "*/*", // You can specify the type of document you want to pick (e.g., "application/pdf" for PDFs)
      copyToCacheDirectory: true,
      multiple: false, // Set this to true if you want to allow picking multiple files
    });
      console.log("File URI:", result);
  };

const Exams = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello, React Native!</Text>
            <Button title="Inserir documento" onPress={pickDocument}></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default Exams;
