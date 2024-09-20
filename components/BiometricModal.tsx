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
}) => (
    <Modal
        animationType="slide"
        transparent={false} // Remove a transparência
        visible={modalVisible}
        onRequestClose={handleCloseModal}
    >
        <View style={styles.modalView}>
            <Text style={styles.modalText}>Adicionar Dados Biométricos</Text>

            {/* Campo de busca */}
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar análito..."
                placeholderTextColor="#FFFFFF"
                value={searchTerm}
                onChangeText={setSearchTerm} // Atualiza o estado do termo de busca
            />

            {/* Indicador de carregamento */}
            {loading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : (
                <FlatList
                    style={styles.listContainer}
                    data={analytes}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}

            <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseModal}
            >
                <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
        </View>
    </Modal>
);

const COLORS = {
    background: "#f5f5f5",
    textPrimary: "#333333",
    textInputBackground: "#333333",
    textInputPlaceholder: "#FFFFFF",
    buttonBackground: "#007BFF",
    buttonText: "#FFFFFF",
    border: "#007BFF",
};

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: COLORS.background, // Cor de fundo sólida
    },
    modalText: {
        fontSize: RFValue(18, 808),
        marginBottom: 20,
        color: COLORS.textPrimary, // Cor do texto principal
    },
    searchInput: {
        width: "100%",
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        backgroundColor: COLORS.textInputBackground, // Fundo do input
        color: COLORS.textInputPlaceholder, // Texto branco no input
        borderColor: COLORS.border, // Borda azul
        borderWidth: 1,
    },
    listContainer: {
        width: "100%",
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        borderRadius: 20,
        backgroundColor: COLORS.buttonBackground, // Botão de fechar com cor sólida
        width: "90%",
        alignItems: "center",
    },
    closeButtonText: {
        color: COLORS.buttonText, // Texto branco no botão
        fontSize: RFValue(16, 808),
    },
});
