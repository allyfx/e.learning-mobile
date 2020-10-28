import React, { useState } from 'react';
import { StyleSheet ,View, Text, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import Category from './contents/Category';
import Saves from './contents/Saves';

import logoImg from '../assets/logo.png';

export default function Dashboard() {
    const navigation = useNavigation();
    const [selected, setSelected] = useState<'home' | 'saves'>('home');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image style={styles.headerImage} source={logoImg} />
                    <Feather
                        name="power"
                        size={24}
                        color="#FF6680"
                        onPress={() => {navigation.navigate('Landing')}}
                    />
                </View>
                
                <RectButton style={styles.headerSearchButton}>
                    <Feather name="search" size={20} color="#C4C4D1"/>
                    <TextInput style={styles.headerSeachText} placeholder="Buscar" />
                </RectButton>
            </View>
            
            <View style={styles.content}>
                {selected === 'home' ? (
                    <Category />
                ) : (
                    <Saves />
                )}
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={
                        selected === 'home'
                            ? styles.buttonButtonSelected
                            : styles.buttonButton
                    }
                    onPress={() => {setSelected('home')}}
                    activeOpacity={1}
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
                    onPress={() => {setSelected('saves')}}
                    activeOpacity={1}
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
    // General styles
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },

    // Header styles
    header: {
        width: Dimensions.get("window").width,
        height: 150,
        padding: 24,
    },
    headerImage: {
        height: 24,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerSearchButton: {
        width: 330,
        height: 56,
        borderRadius: 100,
        backgroundColor: "#FFF",
        padding: 20,
        marginTop: 20,

        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerSeachText: {
        width: 330,
        height: 56,
        fontFamily: 'Roboto_400Regular',
        fontSize: 15,
        marginLeft: 20,
    },

    // Footer Styles
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