import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View
} from 'react-native'
import React, { Component, useEffect, useState } from 'react'
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
import axios from 'axios'
import Recepies from '../components/Recepies'

const HomeScreen = () => {
  const [categories, setCategories] = useState([])
  const [meals, setMeals] = useState([])
  const [activecategory, setActiveCategory] = useState('Beef')
  const [querry,setquerry]=useState('')
  const getCategopries = async () => {
    const res = await axios.get(
      'https://www.themealdb.com/api/json/v1/1/categories.php'
    )
    const data = await res?.data?.categories
    setCategories(data)
  }
  const getMeals = async (category = 'Beef') => {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    )
    const dd = res?.data?.meals
    setMeals(dd)
  }
  useEffect(() => {
    getCategopries()
    getMeals()
  }, [])

  const handleCategory = category => {
    getMeals(category)
    setActiveCategory(category)
    setMeals([])
  }
console.log(querry)
  return (
    <View className='flex-1 bg-white'>
      <StatusBar barStyle={'dark-content'} />
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
            Hello !
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

        <View className='rounded-2xl bg-black/5 mx-2 flex flex-row items-center'>
          <TextInput
            placeholder='Search any recepie'
            placeholderTextColor={'gray'}
            value={querry}
           onChangeText={setquerry}
            style={{ fontSize: hp(1.8) }}
            className='flex-1 text-base mb-1  pl-3   h-16 tracking-wider'
          />
          <View className='bg-white/80 p-2 rounded-2xl  '>
            <MagnifyingGlassIcon color='orange' size={hp(3.8)} />
          </View>
        </View>

        {/* Category Flat  List  */}
        <View>
          {categories.length > 0 && (
            <Categories
              activecategory={activecategory}
              handleCategory={handleCategory}
              categories={categories}
              setCategories={setCategories}
            />
          )}
        </View>
        {/* Recepies */}
        <Recepies categories={categories} meals={meals} querry={querry} />
      </ScrollView>
    </View>
  )
}
export default HomeScreen
