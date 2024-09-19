import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router'; // Use `expo-router` para navegação
import { GetItemInfo } from '@/components/searchItem';

const Analitos = () => {
    const { analitoName } = useLocalSearchParams(); // Recupera o nome do analito passado como parâmetro
    const analitoNameStr = Array.isArray(analitoName) ? analitoName[0] : analitoName;
    interface AnalitoInfo {
        resultado: string;
        unidade: string;
        analitos: string;
    }
    
    const [analitoInfo, setAnalitoInfo] = useState<AnalitoInfo[]>([]);
    const router = useRouter(); // Use `useRouter` para navegar entre as telas

    useEffect(() => {
        const fetchData = async () => {
            const data = await GetItemInfo(analitoNameStr);
            setAnalitoInfo(data);
        };

        fetchData();
    }, [analitoNameStr]);

    // Função para pegar o analito mais recente
    const handleUseLatest = async () => {
        const latestData = await GetItemInfo("latest"); // ou outra lógica para o "mais recente"
        setAnalitoInfo(latestData);
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Analito Selecionado</Text>
                <Button title="Voltar para Home" onPress={() => router.push('/home')} />
                <Button title="Usar mais recente" onPress={handleUseLatest} />
            </View>
            <Text style={styles.analitoName}>{analitoNameStr}</Text>

            {analitoInfo.map((item, index) => (
                <View key={index} style={styles.buttonContainer}>
                    <Button
                        title={`${item.resultado} ${item.unidade}`}
                        onPress={() => console.log(item)}
                    />
                    <Text style={styles.details}>
                        Referência: {item.analitos}
                    </Text>
                </View>
            ))}
        </ScrollView>
    );
};


const colors = {
    primary: '#333',
    secondary: '#666',
    background: '#f5f5f5',
    buttonBackground: '#007BFF',
    buttonText: '#FFF',
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: 20,
        width: '100%',
    },
    headerContainer: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: colors.primary,
        textAlign: 'center',
    },
    analitoName: {
        fontSize: 22,
        color: colors.primary,
        marginBottom: 20,
        textAlign: 'center',
        lineHeight: 30,
    },
    buttonContainer: {
        marginBottom: 15,
        width: '100%',
        backgroundColor: colors.buttonBackground,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: colors.buttonText,
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    details: {
        marginTop: 5,
        fontSize: 16,
        color: colors.secondary,
        textAlign: 'center',
        lineHeight: 24,
    },
});

export default Analitos;
