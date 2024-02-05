import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { categories } from '../constants/dummy'
const Categories = () => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className='space-x-4'
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((cat, index) => {
          return (
            <TouchableOpacity
              key={index}
              className='flex items-center space-y-1'
            >
              <View className='rounded-full p-[6px]'>
                <Image
                  height={1000}
                  width={1000}
                  src='https://picsum.photos/200'
                  className='rounded-full '
                />
                <Text> {cat.name}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default Categories
