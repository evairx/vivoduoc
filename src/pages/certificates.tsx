import { View, Text, FlatList, Pressable, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import useMediaStyles from '@/hook/useMedia';
import { useEffect, useState } from 'react';
import useToken from '@/hook/useToken';
import { getUser } from '@/api/getUser';
import { useDownload } from '@/hook/useDownload';

import PDFIcon from '@/icons/pdf';
import DownloadIco from '@/icons/downloadIco';
import BackIcon from '@/icons/back';

export default function Certificates() {
  const { state, token } = useToken();
  const [loadingg, setLoadingg] = useState<boolean>(true);
  const [rut, setRut] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const [data, setData] = useState<any[]>([]);
  const { download } = useDownload();

  const styles = useMediaStyles(stylesContent);

  useEffect(() => {
    if (state) {
      getData();
    }
  }, [state, token]);

  async function getData() {
    try {
      const user = await getUser(token);
      const rut = user.InfoPersona.rut;
      setRut(rut);

      const { nombre, apellido_pat } = user?.InfoPersona || {};
      const formattedName = nombre && apellido_pat 
          ? `${nombre.slice(0, 3).toLowerCase()}.${apellido_pat.toLowerCase()}`
          : "Nombre no disponible";
      setUser(formattedName);

      const res = await fetch(`${process.env.EXPO_PUBLIC_GETCERITIFACOS}=${rut}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        console.log('error:', res.status);
      }
      const data = await res.json();
      setData(data);
      setLoadingg(false);
    } catch (e) {
      console.log(e);
    }
  }

  const [loadingStates, setLoadingStates] = useState({});

  const handleDownload = async (item) => {
    setLoadingStates(prev => ({ ...prev, [item.idPlantilla]: true }));

    try {
      await download(`${process.env.EXPO_PUBLIC_API_URL}/getPdf?idCertificado=${item.idPlantilla}&planId=${data[0].planEstudioId}&rutAlumno=${rut}&usuario=${user}&token=${token}`, `${item.descPlantilla}.pdf`);
    } finally {
      setLoadingStates(prev => ({ ...prev, [item.idPlantilla]: false }));
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loadingg ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <View style={styles.container}>
          <View style={{marginLeft: -15}}>
            <BackIcon /> 
          </View>
          <Text style={styles.titlePage}>Certificados</Text>
          <FlatList
            data={data[0]?.certificados || []}
            keyExtractor={(item) => item.idPlantilla.toString()}
            renderItem={({ item }) => (
              <View style={styles.Content}>
                <View style={styles.header}>
                  <View style={styles.circleIcon}>
                    <PDFIcon />
                  </View>
                  <Text style={styles.title}>{item.descPlantilla}</Text>
                </View>
                <View style={styles.border} />
                <View style={styles.bottom}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.btnDownload, {
                        opacity: pressed ? 0.5 : 1,
                        backgroundColor: loadingStates[item.idPlantilla] ? '#FFB71B' : pressed ? '#FFB71B' : '#012C56'
                      }
                    ]}
                    onPress={() => handleDownload(item)}
                  >
                  {({ pressed }) => (
                    <>
                      {loadingStates[item.idPlantilla] ? (
                        <ActivityIndicator color="#000" />
                      ) : (
                        <>
                          <DownloadIco iconColor={`${pressed ? '#000' : '#fff'}`} />
                          <Text style={[styles.btnText, { color: pressed ? '#000' : '#fff' }]}>Descargar</Text>
                        </>
                      )}
                    </>
                  )}
                  
                  </Pressable>
                </View>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const stylesContent = {
  container: {
    marginTop: Constants.statusBarHeight + 10,
    padding: 15,
  },
  titlePage: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  Content: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 7,
    padding: 15,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  circleIcon: {
    width: 50,
    height: 49,
    borderRadius: 100,
    backgroundColor: '#012C56',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 19,
    fontWeight: '600',
    width: 280,
    color: '#012C56'
  },
  border: {
    marginTop: 15,
    borderBottomWidth: 3,
    borderBottomColor: '#D9D9D9',
  },
  bottom: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10
  },
  btnDownload: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    padding: 8,
    width: 150,
    borderRadius: 8,
    marginTop: 10,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
  },
}