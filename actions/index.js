export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_SCORE = 'ADD_SCORE'

export function receiveDecks ( decks ) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addDeck ( deckid ) {
  return {
    type: ADD_DECK,
    deckid,
  }
}

export function removeDeck ( deckid ) {
  return {
    type: REMOVE_DECK,
    deckid,
  }
}

export function addQuestion ({ deckid, newQuestion }) {
  return {
    type: ADD_QUESTION,
    deckid,
    newQuestion,
  }
}

export function addScore ({ deckid, score_percentage }) {
  return {
    type: ADD_SCORE,
    deckid,
    score_percentage,
  }
}