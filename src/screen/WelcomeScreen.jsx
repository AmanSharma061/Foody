import { Image, SafeAreaView, StatusBar, Text, View } from 'react-native'
import React, { Component, useEffect } from 'react'
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'

const WelcomeScreen = () => {
  const navigation = useNavigation()
  const ring1Padding = useSharedValue(0)
  const ring2Padding = useSharedValue(0)
  useEffect(() => {
    ring2Padding.value = 0
    ring1Padding.value = 0
    const p1 = setTimeout(() => {
      ring1Padding.value = withSpring(ring1Padding.value + hp(5))
    }, 100)
    const p2 = setTimeout(() => {
      ring2Padding.value = withSpring(ring2Padding.value + hp(4.5))
    }, 300)
    const p3 = setTimeout(() => {
      navigation.navigate('Home')
    }, 2000)

    return ()=>clearTimeout(p1,p2,p3);
  })
  return (
    <View className='bg-amber-700 h-full w-full space-y-8 items-center flex justify-center '>
      <StatusBar barStyle={'light-content'} />
      <Animated.View
        className='bg-white/10 rounded-full '
        style={{ padding: ring2Padding }}
      >
        <Animated.View
          className='bg-white/10 rounded-full '
          style={{ padding: ring1Padding }}
        >
          <Image
            source={require('.././../assets/welcome.jpg')}
            className=' object-cover rounded-full'
            style={{
              height: hp(25),
              width: hp(25)
            }}
          />
        </Animated.View>
      </Animated.View>
      <View className='flex items-center mt-4 '>
        <Text className='font-bold text-white/80  text-6xl  mb-1'>Foody</Text>
        <Text className='font-sm md:font-medium  text-white/50 tracking-widest text-lg  md:text-2xl'>
          Food is always right
        </Text>
      </View>
    </View>
  )
}

export default WelcomeScreen
