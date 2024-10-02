import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet as RNStyleSheet } from 'react-native';

const useMediaStyles = (baseStyles: any) => {
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const handleChange = ({ window }) => {
      setWindowWidth(window.width);
    };

    const subscription = Dimensions.addEventListener('change', handleChange);
    
    return () => {
      subscription?.remove();
    };
  }, []);

  const getResponsiveStyles = () => {
    const styles = { ...baseStyles };

    Object.keys(baseStyles).forEach((key) => {
      const value = baseStyles[key];

      if (typeof value === 'object' && !Array.isArray(value) && !isNaN(Number(key))) {
        const breakpoint = parseInt(key, 10);
        if (windowWidth <= breakpoint) {
          Object.assign(styles, value);
        }
      }
    });

    return RNStyleSheet.create(styles);
  };

  return getResponsiveStyles();
};

export default useMediaStyles;
