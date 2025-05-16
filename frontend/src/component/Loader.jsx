import React, {useEffect, useRef} from 'react';
import {View, Animated, StyleSheet} from 'react-native';

const Loader = () => {
  const scaleY1 = useRef(new Animated.Value(1)).current;
  const scaleY2 = useRef(new Animated.Value(1)).current;
  const scaleY3 = useRef(new Animated.Value(1)).current;

  const animateBar = (animatedValue, delay) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 2,
          duration: 300,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  useEffect(() => {
    animateBar(scaleY1, 0);
    animateBar(scaleY2, 150);
    animateBar(scaleY3, 300);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bar, {transform: [{scaleY: scaleY1}]}]} />
      <Animated.View style={[styles.bar, {transform: [{scaleY: scaleY2}]}]} />
      <Animated.View style={[styles.bar, {transform: [{scaleY: scaleY3}]}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  bar: {
    width: 10,
    height: 40,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    borderRadius: 2,
  },
});

export default Loader;
