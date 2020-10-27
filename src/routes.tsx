import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#6548A3' } }}>
                <Screen name="Landing" component={Landing} />
                <Screen name="Dashboard" component={Dashboard} />
            </Navigator>
        </NavigationContainer>
    );
}