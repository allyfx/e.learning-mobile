import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../services/api';

import YoutubePlayer from 'react-native-youtube-iframe';
import DescriptionDisplay from '../components/DescriptionDisplay';

import logoImg from '../assets/logo.png';

interface RouteParams {
    id: string;
    c: number;
}

interface Lesson {
    id: string;
    count: number;
    name: string;
    duration: number;
    description: string;
    video_id: string;
}

export default function Lesson() {
    const route = useRoute();
    let { id, c } = route.params as RouteParams;

    const navigation = useNavigation();
    const [like, setLike] = useState(false);
    const [lesson, setLesson] = useState<Lesson>();
    const [count, setCount] = useState(c);
    const [canGoBack, setCanGoBack] = useState(true);
    const [canGoNext, setCanGoNext] = useState(true);
    const [showDescription, setShowDescription] = useState(false);

    function toggleShowDescription() {
        setShowDescription(!showDescription);
    }


    useEffect(() => {
        api.get(`/lesson/list/${id}`).then(response => {
            const resLesson = response.data.filter((l: Lesson) => l.count === count);

            const goBackLesson = response.data.filter((l: Lesson) => l.count === count - 1);
            const canGoNextLesson = response.data.filter((l: Lesson) => l.count === count + 1);

            setCanGoBack(goBackLesson.length === 0);
            setCanGoNext(canGoNextLesson.length === 0);

            setLesson(resLesson[0]);
        });
    }, [count]);

    return (
        <View style={styles.container}>
            {showDescription && (
                <DescriptionDisplay
                    toggleShowDescription={toggleShowDescription}
                    description={lesson?.description}
                    showDescription={showDescription}
                />
            )}
            
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
                        videoId={lesson?.video_id ? lesson.video_id : ''}
                    />
                </View>

                <View style={styles.lessonContent}>
                    <Text style={styles.lessonContentTitle}>{lesson?.name}</Text>

                    <View style={styles.lessonContentSpecify}>
                        <Text style={styles.lessonContentSpecifyLessonText}>Aula {lesson?.count}</Text>
                        <View style={styles.lessonContentFooterMinutes}>
                            <AntDesign name="clockcircleo" size={12} color="#C4C4D1" />
                            <Text style={styles.lessonContentSpecifyLessonClockText}>{lesson?.duration}min</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={toggleShowDescription}
                    >
                        <Text style={styles.lessonContentDescription}>
                            {lesson?.description}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            disabled={canGoBack}
                            style={!canGoBack ? styles.goBackButton : styles.goBackButtonDisabled}
                            onPress={() => {
                                setCount(count - 1);
                            }}
                        >
                            <AntDesign name="arrowleft" size={20} color="#FF6680" />
                            <Text style={styles.goBackButtonText}>Aula anterior</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            disabled={canGoNext}
                            style={!canGoNext ? styles.nextButton : styles.nextButtonDisabled}
                            onPress={() => {
                                setCount(count + 1);
                            }}
                        >
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
        flexDirection: 'column',
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
        height: 230,
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
    nextButtonDisabled: {
        opacity: 0.2,
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
    goBackButtonDisabled: {
        opacity: 0.2,
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