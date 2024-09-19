import React from "react";
import {
    View,
    Modal,
    Text,
    FlatList,
    TouchableOpacity,
    TextInput,
    StyleSheet,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Colors from "@/constants/Colors";

interface BiometricModalProps {
    theme: string;
    modalVisible: boolean;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    analytes: string[];
    handleCloseModal: () => void;
    renderItem: ({ item }: { item: string }) => JSX.Element;
}

export const BiometricModal: React.FC<BiometricModalProps> = ({
    theme,
    modalVisible,
    searchTerm,
    setSearchTerm,
    analytes,
    handleCloseModal,
    renderItem,
}) => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
    >
        <View style={styles(theme).modalView}>
            <Text style={styles(theme).modalText}>
                Adicionar Dados Biométricos
            </Text>

            {/* Campo de busca */}
            <TextInput
                style={styles(theme).searchInput}
                placeholder="Buscar análito..."
                placeholderTextColor={Colors[theme].white}
                value={searchTerm}
                onChangeText={setSearchTerm} // Atualiza o estado do termo de busca
            />

            {/* Lista de análitos filtrados */}
            <FlatList
                data={analytes}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity
                style={styles(theme).closeButton}
                onPress={handleCloseModal}
            >
                <Text style={styles(theme).closeButtonText}>Fechar</Text>
            </TouchableOpacity>
        </View>
    </Modal>
);

const styles = (theme: string) =>
    StyleSheet.create({
        modalView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors[theme].tint,
            padding: 20,
        },
        modalText: {
            fontSize: RFValue(18, 808),
            marginBottom: 20,
            color: Colors[theme].white,
        },
        searchInput: {
            width: "100%",
            padding: 10,
            borderRadius: 5,
            marginBottom: 20,
            backgroundColor: Colors[theme].primary,
            color: Colors[theme].white,
            borderColor: Colors[theme].white,
            borderWidth: 1,
        },
        closeButton: {
            marginTop: 20,
            padding: 10,
            borderRadius: 5,
            backgroundColor: Colors[theme].white,
        },
        closeButtonText: {
            color: Colors[theme].borderColor,
            fontSize: RFValue(16, 808),
        },
    });