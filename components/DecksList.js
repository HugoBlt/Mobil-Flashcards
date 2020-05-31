import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import QuestionHeader from './QuestionHeader'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { white, blue, lightBlue, gray, green } from '../utils/colors'
import { AppLoading} from 'expo'
import { createStackNavigator } from '@react-navigation/stack'
import Deck from './Deck'
import QuizDetail from './QuizDetail'
import NewQuestion from './NewQuestion'
import Quiz from './Quiz'


function ListItem ({ deck, navigate}){
  const { title  } = deck
  return (
    <TouchableOpacity key = {title} style={styles.outline} onPress={() => navigate('Deck', { deckid : title})}>
      <QuizDetail 
        deck = {deck}
      />
    </TouchableOpacity>
  )
}

function DeckList ({ decks, navigate}){
  return (
      <View>
        <View style = {styles.deckTitle}>
          <QuestionHeader title = {'Deck List'}/>
        </View>
        <Text style = {{fontSize: 25, color: blue}}> Choose your deck : </Text>
        <ScrollView style={styles.list_decks}>
        {Object.keys(decks).map((deck) =>
          <ListItem 
            key = {decks[deck]} 
            deck = {decks[deck]} 
            navigate = {navigate}
          />
          )}
        </ScrollView>
      </View>
  )
}

const Stack = createStackNavigator()

class DecksListContainer extends Component {
  state = {
    ready: false,
  }
  componentDidMount () {
    const { dispatch } = this.props
    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ready: true})))
  }
  render() {
    const { decks } = this.props
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }
    return (
        <Stack.Navigator style={styles.container}>
          <Stack.Screen name="Deck List">
            {({ navigation }) => (
              <DeckList decks={decks} navigate={navigation.navigate} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Deck">
          {({ route, navigation }) => (
            <Deck route = {route} navigate={navigation.navigate} />
          )}
          </Stack.Screen>
          <Stack.Screen name="New Question">
          {({ route, navigation }) => (
            <NewQuestion route = {route} navigate={navigation.navigate} />
          )}
          </Stack.Screen>
          <Stack.Screen name="Quiz">
          {({ route, navigation }) => (
            <Quiz route = {route} navigate={navigation.navigate} />
          )}
          </Stack.Screen>
        </Stack.Navigator>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,

  },
  deckTitle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  list_decks : {
    margin: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor : gray,
  },
  outline: {
    flex: 1,
    margin: 10,
    borderRadius: 5,
    borderColor: lightBlue,
    borderWidth: 0.5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

function mapStateToProps (decks, navigation) {
  return {
    decks,
    navigation,
  }
}

export default connect(mapStateToProps)(DecksListContainer)