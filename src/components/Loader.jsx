import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const Loader = () => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}
    >
      <ActivityIndicator size={'large'} />
    </View>
  )
}

export default Loader
