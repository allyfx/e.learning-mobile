import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

import logoImg from '../assets/logo.png';
import playIcon from '../assets/play.png';

interface CourseRouteParams {
    id: string;
}

interface Lesson {
    id: string;
    course_id: string;
    count: number;
    name: string;
    duration: number;
}

export default function Course() {
    const route = useRoute();
    const navigation = useNavigation();
    const [like, setLike] = useState(false);
    const [courseLessons, setCourseLessons] = useState<Lesson[]>();

    const { id } = route.params as CourseRouteParams;

    useEffect(() => {
        api.get(`/lesson/list/${id}`).then(response => {
            setCourseLessons(response.data);
        });
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('SaveCourses').then(response => {
            if (response) {
                let courses = JSON.parse(response);

                const isLiked = courses.indexOf(id) !== -1;
                
                setLike(isLiked);
            }
        });
    }, []);

    async function handleLikeCourse() {
        if (!like) {
            const likedCourses = await AsyncStorage.getItem('SaveCourses');
            let courses = [];

            if(likedCourses) {
                courses = JSON.parse(likedCourses);
            }

            courses.push(id);

            await AsyncStorage.setItem('SaveCourses', JSON.stringify(courses));
        } else if (like) {
            const likedCourses = await AsyncStorage.getItem('SaveCourses');

            if(likedCourses) {
                const courses = JSON.parse(likedCourses);

                const index = courses.indexOf(id);

                courses.splice(index);

                await AsyncStorage.setItem('SaveCourses', JSON.stringify(courses));
            }
        }
    }

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
                    onPress={async () => {
                        setLike(!like)
                        await handleLikeCourse()
                    }}
                >
                    <AntDesign
                        name={ like ? "heart" : "hearto" }
                        size={22}
                        color="#FF6680"   
                    />
                </RectButton>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.contentHeaderContainer}>
                    <Text style={styles.contentHeaderTitle}>Matemática</Text>
                    <Text style={styles.contentHeaderCountCourse}>{courseLessons?.length ? courseLessons.length : 0} aulas</Text>
                </View>

                <View style={styles.lessonsContainer}>
                    {courseLessons?.map(lesson => {
                        return (
                            <TouchableOpacity
                                key={lesson.id}
                                activeOpacity={1}
                                style={styles.lessonButton}
                                onPress={() => { navigation.navigate('Lesson',  { id: lesson.course_id, c: lesson.count }) }}
                            >
                                <View style={styles.playButtonView}>
                                    <Image source={playIcon} />
                                </View>

                                <View style={styles.lessonContent}>
                                    <Text style={styles.lessonContentTitle}>{lesson.name}</Text>

                                    <View style={styles.lessonContentFooter}>
                                        <View style={styles.lessonContentSpecify}>
                                            <Text style={styles.lessonContentSpecifyLessonText}>Aula {lesson.count}</Text>
                                            <View style={styles.lessonContentFooterMinutes}>
                                                <AntDesign name="clockcircleo" size={12} color="#C4C4D1" />
                                                <Text style={styles.lessonContentSpecifyLessonClockText}>{lesson.duration}min</Text>
                                            </View>
                                        </View>
                                        {/* <View style={styles.lessonContentFooterComplete}>
                                            <Text style={styles.lessonContentFooterCompleteText}>Completo!</Text>
                                        </View> */}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
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

        backgroundColor: "#F0EDF5",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 34,
    },

    // Content Header styles
    contentHeaderContainer: {
        marginHorizontal: 24,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    contentHeaderTitle: {
        fontFamily: "Rubik_400Regular",
        fontSize: 22,
        color: "#3D3D4C",
    },
    contentHeaderCountCourse: {
        fontFamily: "Roboto_400Regular",
        fontSize: 15,
        color: "#A0A0B2",
    },

    // Lessons container styles
    lessonsContainer: {
        padding: 24,

        justifyContent: "center",
        alignItems: "flex-end",
    },

    // Lesson button styles
    lessonButton: {
        width: 326,
        height: 100,
        marginBottom: 16,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    playButtonViewComplete: {
        position: "absolute",
        left: -25,
        top: '16%',
        elevation: 1,

        width: 68,
        height: 68,
        backgroundColor: "#61C5BD",
        borderRadius: 16,

        alignItems: "center",
        justifyContent: "center",
    },
    playButtonView: {
        position: "absolute",
        left: -25,
        top: '16%',
        elevation: 1,

        width: 68,
        height: 68,
        backgroundColor: "#FF6680",
        borderRadius: 16,

        alignItems: "center",
        justifyContent: "center",
    },
    lessonContent: {
        width: 310,
        height: 100,
        backgroundColor: "#FFF",
        borderRadius: 16,
        paddingLeft: 56,

        alignItems: "flex-start",
        justifyContent: "center",
    },
    lessonContentTitle: {
        width: 133,
        height: 40,

        fontFamily: 'Rubik_400Regular',
        fontSize: 15,
        lineHeight: 20,
        color: '#6C6C80',
    },
    lessonContentFooter: {
        width: '100%',
        paddingRight: 16,
        marginTop: 14,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
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
        fontSize: 12,
        color: "#C4C4D1",
    },
    lessonContentSpecifyLessonClockText: {
        marginLeft: 5,

        fontFamily: 'Roboto_400Regular',
        fontSize: 12,
        color: "#C4C4D1",
    },
    lessonContentFooterComplete: {
        width: 75,
        height: 18,
        borderRadius: 12,
        backgroundColor: "#61C5BD",

        alignItems: 'center',
        justifyContent: 'center',
    },
    lessonContentFooterCompleteText: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 12,
        color: '#FFF',
    }
});