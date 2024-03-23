import React, { useState } from "react";
import { Button, Dialog, Portal, RadioButton } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";

export function GenderSelect() {
    type Genero = "Homem" | "Mulher" | null;
    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const [gender, setGender] = useState<Genero>(null);

    const { theme } = useTheme();
    const colorScheme = theme;
    return (
        <>
            <Button
                icon={() => (
                    <FontAwesome
                        name={
                            gender === "Homem"
                                ? "male"
                                : "female" || "space-shuttle"
                        }
                        color={Colors[colorScheme ?? "light"].altTextColor}
                    ></FontAwesome>
                )}
                mode="outlined"
                onPress={showDialog}
                textColor={Colors[colorScheme ?? "light"].altTextColor}
                style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    borderColor: "gray",
                    borderWidth: 1,
                }}
            >
                Gênero: {gender || "Selecione"}
            </Button>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title
                        style={{
                            color: Colors[colorScheme ?? "light"].text,
                        }}
                    >
                        Selecione seu gênero
                    </Dialog.Title>
                    <Dialog.Content>
                        <RadioButton.Group
                            onValueChange={(value) =>
                                setGender(value as Genero)
                            }
                            value={gender || "user"}
                        >
                            <RadioButton.Item
                                color={Colors[colorScheme].altTextColor}
                                labelStyle={{
                                    color: Colors[colorScheme ?? "light"].text,
                                }}
                                label="Homem"
                                value="Homem"
                            />
                            <RadioButton.Item
                                color={Colors[colorScheme].altTextColor}
                                labelStyle={{
                                    color: Colors[colorScheme].text,
                                }}
                                label="Mulher"
                                value="Mulher"
                            />
                        </RadioButton.Group>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            textColor={Colors[colorScheme].altTextColor}
                            onPress={hideDialog}
                        >
                            Pronto
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    );
}
