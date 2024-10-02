export const getUser = async (token:string): Promise<any> => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_INFOPERSONA}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Error al obtener el usuario');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
};