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
  Image,
  TouchableOpacity,
  Text
} from 'react-native';

import { WebView } from 'react-native-webview';
import AnimationBall from './src/components/AnimationBall';
import AnimationBallIndicator from './src/components/AnimationBallIndicator';
import bg from './assets/bg.png';
import Logo from './assets/logo.svg';
import Cart from './assets/cart.svg';
import Back from './assets/back.svg';
import Next from './assets/next.svg';


const App: () => React$Node = ({navigate}) => {

  const [isLoaded, setLoaded] = useState('flex');
  const [isLoading, setLoading] = useState(false);
  const [loadFirst, setLoadFirst] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const webviewRef = useRef(null)
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('');
  const [showTabBar, setShowTabBar] = useState(false);
  const [webUrl, setWebUrl]= useState('https://www.bsport.com.br/');

  

  const fadeIn = () => {

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: false
    }).start();
  };

  useEffect(() => {
    fadeIn();
  });

  const handleEndLoading = () => {
    setLoading(false);
    setLoaded('none');
    if(loadFirst == true){
    setLoadFirst(false);
    setShowTabBar(true);
    }
   
  }

  const handleStartLoad = () => {
    if (loadFirst == false) {
      setLoading(true)
    }
  }

  const handleGoCart = () =>{
    if (webviewRef.current) webviewRef.current.setCurrentUrl('https://www.bsport.com.br/checkout/cart/');
  }




  const backButtonHandler = () => {
    if (webviewRef.current) webviewRef.current.goBack()
  }

  const frontButtonHandler = () => {
    if (webviewRef.current) webviewRef.current.mainDocumentURL()
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#353535" />
      <View style={{ width: '100%', height: '100%', backgroundColor: '#000', display: isLoaded, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={bg} style={{ width: "100%", height: '100%' }} />

        <AnimationBall />
        <View style={{ width: '100%', height: '70%', position: 'absolute', alignSelf: 'center', justifySelf: 'center' }}>
          <Logo style={{ width: '100%', height: '100%', alingSelf: '' }} />
        </View>
      </View>
      <WebView
        source={{
          uri: webUrl
        }}
        style={{ marginTop: 20 }}
        onLoadEnd={handleEndLoading}
        onLoadProgress={handleStartLoad}

        ref={webviewRef}
        onNavigationStateChange={navState => {
          setCanGoBack(navState.canGoBack)
          setCanGoForward(navState.mainDocumentURL)
          setCurrentUrl(navState.url)
        }}
      />
      {isLoading &&
        <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', position: 'absolute' }}>
          <AnimationBallIndicator />
        </View>

      }

     {showTabBar && <View style={styles.tabBarContainer}>
        <TouchableOpacity onPress={backButtonHandler}>
          <Next width={30} height={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.ball} onPress={handleGoCart}>
          <Cart width={35} height={35} />
        </TouchableOpacity>
        <TouchableOpacity onPress={backButtonHandler}>
          <Back width={30} />
        </TouchableOpacity>
      </View>}
    </>
  );
};
export default App;


const styles = StyleSheet.create({
  flexContainer: {
    flex: 1
  },
  tabBarContainer: {
    padding: 15,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
  },
  button: {
    color: '#000',
    fontSize: 24
  },
  ball: {
    width: 60,
    height: 60,
    marginTop: -30,
    backgroundColor: '#FF6F64',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  }
})