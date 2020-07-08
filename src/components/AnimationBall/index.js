import React, { useEffect } from "react";
import { StyleSheet, Image, View, Animated, TouchableWithoutFeedback } from "react-native";
let logo = 'https://images.vexels.com/media/users/3/136532/isolated/preview/93b5c734e3776dd11f18ca2c42c54000-owl-round-icon-by-vexels.png'


export default function AnimationBall() {

    const animation  = new Animated.Value(0),


  startAnimation = () => {
    Animated.timing(animation, {
      toValue: 5040,
      duration: 3000,
    }).start()
  };

    const rotateInterPolate = animation.interpolate({
      inputRange: [0, 360],
      outputRange: ["0deg", "-360deg"],
    })
    const animatedStyles = {
      transform: [{ rotate: rotateInterPolate }],
    };
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={startAnimation}>
          <Animated.View style={[styles.box, animatedStyles]} >
            <Image style={{ width: 150, height: 150 }} source={{ uri: logo }}></Image>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 150,
    height: 150,

  },
});
