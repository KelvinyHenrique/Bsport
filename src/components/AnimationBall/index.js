import React, { useEffect, useRef } from "react";
import { StyleSheet, Image, View, Animated, TouchableWithoutFeedback, Easing } from "react-native";
import logo from '../../../assets/ball.png';

export default function AnimationBall() {

    const animation = new Animated.Value(0)
    const marginBotton = useRef(new Animated.Value(100)).current;

    const pulling = () => {
            Animated.timing(marginBotton, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: false,
                easing: Easing.bounce,
            }).start();

    };

    const startAnimation = () => {
        Animated.loop(
            Animated.timing(animation, {
                toValue: 5040,
                duration: 6000,
                useNativeDriver: false,
                easing: Easing.linear,
            }),
        ).start()
    };

    const rotateInterPolate = animation.interpolate({
        inputRange: [0, 360],
        outputRange: [ "-360deg","0deg"],
    })
    const animatedStyles = {
        transform: [{ rotate: rotateInterPolate }],
    };

    const pullingEffect = {
        paddingBottom: marginBotton
    };


    useEffect(() => {
        pulling();
        startAnimation();
    }, []);
    return (
        <Animated.View style={[styles.container, pullingEffect]}>
            <Animated.View style={[styles.box, animatedStyles]}>
                <Image style={{ width: 40, height: 40 }} source={logo}></Image>
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position:'absolute',
        alignItems: "center",
        justifyContent: "center",
        paddingTop:150,
        alignSelf:'center',

    },
    box: {
        width: 40,
        height: 40,

    },
});
