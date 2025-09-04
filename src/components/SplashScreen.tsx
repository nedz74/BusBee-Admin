import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    // Set a timer for 3 seconds
    const timer = setTimeout(() => {
      setAnimationFinished(true);
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animations/Bus_carga_trackMile.json')}
        autoPlay
        loop
        speed={2.5}
        style={styles.animation}
        onAnimationFinish={() => {
          // Optional: Handle animation finish if needed
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007AFF', // Match your app's primary color
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: width * 0.8, // 80% of screen width
    height: height * 0.6, // 60% of screen height
  },
});
