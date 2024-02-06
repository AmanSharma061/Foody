import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated'

import Animated from 'react-native-reanimated'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import axios from 'axios'
const Categories = ({
  activecategory,
  setActiveCategory,
  categories,
  setCategories,
  handleCategory
}) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify().damping(15)}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className='space-x-4'
        contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 15 }}
      >
        {categories?.map((cat, index) => {
          let isActive = cat.strCategory == activecategory
          let bntClass = isActive ? 'bg-amber-600' : 'bg-black/10'
          return (
            <TouchableOpacity
              onPress={() => {
                handleCategory(cat.strCategory)
              }}
              key={index}
              className='flex items-center space-y-1'
            >
              <View
                className={
                  `rounded-full p-[6px] items-center flex justify-center ` +
                  bntClass
                }
              >
                <Image
                  style={{ height: hp(8), width: hp(8) }}
                  source={{ uri: cat.strCategoryThumb }}
                  className='rounded-full   '
                />
              </View>
              <Text className='text-neutral-600'>{cat.strCategory}</Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </Animated.View>
  )
}

export default Categories
