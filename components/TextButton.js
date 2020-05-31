import React from 'react'
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { blue, white } from '../utils/colors'

export function TextButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

export function SubmitBtn ({ children, onPress, styleBtn = {} ,styleText = {} }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? [styles.iosSubmitBtn, styleBtn] : [styles.AndroidSubmitBtn, styleBtn]}
      onPress={onPress}>
        <Text style={[styles.submitBtnText, styleText]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: blue,
  },
  iosSubmitBtn: {
    backgroundColor: blue,
    padding: 10,
    borderRadius: 7,
    height: 50,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: blue,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 13,
    textAlign: 'center',
  },
})