import React, { useState } from 'react';
import { Modal, View, ScrollView, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

interface DescriptionDisplayProps {
    toggleShowDescription(): void;
    showDescription?: boolean;
    description?: string;
}

export default function DescriptionDisplay({ showDescription, description, toggleShowDescription }: DescriptionDisplayProps) {
    const [visible, setVisible] = useState(showDescription);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={toggleShowDescription}
        >
            <View
                style={styles.centeredView}
            >
                <View style={styles.container}>
                    <ScrollView style={styles.content}>
                        <Text style={styles.contentText}>{description}</Text>
                    </ScrollView>
                    <MaterialIcons
                        style={styles.contentCloseIcon}
                        name="close"
                        size={24}
                        color="black"
                        onPress={toggleShowDescription}
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    container: {
        width: 277,
        height: 410,
        backgroundColor: "#FFF",
        borderRadius: 16,
        paddingVertical: 5,

        alignItems: 'center',
        justifyContent: 'center',
    },

    content: {
        flex: 1,
    },

    contentText: {
        fontFamily: 'Rubik_400Regular',
        textAlign: 'center',
        fontSize: 17,
        lineHeight: 25,
        color: '#6C6C80',
    },

    contentCloseIcon: {
        width: '100%',
        
        textAlign: 'center',
    }
});