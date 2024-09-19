import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/theme';
import { RFValue } from 'react-native-responsive-fontsize';
import Colors from '@/constants/Colors';
import { getExamsFromCache } from '@/cache/index'; // Importar a função de cache
import { auth } from '@/firebase/index';
import { AddButton } from '@/components/AddButton';
import { BiometricModal } from '@/components/BiometricModal';

export function HomeBiometricInfo() {
    const { theme } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [exams, setExams] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de busca
    
    // Função para carregar os exames do cache
    const loadExams = async () => {
        setLoading(true);
        setError(null);
        try {
            const userId = auth.currentUser?.uid ?? '';
            if (!userId) {
                throw new Error('Usuário não autenticado');
            }
            const cachedExams = await getExamsFromCache(userId);
            if (Array.isArray(cachedExams)) {
                setExams(cachedExams);
            } else {
                throw new Error('Dados de exames inválidos');
            }
        } catch (err) {
            console.error(err);
            setError('Erro ao carregar exames do cache');
        } finally {
            setLoading(false);
        }
    };

    // Carregar exames ao montar o componente e sempre que o usuário mudar
    useEffect(() => {
        loadExams();
    }, [auth.currentUser?.uid]);

    const handleAddBiometric = () => {
        setModalVisible(true);
        // Recarregar os exames ao abrir o modal para garantir que estão atualizados
        loadExams();
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const renderItem = ({ item }: { item: string }) => (
        <View style={styles(theme).itemContainer}>
            <TouchableOpacity
                style={[styles(theme).itemButton, { backgroundColor: Colors[theme].primary }]}
                onPress={() => {
                    console.log('Selected analyte:', item); // Log the name of the item (analyte)
                    handleCloseModal(); // Close the modal after logging the item
                }}
            >
                <Text style={styles(theme).itemText}>{item}</Text>
            </TouchableOpacity>
        </View>
    );
    

    if (loading) {
        return <Text>Carregando...</Text>; // Exibir mensagem de carregamento
    }

    if (error) {
        return <Text>{error}</Text>; // Exibir mensagem de erro
    }

    // Função para remover acentuação
    const removeAccents = (str: string) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    // Flatten the list of analytes and filter by the search term
    const analytes = [...new Set(exams.flatMap(exam => exam.ANALITOS))].filter((analyte) =>
        removeAccents(analyte.toLowerCase()).includes(removeAccents(searchTerm.toLowerCase()))
    );

    return (
        <View style={styles(theme).biometricInfo}>
            <AddButton theme={theme} onPress={handleAddBiometric} />
            <View
                style={styles(theme).verticalSeparator}
            />
            <AddButton theme={theme} onPress={handleAddBiometric} />
            <View
                style={styles(theme).verticalSeparator}
            />
            <AddButton theme={theme} onPress={handleAddBiometric} />

            <BiometricModal
                theme={theme}
                modalVisible={modalVisible}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                analytes={analytes}
                handleCloseModal={handleCloseModal}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = (theme: string) =>
    StyleSheet.create({
        biometricInfo: {
            flexDirection: "row",
            gap: RFValue(18, 808),
            paddingTop: "8%",
        },
        verticalSeparator: {
            width: RFValue(1.5, 808),
            height: "80%",
            alignSelf: "center",
        },
        itemContainer: {
            marginBottom: 10,
        },
        itemButton: {
            width: '100%',
            padding: 15,
            borderRadius: 5,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: Colors[theme].white,
        },
        itemText: {
            color: Colors[theme].white,
            fontWeight: 'bold',
        },
    });