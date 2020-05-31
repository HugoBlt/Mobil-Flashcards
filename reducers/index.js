import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, ADD_QUESTION, ADD_SCORE } from '../actions'


function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK :
      return {
        ...state,
        [action.deckid]: {
          title: action.deckid,
          questions: [],
          score: 0,
        },
      }
    case REMOVE_DECK :
      delete state[action.deckid]
      return {
        ...state,
      }
    case ADD_QUESTION :
      return {
        ...state,
        [action.deckid] : {
          ...state[action.deckid],
          questions : state[action.deckid].questions.concat([action.newQuestion]),
        }
      }
    case ADD_SCORE :
      return {
        ...state,
        [action.deckid] : {
          ...state[action.deckid],
          score : action.score_percentage,
            }
          }
    default :
      return state
  }
}

export default decks