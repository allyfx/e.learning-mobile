import React from 'react';
import { StyleSheet, View, Image, ImageBackground, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import landingImage from '../assets/landing-image.png';
import eLearning from '../assets/e.learning.png';

export default function Landing() {
    const navigation = useNavigation();

    function handleNavigateToDashboard() {
        navigation.navigate('Dashboard');
    }

    return(
        <ImageBackground source={eLearning} style={{ width: 467, height: 506, flex: 1, alignSelf: "center" }}>
            <View style={styles.container}>
                <Image style={styles.image} source={landingImage} />
                <Text style={styles.title}>Aprenda da melhor forma</Text>
                <Text style={styles.content}>
                    Entre na plataforma e acesse cursos de diversas áreas de conhecimento.
                </Text>
                <RectButton style={styles.button} onPress={handleNavigateToDashboard}>
                    <Text style={styles.buttonText}>Começar os estudos</Text>
                </RectButton>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 60,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
    },
    image: {
        width: 203,
        height: 304,
    },
    title: {
        marginTop: 40,
        fontFamily: 'Rubik_400Regular',
        fontSize: 36,
        color: "#FF6680",
        lineHeight: 43,
        width: 225,
    },
    content: {
        marginTop: 16,
        fontFamily: 'Roboto_400Regular',
        fontSize: 15,
        color: "#EDEBF5",
        lineHeight: 25,
        width: 217,
    },
    button: {
        width: 300,
        height: 56,
        marginTop: 45,
        backgroundColor: '#FF6680',

        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    buttonText: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 15,
        color: '#FFFFFF',
    }
});