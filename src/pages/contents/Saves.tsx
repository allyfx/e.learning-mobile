import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

import DeleteAlert from '../../components/DeleteAlert';

import mathIcon from '../../assets/mathIcon.png';

interface Course {
    id: string;
    name: string;
    image: string;
    lessons?: number;
}

export default function Category() {
    const navigation = useNavigation();
    const [courses, setCourses] = useState<Course[]>();
    const [showModal, setShowModal] = useState(false);
    const [deleteCourseId, setDeleteCourseId] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('SaveCourses').then(response => {
            if(response) {
                const likedCourses = JSON.parse(response);
                const setLikedCourses: Course[] = [];

                api.get('/course/list').then(response => {
                    response.data.map((course: Course) => {
                        if(likedCourses.indexOf(course.id) !== -1) {
                            setLikedCourses.push(course);
                        }
                    });

                    setCourses(setLikedCourses);
                });
            }
        });
    }, [deleteCourseId]);

    const selectedOption = async (data: 'deny' | 'confirm', id: string) => {
        if (data === 'confirm') {
            const likedCourses = await AsyncStorage.getItem('SaveCourses');

            if(likedCourses) {
                const liked = JSON.parse(likedCourses);

                const index = liked.indexOf(id);

                liked.splice(index);


                await AsyncStorage.setItem('SaveCourses', JSON.stringify(liked));
            }

            setDeleteCourseId('');
        }
    }

    const showModalToggle = () => {
        setShowModal(!showModal);
    }

    return (
        <>
            {showModal && (
                <DeleteAlert
                    courseId={deleteCourseId}
                    showAlert={showModal}
                    text="Quer excluir suas aulas de Matemática?"
                    selectedOption={selectedOption}
                    showModalToggle={showModalToggle}
                />
            )}

            <ScrollView style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Cursos salvos</Text>
                </View>

                <View style={styles.courseContainer}>
                    {courses?.map(course => {
                        return (
                            <RectButton
                                key={course.id}
                                style={styles.courseButton}
                                onPress={() => navigation.navigate('Course')}
                            >
                                <RectButton
                                    style={{
                                        width: 50,
                                        height: 50,
                                        position: "absolute",
                                        right: 2,
                                        top: 5,

                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                    onPress={() => {
                                        showModalToggle();
                                        setDeleteCourseId(course.id);
                                    }}
                                >
                                    <Feather
                                        name="trash"
                                        color="#C4C4D1"
                                        size={22}
                                    />
                                </RectButton>
                                <Image style={styles.courseImage} source={mathIcon} />
                                <Text style={styles.courseTitle}>{course.name}</Text>
                                <Text style={styles.courseCountLessons}>{course.lessons ? course.lessons : 0} aulas</Text>
                            </RectButton>
                        );
                    })}
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0EDF5',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
    },

    // Header styles
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerTitle: {
        fontFamily: "Rubik_400Regular",
        fontSize: 22,
        color: "#3D3D4C",
    },

    // Course styles
    courseContainer: {
        flexDirection: "row",
        flexWrap: "wrap",

        marginTop: 14,
        marginBottom: 20,
        padding: 10,

        alignItems: "center",
        justifyContent: "space-between",
    },
    courseButton: {
        width: 156,
        height: 172,
        backgroundColor: "#FFF",
        borderRadius: 16,
        marginBottom: 18,

        paddingLeft: 25,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    courseImage: {
        width: 64,
        height: 64,
        marginBottom: 24,
    },
    courseTitle: {
        fontFamily: "Rubik_400Regular",
        fontSize: 18,
        color: "#6C6C80",
    },
    courseCountLessons: {
        fontFamily: "Roboto_400Regular",
        fontSize: 12,
        color: "#C4C4D1",
    }
});