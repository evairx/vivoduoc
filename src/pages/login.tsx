import React, { useEffect,useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useMediaStyles from '@/hook/useMedia';
import { useNavigation } from '@react-navigation/native';
import { Pressable, ScrollView, View, TextInput, Image, Text, ActivityIndicator } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, interpolate, Extrapolate, withTiming } from 'react-native-reanimated';

import Background from '@/icons/background';
import Waves from '@/icons/waves'
import EmailIcon from '@/icons/email';
import PasswordIco from '@/icons/password';
import ViewIcon from '@/icons/view';
import View2Icon from '@/icons/view2';

interface INavigationProps {
  reset: (props: { index: number; routes: { name: string }[] }) => void;
  navigate: (name: string) => void;
}

export default function Login() {  
  const [username, setUsername] = useState<string>('');
  const [usernameFocused, setUsernameFocused] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false);
  const [isViewPass, setIsViewPass] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const styles  = useMediaStyles(stylesContent);

  const scale = useSharedValue(0.5);
  const translateY = useSharedValue(-100);
  const translateYFade = useSharedValue(-20);
  const opacity = useSharedValue(0);
  const opacityFade = useSharedValue(0);

  const navigation = useNavigation<INavigationProps>();

  useEffect(() => {
    scale.value = withSpring(1);
    translateY.value = withSpring(0, { damping: 10, stiffness: 100 });
    translateYFade.value = withTiming(0, { duration: 1000 });
    opacity.value = withSpring(1, { damping: 10, stiffness: 100 });
    opacityFade.value = withTiming(1, { duration: 1000 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const animatedFade = useAnimatedStyle(() => {
    return {
      opacity: interpolate(opacityFade.value, [0, 1], [0, 1], Extrapolate.CLAMP),
      transform: [{ translateY: translateYFade.value }],
    };
  });

  const animatedTopStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: interpolate(opacity.value, [0, 1], [0, 1], Extrapolate.CLAMP),
    };
  });

  const handleViewPass = () => {
    setIsViewPass(!isViewPass);
  };

  const postData = async () => {
    setLoading(true);
    const data = {
      mail: username,
      pass: password,
    }

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await response.json();
      setLoading(false);

      if (response.status === 200) {
        await AsyncStorage.setItem('_duoc_session', json._duoc_session || '');
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
      } else if (response.status === 400 && json.message) {
        setErrorMessage(json.message);
      } else if (json.error) {
        setErrorMessage('Error desconocido');
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage('Error de conexión');
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Waves />
      <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>
        <View style={styles.logoVivoDuoc}>
          <Animated.View style={[animatedStyle]}>
            <Image 
              source={require('../../assets/vivoduoc.png')}
              style={styles.logo}
            />
          </Animated.View>
        </View>
        <View>
          <Animated.Text style={[usernameFocused || username ? styles.inputTextSelected : styles.inputText, animatedFade]}>
            Correo
          </Animated.Text>
          <Animated.View style={[styles.inputContainer, animatedFade]}>
            <TextInput 
              style={usernameFocused || username ? styles.inputSelected : styles.input}
              onChangeText={(text) => setUsername(text)}
              value={username}
              onFocus={() => setUsernameFocused(true)}
              onBlur={() => setUsernameFocused(false)}
            />
            <View style={styles.Icon}>
              <EmailIcon widthIcon={22} heightIcon={22} iconColor={`${usernameFocused || username ? "#012C56": "#535353d3"}`} />
            </View>
          </Animated.View>

          <Animated.Text style={[passwordFocused || password ? styles.inputTextSelected : styles.inputText, animatedFade]}>
            Contraseña
          </Animated.Text>
          <Animated.View style={[styles.inputContainer, animatedFade]}>
            <TextInput
              style={passwordFocused || password ? styles.inputPassSelected : styles.inputPass}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={isViewPass ? false : true}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            <View style={styles.Icon}>
              <PasswordIco iconColor={`${passwordFocused || password ? "#012C56":"#535353d3"}`} />
            </View>
            {password.length >= 1 && (
              <Pressable style={({pressed}) => [styles.IconView, { opacity: pressed ? 0.5 : 1 }]} onPress={handleViewPass}>
                {isViewPass ? 
                  <View2Icon iconColor={`${passwordFocused || password ? "#012C56":"white"}`} />
                  :
                  <ViewIcon iconColor={`${passwordFocused || password ? "#012C56":"white"}`} />
                }
              </Pressable>
            )}
          </Animated.View>
          {errorMessage && (
            <View>
              <Text style={styles.errorText}>
                {errorMessage}
              </Text>
            </View>
          )}
          <Animated.View style={[animatedTopStyle]}>
            <Pressable 
              style={({ pressed }) => [
                !username || !password ? styles.loginDisabled : styles.loginBtn, 
                { opacity: loading ? 1 : (pressed ? 0.5 : 1) }
              ]}
              onPress={loading ? null: postData} 
              disabled={!username || !password}
            >
              {loading ? (
                <Text style={styles.loginText}>
                  <ActivityIndicator size="small" color="black" />
                </Text>
              ) : (
                <>
                  <View style={styles.loginIcon}></View>
                  <Text style={!username || !password ? styles.loginTextDisabled : styles.loginText}>
                    Iniciar Sesión
                  </Text>
                </>
              )}
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>
      <Background />
    </View>
  );
}

const stylesContent = {
  container: {
    height: '100%',
    backgroundColor: '#eee',
  },
  logoVivoDuoc: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50
  },
  logo: {
    width: 195,
    height: 37,
  },
  inputTextSelected: {
    color: '#012C56',
    fontSize: 18,
    marginTop: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  input: {
    width: 300,
    height: 40,
    backgroundColor: '#53535321',
    paddingLeft: 40,
    borderRadius: 6,
    borderColor: '#535353d3',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  inputSelected: {
    width: 300,
    height: 40,
    backgroundColor: '#0872db3b',
    paddingLeft: 45,
    borderRadius: 6,
    borderColor: '#012C56',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#012C56',
  },
  inputPass: {
    width: 300,
    height: 40,
    backgroundColor: '#53535321',
    paddingLeft: 40,
    paddingRight: 45,
    borderRadius: 6,
    borderColor: '#535353d3',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  inputPassSelected: {
    width: 300,
    height: 40,
    backgroundColor: '#0872db3b',
    paddingLeft: 45,
    paddingRight: 45,
    borderRadius: 6,
    borderColor: '#012C56',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#012C56',
  },
  Icon: {
    position: 'absolute',
    left: 15,
    top: 10,
    opacity: .8,
  },
  IconView: {
    position: 'absolute',
    right: 8,
    top: 0,
    opacity: .8,
    height: '100%',
    width: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 300,
    height: 40,
    backgroundColor: 'rgb(252, 188, 27)',
    borderColor: 'rgb(252, 189, 27)',
    borderWidth: 2,
    borderRadius: 7,
    marginTop: 25,
    position: 'relative',
  },
  loginDisabled: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 300,
    height: 40,
    borderColor: '#53535321',
    borderWidth: 2,
    borderRadius: 7,
    marginTop: 25,
    opacity: .7,
  },
  loginText: {
    color: '#000',
    fontSize: 19,
    fontWeight: 'bold',
  },
  loginTextDisabled: {
    color: '#4e4e4ed3',
    fontSize: 19,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ff2f2f',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
    width: 300,
  }
};