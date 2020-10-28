import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Image, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import YoutubePlayer from 'react-native-youtube-iframe';

import logoImg from '../assets/logo.png';

export default function Lesson() {
    const navigation = useNavigation();
    const [like, setLike] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <RectButton
                    style={styles.headerHeartButton}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="arrowleft" size={28} color="#FF6680" />
                </RectButton>

                <Image source={logoImg} />

                <RectButton
                    style={styles.headerHeartButton}
                    onPress={() => setLike(!like)}
                >
                    <AntDesign
                        name={ like ? "heart" : "hearto" }
                        size={22}
                        color="#FF6680"   
                    />
                </RectButton>
            </View>

            <ScrollView style={styles.content}>
                <View
                    style={styles.youtubeContainer}
                >
                    <YoutubePlayer
                        forceAndroidAutoplay={true}
                        height={232}
                        width={Dimensions.get('window').width}
                        videoId={"7k-7dn6vk-w"}
                    />
                </View>
            </ScrollView>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    // Header styles
    headerContainer: {
        width: '100%',
        padding: 24,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerHeartButton: {
        width: 40,
        height: 40,

        alignItems: "center",
        justifyContent: "center",
    },

    // ScrollView styles
    content: {
        width: '100%',
        flex: 1,

        backgroundColor: "#F0EDF5",
    },

    // Youtube styles
    youtubeContainer: {
        height: 221,
        backgroundColor: '#3D3D4C',
    }
});