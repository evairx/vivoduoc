import React, { useEffect, useRef } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence, 
  Easing 
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const randomBetween = (min: number, max: number): number => Math.random() * (max - min) + min;

const generateCircles = (minCount: number, maxCount: number) => {
  const count = Math.floor(randomBetween(minCount, maxCount)); 
  const circles = [];
  for (let i = 0; i < count; i++) {
    const size = randomBetween(50, 200);
    const color = Math.random() > 0.5 ? '#012C56' : '#FFB71B';
    circles.push({ size, color });
  }
  return circles;
}

interface BouncingCircleProps {
  size: number;
  color: string;
}

const BouncingCircle: React.FC<BouncingCircleProps> = ({ size, color }) => {
  const x = useSharedValue(randomBetween(0, width - size));
  const y = useSharedValue(randomBetween(0, height - size));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value }
    ] as const
  }));

  const moveCircle = () => {
    const duration = 6000;
    x.value = withRepeat(
      withSequence(
        withTiming(randomBetween(0, width - size), { duration, easing: Easing.inOut(Easing.ease) }),
        withTiming(randomBetween(0, width - size), { duration, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    y.value = withRepeat(
      withSequence(
        withTiming(randomBetween(0, height - size), { duration, easing: Easing.inOut(Easing.ease) }),
        withTiming(randomBetween(0, height - size), { duration, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  };

  useEffect(() => {
    moveCircle();
  }, []);

  return (
    <Animated.View style={[styles.circle, { width: size, height: size, backgroundColor: color }, animatedStyle]} />
  );
};

const Background: React.FC = () => {
  const circles = useRef(generateCircles(3, 5)).current; 
  
  console.log(width, height);

  return (
    <View style={styles.container}>
      {circles.map((circle, index) => (
        <BouncingCircle key={index} size={circle.size} color={circle.color} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -2,
  },
  circle: {
    position: 'absolute',
    borderRadius: 100,
    zIndex: -2,
    opacity: 0.65,
  }
});

export default Background;