import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    StyleSheet,
} from "react-native";
import {
    doc,
    getDocs,
    collection,
    deleteDoc,
    addDoc,
} from "firebase/firestore";
import { db, auth } from "@/firebase";
import { useTheme } from "@/contexts/theme";
import Colors from "@/constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";

interface GlucoseMeasure {
    id: string;
    value: number;
    date: string;
}

const GlucoseMeasures = () => {
    const { theme } = useTheme();
    const [measures, setMeasures] = useState<GlucoseMeasure[]>([]);
    const [newMeasure, setNewMeasure] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchMeasures();
    }, []);

    const fetchMeasures = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(
                collection(db, `users/${auth.currentUser?.uid}/glucoseMeasures`)
            );
            const fetchedMeasures: GlucoseMeasure[] = [];
            querySnapshot.forEach((doc) => {
                fetchedMeasures.push({
                    id: doc.id,
                    ...doc.data(),
                } as GlucoseMeasure);
            });
            setMeasures(fetchedMeasures);
        } catch (error) {
            console.error("Error fetching glucose measures:", error);
        } finally {
            setLoading(false);
        }
    };

    const addMeasure = async () => {
        if (!newMeasure) return;
        try {
            const docRef = await addDoc(
                collection(
                    db,
                    `users/${auth.currentUser?.uid}/glucoseMeasures`
                ),
                {
                    value: parseFloat(newMeasure),
                    date: new Date().toISOString(),
                }
            );
            setMeasures([
                ...measures,
                {
                    id: docRef.id,
                    value: parseFloat(newMeasure),
                    date: new Date().toISOString(),
                },
            ]);
            setNewMeasure("");
        } catch (error) {
            console.error("Error adding glucose measure:", error);
        }
    };

    const deleteMeasure = async (id: string) => {
        try {
            await deleteDoc(
                doc(db, `users/${auth.currentUser?.uid}/glucoseMeasures`, id)
            );
            setMeasures(measures.filter((measure) => measure.id !== id));
        } catch (error) {
            console.error("Error deleting glucose measure:", error);
        }
    };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: Colors[theme].background },
            ]}
        >
            <Text style={[styles.title, { color: Colors[theme].tint }]}>
                Medições de Glicose
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Insira a medida de glicose"
                placeholderTextColor={Colors[theme].text}
                value={newMeasure}
                onChangeText={setNewMeasure}
                keyboardType="numeric"
            />
            <Button title="Adicionar medida" onPress={addMeasure} />
            {loading ? (
                <Text>Carregando...</Text>
            ) : (
                <FlatList
                    data={measures}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.measureItem}>
                            <Text>{item.value} mg/dL</Text>
                            <Text>{new Date(item.date).toLocaleString()}</Text>
                            <Button
                                title="Deletar"
                                onPress={() => deleteMeasure(item.id)}
                            />
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: RFValue(20),
    },
    title: {
        fontSize: RFValue(24),
        fontWeight: "bold",
        marginBottom: RFValue(20),
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: RFValue(10),
        marginBottom: RFValue(20),
    },
    measureItem: {
        padding: RFValue(10),
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        marginBottom: RFValue(10),
    },
});

export default GlucoseMeasures;
