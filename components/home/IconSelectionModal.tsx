import React from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Importando FontAwesome

// Props do componente IconSelectionModal
interface IconSelectionModalProps {
    visible: boolean;
    onClose: () => void;
    onSelectIcon: (iconName: string) => void;
}

// Tipo para os nomes dos ícones disponíveis no FontAwesome
type FontAwesomeIconNames = keyof typeof FontAwesome.glyphMap;

// Lista de todos os ícones disponíveis no FontAwesome
const iconsList = Object.keys(FontAwesome.glyphMap) as FontAwesomeIconNames[];

export const IconSelectionModal: React.FC<IconSelectionModalProps> = ({
    visible,
    onClose,
    onSelectIcon,
}) => {
    const renderIconItem = ({ item }: { item: FontAwesomeIconNames }) => (
        <TouchableOpacity
            style={styles.iconItem}
            onPress={() => onSelectIcon(item)} // Chama a função de seleção de ícone
        >
            <FontAwesome name={item} size={30} color="#000" />
            <Text style={styles.iconText}>{item}</Text>{" "}
            {/* Exibe o nome do ícone */}
        </TouchableOpacity>
    );

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Selecione um Ícone</Text>
                    <FlatList
                        data={iconsList} // Ícones do FontAwesome
                        keyExtractor={(item) => item}
                        renderItem={renderIconItem}
                        numColumns={3} // Exibe os ícones em 3 colunas
                        contentContainerStyle={styles.iconGrid}
                    />
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.closeButton}
                    >
                        <Text style={styles.closeButtonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        width: "90%",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    iconGrid: {
        justifyContent: "center",
    },
    iconItem: {
        alignItems: "center",
        margin: 10,
    },
    iconText: {
        marginTop: 5,
        fontSize: 14,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "#007BFF",
        borderRadius: 5,
    },
    closeButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
