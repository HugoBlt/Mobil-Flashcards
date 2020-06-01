import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import QuestionHeader from './QuestionHeader'
import { SubmitBtn } from './TextButton'
import { receiveDecks, addQuestion } from '../actions'
import { getDecks, saveQuestion } from '../utils/api'
import { connect } from 'react-redux'
import { white, blue } from '../utils/colors'

class NewQuestion extends Component {
  componentDidMount () {
    const { dispatch } = this.props
    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ready: true})))
  }
  state = {
    question : '',
    answer : ''
  }
  createQuestion = () => {

    const question = this.state.question
    const answer = this.state.answer
    const deckid = this.props.deck.title

    if (question !== '' & answer !== '') {
      const { dispatch } = this.props

      const newQuestion = {
        question,
        answer
      }

      this.setState(() => ({
        question: '',
        answer : '',
      }))

      dispatch(addQuestion({ deckid, newQuestion }))
      saveQuestion({ deckid, question, answer })
      
    }else{
      Alert.alert(
        "Alert Title",
        "Please provide Question and Answer",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      )
    }
  }
  render() {
    const deck = this.props.deck
    return (
      <View style={styles.container}>
        <View style = {styles.deckTitle}>
          <QuestionHeader title = {deck ? deck.title : 'Name Deck'}/>
        </View>
        <View style={styles.center}>
          <Text style = {{ fontSize: 25, color: blue }}> What is your new flashcard ? </Text>
          <TextInput
            style={{ flex: 1}}
            onChangeText={(question) => this.setState({question})}
            value={this.state.question}
            placeholder="Question" 
            style={[styles.input,{fontSize: 20}]}
            clearButtonMode='always'
          />
          <TextInput
            style={{ flex: 1}}
            onChangeText={(answer) => this.setState({answer})}
            value={this.state.answer}
            placeholder="Answer" 
            style={[styles.input,{fontSize: 20}]}
            clearButtonMode='always'
          />
          <SubmitBtn children = {'CREATE'} onPress={this.createQuestion}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginBottom : 10,
    marginTop : 10,
  },
  deckTitle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
	input: {
		padding: 10,
		marginTop: 10,
		marginBottom: 10,
		fontSize: 15,
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 0.2,
		borderBottomWidth: 1,
		borderBottomColor: blue,
	},
})

function mapStateToProps (decks, {route, navigate }) {

  const deck = decks[route.params.deckid]

  return {
    deck,
    navigate,
    }
}

export default connect(mapStateToProps)(NewQuestion)