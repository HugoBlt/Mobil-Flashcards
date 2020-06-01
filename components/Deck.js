import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import QuestionHeader from './QuestionHeader'
import QuizDetail from './QuizDetail'
import { connect } from 'react-redux'
import { removeDeck } from '../actions'
import { deleteDeck } from '../utils/api'
import { SubmitBtn } from './TextButton'
import { white, blue, lightBlue, gray, green, red } from '../utils/colors'



class Deck extends Component {
  study = () => {
    const { navigate, deck } = this.props
    navigate('Quiz', { deckid : deck.title})
  }
  addQuestion = () => {
    const { navigate, deck } = this.props
    navigate('New Question', { deckid : deck.title})
  }
  delete = () => {
    const { dispatch, navigate, deck } = this.props
    const deckid = deck.title

    console.log('ici', deck)
    
    deleteDeck({ deckid })
    dispatch(removeDeck(deckid))
    navigate('Deck List')
  }
  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.deckTitle}>
          <QuestionHeader title = {this.props.deck.title}/>
        </View>
        <View style = {styles.outline}>
          <QuizDetail deck = {this.props.deck} />
        </View>
        <View style={styles.button}>
          <SubmitBtn children = {'ADD QUESTION'} onPress={this.addQuestion} styleBtn = {{backgroundColor : blue}}/>
          <SubmitBtn children = {'STUDY'} onPress={this.study} styleBtn = {{backgroundColor : green}}/>
          <SubmitBtn children = {'DELETE'} onPress={this.delete} styleBtn = {{backgroundColor : red}}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,

  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent : 'space-around',
  },
  deckTitle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  list_decks : {
    flex: 1,
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

function mapStateToProps (decks, {route, navigate }) {

  return {
    deck : decks[route.params.deckid],
    navigate,
    }
}

export default connect(mapStateToProps)(Deck)