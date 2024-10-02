import { useState } from 'react';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const { StorageAccessFramework } = FileSystem;

export const useDownload = () => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const downloadPath = FileSystem.documentDirectory;

  const ensureDirAsync = async (dir, intermediates = true) => {
    const props = await FileSystem.getInfoAsync(dir);
    if (props.exists && props.isDirectory) {
      return props;
    }
    await FileSystem.makeDirectoryAsync(dir, { intermediates });
    return await ensureDirAsync(dir, intermediates);
  };

  const downloadCallback = (downloadProgress) => {
    const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
    setDownloadProgress(progress);
  };

  const fileExists = async (fileUri) => {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    return fileInfo.exists;
  };

  const deleteFile = async (fileUri) => {
    try {
      await FileSystem.deleteAsync(fileUri);
      console.log(`Archivo eliminado: ${fileUri}`);
    } catch (error) {
      console.error('Error al eliminar el archivo:', error);
    }
  };

  const download = async (fileUrl, title) => {
    const fileName = title || fileUrl.split('/').pop();
    const fileUri = downloadPath + fileName;

    const exists = await fileExists(fileUri);
    if (exists) {
      console.log('El archivo ya existe, eliminando...');
      await deleteFile(fileUri);
    }

    if (Platform.OS === 'android') {
      await ensureDirAsync(downloadPath);
    }

    const downloadResumable = FileSystem.createDownloadResumable(
      fileUrl,
      fileUri,
      {},
      downloadCallback
    );

    try {
      const { uri } = await downloadResumable.downloadAsync();
      if (Platform.OS === 'android') {
        await saveAndroidFile(uri, fileName);
      } else {
        await saveIosFile(uri);
      }
    } catch (e) {
      console.error('Error al descargar el archivo:', e);
    }
  };

  const saveAndroidFile = async (fileUri, fileName) => {
    try {
      const fileString = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
      const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        return;
      }

      try {
        await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, 'application/pdf')
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, fileString, { encoding: FileSystem.EncodingType.Base64 });
            console.log('Archivo PDF descargado exitosamente');
          })
          .catch((e) => {
            console.error('Error al crear el archivo en Android:', e);
          });
      } catch (e) {
        throw new Error(e);
      }

    } catch (err) {
      console.error('Error al guardar el archivo en Android:', err);
    }
  };

  const saveIosFile = async (fileUri) => {
    try {
      await Sharing.shareAsync(fileUri);
    } catch (e) {
      console.error('Error al guardar el archivo en iOS:', e);
    }
  };

  return { download, downloadProgress };
};
