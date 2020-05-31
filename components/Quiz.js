import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import QuestionHeader from './QuestionHeader'
import TextHandler from './TextHandler'
import { SubmitBtn } from './TextButton'
import { white, blue, red, green } from '../utils/colors'
import { addScore } from '../actions'
import { saveScore } from '../utils/api'

class Quiz extends Component {
  state = {
    seeAnswer: false,
    score : 0,
    questionId : 0,
  }
  answer = () => {
    this.setState(() => ({ seeAnswer: !this.state.seeAnswer}))
  }
  correctAnswer = () => {
    this.setState(() => ({ 
      score: this.state.score + 1,
      score_percentage : 100 * ((this.state.score + 1) / this.props.questions.length ),
      questionId : this.state.questionId + 1,
      seeAnswer: false,
    }))
  }
  wrongAnswer = () => {
    this.setState(() => ({ 
      questionId : this.state.questionId + 1,
      seeAnswer: false,
    }))
  }
  goBack = () => {
    const { navigate, dispatch, deck } = this.props
    const deckid = deck.title
    const score_percentage = this.state.score_percentage

    dispatch(addScore({ deckid, score_percentage }))
    saveScore({ deckid, score_percentage })
    
    navigate('Deck', { deckid : deck.title})
  }
  render() {
    if (this.state.questionId === this.props.questions.length) {
      console.log(this.state)
      return (
          <View style={styles.container}>
            <View style={styles.score}>
              <Text style = {{ fontSize: 25, color: blue }}>{`You answer correctly ${this.state.score} over ${this.props.questions.length}`}</Text>
              <Text style = {{ fontSize: 25, color: blue }}>{`Your score is ${this.state.score_percentage}%`}</Text>
            </View>
            <SubmitBtn children = {'Go Back to Quiz'} onPress={this.goBack} styleBtn = {{backgroundColor : blue, margin : 10}}/>
          </View>
      )
    }
    const { question, answer } = this.props.questions[this.state.questionId]
    return (
      <View style={styles.container}>
        <View style = {styles.deckTitle}>
          <QuestionHeader title = {this.props.deck.title}/>
        </View>
        <View>
          <View style={styles.question}>
            <TextHandler text = {question}/>
          </View>
          <SubmitBtn children = {'ANSWER'} onPress={this.answer} />
        </View>
        {this.state.seeAnswer &&
        <View>
          <View style={styles.question}>
            <TextHandler text = {answer}/>
          </View>
          <View style={styles.button}>
            <SubmitBtn children = {'TRUE'} onPress={this.correctAnswer} styleBtn = {{backgroundColor : green, marginRight : 5}}/>
            <SubmitBtn children = {'FALSE'} onPress={this.wrongAnswer} styleBtn = {{backgroundColor : red, marginLeft : 5}}/>
          </View>
        </View>}
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
  question: {
    flex: 1,
    flexDirection: 'row',
    padding : 10,
    marginTop : 30,
    marginBottom : 30,
    marginLeft: 10,
    marginRight: 10,
    borderColor: blue,
    borderWidth : 2
  },
  score: {
    flex: 1,
    padding : 10,
    borderColor: blue,
    borderWidth : 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

function mapStateToProps (decks, {route, navigate }) {

  const deck = decks[route.params.deckid]

  return {
    deck : deck,
    questions : deck.questions,
    navigate,
    }
}

export default connect(mapStateToProps)(Quiz)