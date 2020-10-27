import React, { useState } from 'react';
import { StyleSheet ,View, Text, TouchableOpacity, Dimensions } from 'react-native';

import { Feather } from '@expo/vector-icons';

export default function Dashboard() {
    const [selected, setSelected] = useState<'home' | 'saves'>('home');

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text>Hello World!</Text>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    style={
                        selected === 'home'
                            ? styles.buttonButtonSelected
                            : styles.buttonButton
                    }
                >
                    <Feather
                        style={
                            selected === 'home'
                            ? styles.buttonIconSelected
                            : styles.buttonIcon
                        }
                        name="home"
                        size={21}
                    />
                    <Text
                        style={
                            selected === 'home'
                            ? styles.buttonTextSelected
                            : styles.buttonText
                        }
                    >
                        Home
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={
                        selected === 'saves'
                            ? styles.buttonButtonSelected
                            : styles.buttonButton
                    }
                >
                    <Feather
                        style={
                            selected === 'saves'
                            ? styles.buttonIconSelected
                            : styles.buttonIcon
                        }
                        name="heart"
                        size={21}
                    />
                    <Text
                        style={
                            selected === 'saves'
                            ? styles.buttonTextSelected
                            : styles.buttonText
                        }
                    >
                        Salvos
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        alignSelf: "flex-end",
        width: Dimensions.get('window').width,
        height: 73,
        backgroundColor: '#FFF',
    },
    buttonButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 187,
        height: 78,
    },
    buttonButtonSelected: {
        borderTopWidth: 2,
        borderTopColor: "#FF6680",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 187,
        height: 78,
    },
    buttonText: {
        color: "#C4C4D1",
        marginLeft: 14,
        fontSize: 18,
        fontFamily: 'Roboto_500Medium',
    },
    buttonIcon: {
        color: "#C4C4D1",
    },
    buttonTextSelected: {
        color: "#FF6680",
        marginLeft: 14,
        fontSize: 18,
        fontFamily: 'Roboto_500Medium',
    },
    buttonIconSelected: {
        color: "#FF6680",
    }
});