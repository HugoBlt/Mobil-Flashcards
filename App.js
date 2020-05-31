import React from 'react'
import { View, StatusBar } from 'react-native'
import { white, blue } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import Constants from 'expo-constants'
import NewDeck from './components/NewDeck'
import DecksListContainer from './components/DecksList'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

function HugoStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tab = createBottomTabNavigator()

function MyTabs() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Decks">
          {({ navigation }) => (
            <DecksListContainer navigate={navigation.navigate} />
          )}
        </Tab.Screen>
        <Tab.Screen name="New Deck">
          {({ navigation }) => (
            <NewDeck navigate={navigation.navigate} />
          )}
        </Tab.Screen>
      </Tab.Navigator>
  )
}

export default class App extends React.Component {
  render() {
    const store = createStore(reducer, middleware)
    return (
      <Provider store={store}>
        <NavigationContainer>
            <View style={{flex: 1}}>
              <HugoStatusBar backgroundColor={blue} barStyle="light-content" />
              <MyTabs/>
            </View>
        </NavigationContainer>
      </Provider>
    )
  }
}

