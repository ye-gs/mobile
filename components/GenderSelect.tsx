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
                        color={Colors[theme].altTextColor}
                    ></FontAwesome>
                )}
                mode="outlined"
                onPress={showDialog}
                textColor={Colors[theme].altTextColor}
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
                            color: Colors[theme].text,
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
                                color={Colors[theme].altTextColor}
                                labelStyle={{
                                    color: Colors[theme].text,
                                }}
                                label="Homem"
                                value="Homem"
                            />
                            <RadioButton.Item
                                color={Colors[theme].altTextColor}
                                labelStyle={{
                                    color: Colors[theme].text,
                                }}
                                label="Mulher"
                                value="Mulher"
                            />
                        </RadioButton.Group>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            textColor={Colors[theme].altTextColor}
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
