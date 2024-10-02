import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const refreshToken = async (): Promise<string | null> => {
  try {
    const storedToken = await AsyncStorage.getItem('_duoc_session');
    let token = await AsyncStorage.getItem('token');
    const expire = await AsyncStorage.getItem('expire');
    const currentTime = new Date();

    if (!token || (expire && new Date(expire) <= currentTime)) {
      if (!token) {
        console.log('Token not found, redirecting to login...');
      } else {
        console.log('Token expired, refreshing...');
      }

      const getToken = async (): Promise<string | null> => {
        try {
          const url = `${process.env.EXPO_PUBLIC_API_URL}/refresh`;

          if (!url) {
            throw new Error("API_URL is not defined or invalid");
          }

          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${storedToken}`,
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();

          if (!data || !data.token) {
            throw new Error('Invalid token response from the API');
          }

          await AsyncStorage.setItem('token', data.token);
          await AsyncStorage.setItem('expire', data.expire);

          return data.token;
        } catch (e) {
          console.error('Error fetching token:', e.message);
          return null;
        }
      };

      token = await getToken();
    }

    return token || null;
  } catch (e) {
    console.error('Error in refreshToken:', e.message);
    return null;
  }
};

const useToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [state, setState] = useState<boolean>(false);

  const checkToken = async () => {
    const storedToken = await refreshToken();

    if (storedToken) {
      setToken(storedToken);
      setState(true);
    } else {
      setToken(null);
      setState(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return { state, token };
};

export default useToken;