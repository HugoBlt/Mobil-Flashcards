import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { blue, white, lightBlue, gray, green } from '../utils/colors'

export default function QuizDetail ({ deck }){
  const { title , questions, score } = deck
  return (
    <View>
      <Text style={{fontSize: 20, color: blue}}>{title}</Text>
      <Text style={{fontSize: 15, color: gray}}>{questions.length}</Text>
      <Text style={{fontSize: 15, color: green}}>{`${score} %`}</Text>
    </View>
  )
}