import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native'
// import MasonryList from '@react-native-seoul/masonry-list';
import MasonryList from '@react-native-seoul/masonry-list'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { mealData } from '../constants/dummy'
import Animated, { FadeInDown } from 'react-native-reanimated'
import Loader from './Loader'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
const Recepies = ({ categories, meals, querry }) => {
  const navigation = useNavigation()
  const [samaan, setSamaan] = useState([meals])
  const arr = meals.filter(meal => {
    return meal.strMeal.toLowerCase().indexOf(querry.toLowerCase())>=0
  })
  
 
  return (
    <View clasName='w-full   ' style={{ marginHorizontal: 10 }}>
      <Text
        style={{ fontSize: hp(3), marginHorizontal: hp(2) }}
        className='font-semibold py-2 text-neutral-600 '
      >
        Recepies
      </Text>
      {categories.length == 0 || meals.length == 0 ? (
        <Loader />
      ) : (
        <MasonryList
          data={
            querry.length>0?arr:meals          }
          keyExtractor={item => item.name}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => (
            <RecepieCard item={item} index={i} navigation={navigation} />
          )}
          //   refreshing={isLoadingNext}
          //   onRefresh={() => refetch({first: ITEM_CNT})}
          onEndReachedThreshold={0.1}

          //   onEndReached={() => loadNext(ITEM_CNT)}
        />
      )}
    </View>
  )
}

export default Recepies
const RecepieCard = ({ item, index, navigation }) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(index + 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <Pressable
        onPress={() => navigation.navigate('RecepieDetail', { ...item })}
        style={{
          width: '100%',
          paddingLeft: index % 2 == 0 ? 0 : 8,
          paddingRight: index % 2 == 0 ? 8 : 0
        }}
        clasName='flex  justify-center mb-4 space-y-1'
      >
        <Image
          sharedTransitionTag={item.strMeal}
          source={{ uri: item.strMealThumb }}
          style={{
            width: '100%',
            borderRadius: 35,
            height: index % 3 == 0 ? hp(25) : hp(35)
          }}
          clasName='h-24'
        />
        <Text
          style={{ paddingVertical: 10, fontSize: hp(1.5), paddingLeft: hp(2) }}
        >
          {item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  )
}
