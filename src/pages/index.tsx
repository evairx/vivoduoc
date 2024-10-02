import { createStackNavigator } from '@react-navigation/stack';
import React, { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import Login from '@/pages/login';
import Home from '@/pages/home';
import Certificates from './certificates';

type RootStackNavigatorProps = {
    Login: undefined;
    Home: undefined;
    Certificates: undefined;
};

const Stack = createStackNavigator<RootStackNavigatorProps>();

export default function Pages() {
    const [initialRoute, setInitialRoute] = useState<any>('Login');
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            const getToken = async () => {
                const token = await AsyncStorage.getItem('_duoc_session');

                if (token) {
                    setInitialRoute('Certificates');
                }

                setLoading(false);
            }

            getToken();
        }, [])
    )
    
    if (loading) {
        return null;
    }

    return (
        <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#fff',
                },
            }}
        >
            <Stack.Screen name="Login" component={Login} options={{ animationEnabled: true }} />
            <Stack.Screen name="Home" component={Home} options={{ animationEnabled: false }} />
            <Stack.Screen name="Certificates" component={Certificates} options={{ animationEnabled: false }} />
        </Stack.Navigator>
    );
}
