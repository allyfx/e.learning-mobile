import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

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

    useEffect(() => {
        api.get('/course/list').then(response => {
            setCourses(response.data);
        });
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Categorias</Text>
                <Text style={styles.headerCountCourse}>{courses?.length} cursos</Text>
            </View>

            <View style={styles.courseContainer}>
                {courses?.map(course => {
                    return (
                        <RectButton
                            key={course.id}
                            style={styles.courseButton}
                            onPress={() => navigation.navigate('Course', { id: course.id, name: course.name })}
                        >
                            <Image style={styles.courseImage} source={mathIcon} />
                            <Text style={styles.courseTitle}>{course.name}</Text>
                            <Text style={styles.courseCountLessons}>{course.lessons ? course.lessons : 0} aulas</Text>
                        </RectButton>
                    );
                })}
            </View>
        </ScrollView>
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
    headerCountCourse: {
        fontFamily: "Roboto_400Regular",
        fontSize: 15,
        color: "#A0A0B2",
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