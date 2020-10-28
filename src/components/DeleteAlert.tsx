import React, { useState } from 'react';
import { StyleSheet, Modal, View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface DeleteAlertProps {
    showAlert?: boolean;
    text: string;
    selectedOption(data: 'deny' | 'confirm'): void;
    showModalToggle(): void;
}

export default function DeleteAlert({ showAlert = true, text, selectedOption, showModalToggle }: DeleteAlertProps) {
    const [visible, setVisible] = useState(showAlert);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View style={styles.centeredView}>
                <View style={styles.container}>
                    <Feather name="trash" size={48} color="#FF6680" />
                    <Text style={styles.modalText}>{text}</Text>
                    
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={styles.denyButton}
                            onPress={() => {
                                selectedOption('deny');
                                showModalToggle();
                            }}
                        >
                            <Text style={styles.denyButtonText}>Não!</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={() => {
                                selectedOption('confirm');
                                showModalToggle();
                            }}
                        >
                            <Text style={styles.confirmButtonText}>Com certeza</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        width: 277,
        height: 242,
        backgroundColor: "#FFF",
        borderRadius: 16,
        paddingVertical: 30,

        justifyContent: "space-between",
        alignItems: "center",
    },
    modalText: {
        width: 152,
        height: 50,

        fontFamily: 'Rubik_400Regular',
        fontSize: 15,
        lineHeight: 25,
        textAlign: "center",
    },
    buttonsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    // Deny button styles
    denyButton: {
        width: 80,
        height: 40,

        justifyContent: "center",
        alignItems: "center",
    },
    denyButtonText: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 15,
        color: "#FF6680",
    },

    // Confirm button styles
    confirmButton: {
        width: 133,
        height: 40,
        backgroundColor: "#FF6680",
        borderRadius: 100,

        justifyContent: "center",
        alignItems: "center",
    },
    confirmButtonText: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 15,
        color: "#FFF",
    }
});