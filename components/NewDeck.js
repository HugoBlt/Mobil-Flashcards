import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import QuestionHeader from './QuestionHeader'
import { SubmitBtn } from './TextButton'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'
import { white, blue } from '../utils/colors'

class NewDeck extends Component {
  state = {
    text: '',
  }
  createDeck = () => {
    const deckid = this.state.text
    const { dispatch } = this.props
    dispatch(addDeck(deckid))

    this.setState(() => ({
      text: '',
    }))

    // go to add question to this deck

    saveDeckTitle({ deckid })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.deckTitle}>
          <QuestionHeader title = {'New Deck'}/>
        </View>
        <View style={styles.center}>
          <Text style = {{ fontSize: 25, color: blue }}> What is the title of your deck? </Text>
          <TextInput
            style={{ flex: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            placeholder="Deck Title" 
            style={[styles.input,{fontSize: 20}]}
            maxLength = {100}
            clearButtonMode='always'
          />
          <SubmitBtn children = {'CREATE'} onPress={this.createDeck} />
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

export default connect()(NewDeck)