/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef } from "react";
import {
  Dimensions, Image,
  SafeAreaView,
  StyleSheet,
  Text, TouchableOpacity,
  useColorScheme,
  View
} from "react-native";

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import SLLFireworks, { IFireworksHandle } from "./SLLFireworks";


const { width : WIN_WIDTH, height: WIN_HEIGHT } = Dimensions.get('window');

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const fireworksRef = useRef<IFireworksHandle>(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onAnimationDone=(state: string)=>{
    switch (state) {
      case 'finished': {
        // console.log(state);
      } break;
      case 'progress': {
        // console.log(state);
      } break;
    }
  }

  const buttonView=()=>{
    return(<View>
      {/* start button */}
      <TouchableOpacity style={styles.simpleButton}
                        onPress={()=>{
                          if(fireworksRef.current != null)
                            fireworksRef.current.start();
                        }
                        }>
        <Text>start</Text>
      </TouchableOpacity>
      {/* stop button */}
      <TouchableOpacity style={styles.simpleButton} onPress={()=>{
        if(fireworksRef.current != null)
          fireworksRef.current.stop();
      }
      }>
        <Text>stop</Text>
      </TouchableOpacity>
    </View>);
  }

  const fireworksImageView=()=>{
    return(<SLLFireworks
      ref={fireworksRef}
      positionX={WIN_WIDTH/2}
      positionY={WIN_HEIGHT/2}
      particleSize={50}
      radius={100}
      innerRadius={50}
      radiusNoise={100}
      zIndex={100}
      iteration={1}
      numberOfParticle={10}
      particleSources={[require('./star_01.png'), require('./star_02.png'), require('./star_03.png')]}
      // particleColors={['red', 'blue', 'green']}
      autoStart={true}
      animationDuration={500}
      onAnimationDone={onAnimationDone}
      angleType={'equal'}
    />);
  }

  const fireworksMixView=()=>{
    return(<SLLFireworks
        ref={fireworksRef}
        positionX={WIN_WIDTH/2}
        positionY={WIN_HEIGHT/2}
        particleSize={10}
        radius={100}
        innerRadius={0}
        radiusNoise={10}
        zIndex={100}
        iteration={1}
        numberOfParticle={100}
        particleSources={[require('./sample.png'), {uri: "https://img.icons8.com/ios/250/000000/rocket.png"}]}
        particleColors={['red', 'blue', 'green']}
        autoStart={false}
        animationDuration={500}
        onAnimationDone={onAnimationDone}
        angleType={'random'}
      />
    );
  }

  const fireworksCircleView=()=>{
    return(<SLLFireworks
        ref={fireworksRef}
        positionX={WIN_WIDTH/2}
        positionY={WIN_HEIGHT/2}
        particleSize={50}
        radius={100}
        innerRadius={40}
        radiusNoise={100}
        zIndex={100}
        iteration={1}
        numberOfParticle={10}
        // particleSources={[require('./sample.png'), {uri: "https://img.icons8.com/ios/250/000000/rocket.png"}]}
        particleColors={['red', 'blue', 'green']}
        autoStart={false}
        animationDuration={500}
        onAnimationDone={onAnimationDone}
        angleType={'random'}
      />
    );
  }

  return(<SafeAreaView style={backgroundStyle}>
      <View style={styles.centerCircleView} />
      {/*{fireworksImageView()}*/}
      {/*{fireworksCircleView()}*/}
      {fireworksMixView()}
      {buttonView()}

  </SafeAreaView>)
}

const styles = StyleSheet.create({
  simpleButton:{
    borderRadius: 20,
    padding: 10,
    justifyContent:'center',
    alignItems: 'center'
  },
  centerCircleView:{
    width: 100, height: 100, borderRadius: 100
    , backgroundColor: '#EBCDCD', position: 'absolute'
    , top: WIN_HEIGHT/2 - 50, left: WIN_WIDTH/2 - 50
    , overflow:'hidden'
  }
});

export default App;
