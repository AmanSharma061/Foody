import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View
} from 'react-native'
import React, { Component } from 'react'
import {
  BellIcon,
  MagnifyingGlassIcon,
  SparklesIcon as SparklesIconOutline
} from 'react-native-heroicons/outline'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { SearchIcon } from 'lucide-react'
import { SearchBar } from 'react-native-screens'
import Categories from '../components/Categories'

const HomeScreen = () => {
  return (
    <View className='flex-1 bg-white'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className='spac-y-6 pt-14'
      >
        {/* Avatar and the bell icon */}
        <View className='flex flex-row px-4 items-center justify-between mb-4'>
          <Image
            source={require('../../assets/avatar.jpg')}
            className='rounded-full '
            style={{
              height: hp(6),
              width: hp(6)
            }}
          />
          <BellIcon size={hp(4)} color={'gray'} />
        </View>

        {/*  Welcome Section  */}
        <View className='mx-4 space-y-1  mb-2'>
          <Text
            style={{ fontSize: hp(2) }}
            className='font-semibold text-neutral-600'
          >
            Hello , Aman !
          </Text>
          <View>
            <Text
              style={{ fontSize: hp(3.5) }}
              className='text-neutral-600  font-bold '
            >
              Make your own food ,
            </Text>
            <Text
              style={{ fontSize: hp(3.5) }}
              className='text-neutral-600  font-bold '
            >
              stay at <Text className='text-amber-500'>home</Text>
            </Text>
          </View>
        </View>

        {/* Search View */}

        <View className='rounded-2xl bg-black/5 mx-2 flex flex-row items-center p-[4px]'>
          <TextInput
            placeholder='Search any recepie'
            placeholderTextColor={'gray'}
            style={{ fontSize: hp(1.8) }}
            className='flex-1 text-base mb-1  pl-3 py-2 tracking-wider'
          />
          <View className='bg-white/80 p-2 rounded-2xl  '>
            <MagnifyingGlassIcon color='orange' size={hp(3.8)} />
          </View>
        </View>

        {/* Category Flat  List  */}
        <View>

        <Categories />
        </View>
      </ScrollView>
    </View>
  )
}
export default HomeScreen
