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

interface PressureMeasure {
    id: string;
    systolic: number;
    diastolic: number;
    date: string;
}

const PressureMeasures = () => {
    const { theme } = useTheme();
    const [measures, setMeasures] = useState<PressureMeasure[]>([]);
    const [newSystolic, setNewSystolic] = useState<string>("");
    const [newDiastolic, setNewDiastolic] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchMeasures();
    }, []);

    const fetchMeasures = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(
                collection(
                    db,
                    `users/${auth.currentUser?.uid}/pressureMeasures`
                )
            );
            const fetchedMeasures: PressureMeasure[] = [];
            querySnapshot.forEach((doc) => {
                fetchedMeasures.push({
                    id: doc.id,
                    ...doc.data(),
                } as PressureMeasure);
            });
            setMeasures(fetchedMeasures);
        } catch (error) {
            alert(`Error fetching pressure measures: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const addMeasure = async () => {
        if (!newSystolic || !newDiastolic) return;
        try {
            const docRef = await addDoc(
                collection(
                    db,
                    `users/${auth.currentUser?.uid}/pressureMeasures`
                ),
                {
                    systolic: parseFloat(newSystolic),
                    diastolic: parseFloat(newDiastolic),
                    date: new Date().toISOString(),
                }
            );
            setMeasures([
                ...measures,
                {
                    id: docRef.id,
                    systolic: parseFloat(newSystolic),
                    diastolic: parseFloat(newDiastolic),
                    date: new Date().toISOString(),
                },
            ]);
            setNewSystolic("");
            setNewDiastolic("");
        } catch (error) {
            alert(`Error adding pressure measure: ${error}`);
        }
    };

    const deleteMeasure = async (id: string) => {
        try {
            await deleteDoc(
                doc(db, `users/${auth.currentUser?.uid}/pressureMeasures`, id)
            );
            setMeasures(measures.filter((measure) => measure.id !== id));
        } catch (error) {
            alert(`Error deleting pressure measure: ${error}`);
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
                Medições de pressão
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o valor sistólico"
                placeholderTextColor={Colors[theme].text}
                value={newSystolic}
                onChangeText={setNewSystolic}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Digite o valor diastólico"
                placeholderTextColor={Colors[theme].text}
                value={newDiastolic}
                onChangeText={setNewDiastolic}
                keyboardType="numeric"
            />
            <Button title="Adicionar medida de pressão" onPress={addMeasure} />
            {loading ? (
                <Text>Carregando...</Text>
            ) : (
                <FlatList
                    data={measures}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.measureItem}>
                            <Text>
                                {item.systolic}/{item.diastolic} mmHg
                            </Text>
                            <Text>{new Date(item.date).toLocaleString()}</Text>
                            <Button
                                title="Delete"
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

export default PressureMeasures;
