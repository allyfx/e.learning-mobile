import React from 'react';
import { StyleSheet ,View, Text } from 'react-native';

import DashboardFooter from '../components/DashboardFooter';

export default function Dashboard() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text>Hello World!</Text>
            </View>
            <DashboardFooter />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    }
});