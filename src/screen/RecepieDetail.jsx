import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import React, { useEffect, useState } from 'react'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import {
  ChevronLeftIcon,
  HeartIcon,
  SparklesIcon
} from 'react-native-heroicons/solid'
import YoutubeIframe from 'react-native-youtube-iframe'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
const RecepieDetail = props => {
  const item = props.route.params
  const navigation = useNavigation()
  const [isFavourite, setFavourite] = useState(false)
  const [meal, setMeal] = useState([])
  const [loading, setloading] = useState(true)
  const id = item.idMeal
  const getRecepie = async id => {
    const res = await axios.get(
      `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    )
    const data = res.data.meals[0]

    setMeal(data)
    setloading(false)
  }
  useEffect(() => {
    getRecepie(id)
  }, [])

  const getIngredients = meal => {
    if (!meal) {
      return []
    }
    let indexes = []
    for (let i = 1; i <= 20; i++) {
      if (meal['strIngredient' + i]) {
        indexes.push(i)
      }
    }
    return indexes
  }
  function getYouTubeVideoId (url) {
    // Regular expression to match YouTube video URL patterns
    var regExp = /[?&]v=([^&]+)/

    // Extract video ID from the URL using the regular expression
    var match = url.match(regExp)

    // If a match is found, return the video ID, otherwise return null
    if (match && match[1]) {
      return match[1]
    } else {
      return null
    }
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
      className='bg-white flex-1 w-full '
    >
      <StatusBar barStyle={'light-content'} />
      <Animated.View
        className='flex flex-row justify-center'
        entering={FadeInUp.delay(800).duration(600).springify().damping(20)}
      >
        <Image
          sharedTransitionTag={meal.strMeal}
          source={{ uri: item.strMealThumb }}
          style={{
            height: hp(50),
            width: wp(100),

            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40
          }}
        />
      </Animated.View>

      {/* back button */}

      <Animated.View
        entering={FadeInUp.delay(1000).duration(600).springify().damping(12)}
        className='w-full absolute flex-row justify-between items-center pt-14 px-4'
      >
        <TouchableOpacity
          className='px-2 py-2 bg-white/95 rounded-full'
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={hp(3.5)} color={'#fbbf24'} strokeWidth={4} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setFavourite(prev => !prev)
          }}
          className='px-2 py-2 bg-white/95 rounded-full'
        >
          <HeartIcon
            size={hp(3.5)}
            color={isFavourite ? 'red' : 'gray'}
            strokeWidth={4}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* Meal Description */}
      {loading ? (
        <>
          <ActivityIndicator size={'large'} />
        </>
      ) : (
        <>
          <View className='px-2 w-full '>
            <Text className='font-semibold text-neutral-600 text-2xl mt-4'>
              {' '}
              {meal?.strMeal}
            </Text>
            <Text className='font-semibold text-neutral-400 text-xl'>
              {' '}
              {meal?.strArea}
            </Text>
          </View>
        </>
      )}

      {/* Ingredients */}

      <View className='px-3 space-y-2 flex flex-col mt-4 '>
        <Text
          style={{ fontSize: hp(2.5) }}
          className='font-semibold text-neutral-600'
        >
          Ingredients
        </Text>

        {getIngredients(meal).map(i => {
          return (
            <View key={i} className='flex-row   space-x-2 px-2'>
              <View
                className='bg-amber-500 rounded-full '
                style={{ height: hp(1.5), width: hp(1.5) }}
              />
              <View className='flex-row space-x-2'>
                <Text className='font-bold text-neutral-600'>
                  {meal['strMeasure' + i]}
                </Text>
                <Text>{meal['strIngredient' + i]}</Text>
              </View>
            </View>
          )
        })}
      </View>

      {/* Instructions */}

      <View className='px-3 space-y-2 flex flex-col  my-4'>
        <Text
          style={{ fontSize: hp(3.5) }}
          className='font-bold text-neutral-600'
        >
          Instructions
        </Text>

        <Text className=' line-clamp-5'>{meal.strInstructions}</Text>
      </View>

      {/* Recepie Video */}

      {meal.strYoutube && (
        <View className='px-4 '>
          <Text className='text-2xl font-semibold text-neutral-700 pb-4'>
            Recepie Video
          </Text>
          <YoutubeIframe
            videoId={getYouTubeVideoId(meal?.strYoutube)}
            height={hp(30)}
          />
        </View>
      )}
    </ScrollView>
  )
}

export default RecepieDetail
