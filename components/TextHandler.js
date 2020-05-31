import React from 'react'
import { Text } from 'react-native'
import { blue } from '../utils/colors'

export default function TextHandler ({ text }) {
  return (
    <Text style={{color: blue, fontSize: 20}}>
      {text}
    </Text>
  )
}
