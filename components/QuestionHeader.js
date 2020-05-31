import React from 'react'
import { Text, View } from 'react-native'
import { blue, gray } from '../utils/colors'
import { timeToString } from '../utils/helpers'

export default function DateHeader ({ title }) {
  const date = timeToString()
  return (
    <View>
    <Text style={{color: blue, fontSize: 25}}>
      {title}
    </Text>
    <Text style={{color: gray, fontSize: 15}}>
      {date}
    </Text>
    </View>
  )
}
