/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Animated,
  Image
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
 
} from 'react-native/Libraries/NewAppScreen';
import { WebView } from 'react-native-webview';
import AnimationBall from './src/components/AnimationBall';
import bg from './assets/bg.png';


const App: () => React$Node = () => {

  const [isLoaded, setLoaded] = useState('flex');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 4000,
      useNativeDriver:false
    }).start();
  };

  useEffect(()=>{
    fadeIn();
  });


  return (
    <>
      <StatusBar barStyle="light-content"  backgroundColor="#353535"/>
      <View style={{width:'100%', height:'100%', backgroundColor:'#000', display:isLoaded, alignItems:'center', justifyContent:'center'}}>
      <Image source={bg} style={{width:"100%", height:'100%'}} />
        
      <AnimationBall/>
      </View>
      <WebView
        source={{
          uri: 'https://www.bsport.com.br'
        }}
        style={{ marginTop: 20 }}
        onLoadEnd={()=>setLoaded('flex')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
