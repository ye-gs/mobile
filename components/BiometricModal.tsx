import React from "react";
import {
    View,
    Modal,
    Text,
    FlatList,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ActivityIndicator, // Indicador de carregamento
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "@/contexts/theme"; // Importa o hook useTheme
import Colors from  "@/constants/Colors"; // Importa as cores

interface BiometricModalProps {
    modalVisible: boolean;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    analytes: string[];
    handleCloseModal: () => void;
    renderItem: ({ item }: { item: string }) => JSX.Element;
    loading: boolean; // Adicionado estado de carregamento
}

export const BiometricModal: React.FC<BiometricModalProps> = ({
    modalVisible,
    searchTerm,
    setSearchTerm,
    analytes,
    handleCloseModal,
    renderItem,
    loading, // Inclui o estado de carregamento
}) => {
    const { theme } = useTheme(); // Use o hook useTheme para obter o tema atual

    const currentColors = Colors[theme]; // Acessa as cores baseadas no tema atual

    return (
        <Modal
            animationType="slide"
            transparent={false} // Remove a transparência
            visible={modalVisible}
            onRequestClose={handleCloseModal}
        >
            <View style={[styles.modalView, { backgroundColor: currentColors.background }]}>
                <Text style={[styles.modalText, { color: currentColors.text }]}>
                    Adicionar Dados Biométricos
                </Text>

                {/* Campo de busca */}
                <TextInput
                    style={[
                        styles.searchInput,
                        { 
                            backgroundColor: currentColors.circleBackground, 
                            color: currentColors.altTextColor, 
                            borderColor: currentColors.borderColor 
                        }
                    ]}
                    placeholder="Buscar análito..."
                    placeholderTextColor={currentColors.altTextColor}
                    value={searchTerm}
                    onChangeText={setSearchTerm} // Atualiza o estado do termo de busca
                />

                {/* Indicador de carregamento */}
                {loading ? (
                    <ActivityIndicator size="large" color={currentColors.primaryLighter} />
                ) : (
                    <FlatList
                        style={styles.listContainer}
                        data={analytes}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}

                <TouchableOpacity
                    style={[styles.closeButton, { backgroundColor: currentColors.primaryLighter }]}
                    onPress={handleCloseModal}
                >
                    <Text style={[styles.closeButtonText, { color: currentColors.text }]}>Fechar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    modalText: {
        fontSize: RFValue(18, 808),
        marginBottom: 20,
    },
    searchInput: {
        width: "100%",
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        borderWidth: 1,
    },
    listContainer: {
        width: "100%",
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        borderRadius: 20,
        width: "90%",
        alignItems: "center",
    },
    closeButtonText: {
        fontSize: RFValue(16, 808),
    },
});
