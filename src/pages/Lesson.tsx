import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
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

                <View style={styles.lessonContent}>
                    <Text style={styles.lessonContentTitle}>Introdução à teoria matemática</Text>

                    <View style={styles.lessonContentSpecify}>
                        <Text style={styles.lessonContentSpecifyLessonText}>Aula 01</Text>
                        <View style={styles.lessonContentFooterMinutes}>
                            <AntDesign name="clockcircleo" size={12} color="#C4C4D1" />
                            <Text style={styles.lessonContentSpecifyLessonClockText}>5min</Text>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.lessonContentDescription}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus condimentum gravida Aenean condimentum vehicula sapien, eleifend metus congue vel.
                        </Text>
                    </View>

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.goBackButton}>
                            <AntDesign name="arrowleft" size={20} color="#FF6680" />
                            <Text style={styles.goBackButtonText}>Aula anterior</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.nextButton}>
                            <Text style={styles.nextButtonText}>Próxima aula</Text>
                            <AntDesign name="arrowright" size={20} color="#FFF" />
                        </TouchableOpacity>
                    </View>
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
    },

    // Lesson content styles
    lessonContent: {
        padding: 24,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    lessonContentTitle: {
        fontFamily: 'Rubik_400Regular',
        fontSize: 30,
        width: 265,
        lineHeight: 35,
        color: '#3D3D4C',
        marginBottom: 16,
    },
    lessonContentDescription: {
        fontFamily: 'Rubik_400Regular',
        fontSize: 15,
        width: 265,
        lineHeight: 25,
        color: '#6C6C80',
        marginTop: 25,
    },

    // Specify styles
    lessonContentSpecify: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lessonContentFooterMinutes: {
        marginLeft: 17,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lessonContentSpecifyLessonText: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 14,
        color: "#C4C4D1",
    },
    lessonContentSpecifyLessonClockText: {
        marginLeft: 5,

        fontFamily: 'Roboto_400Regular',
        fontSize: 14,
        color: "#C4C4D1",
    },

    // Buttons styles
    buttonsContainer: {
        marginTop: 100,
        width: '100%',

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextButton: {
        width: 163,
        height: 53,

        backgroundColor: '#FF6680',
        borderRadius: 40,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextButtonText: {
        color: '#FFF',
        fontFamily: 'Roboto_400Regular',
        fontSize: 15,
        marginRight: 8
    },
    goBackButton: {
        width: 163,
        height: 53,

        borderRadius: 40,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    goBackButtonText: {
        color: '#FF6680',
        fontFamily: 'Roboto_400Regular',
        fontSize: 15,
        marginLeft: 8
    },
});