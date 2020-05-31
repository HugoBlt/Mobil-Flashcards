import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'FLASHCARD:decks'

export function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      if (results === null){
            const data = {}
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
            return ( data )
        }
        return JSON.parse(results)
    })
  }

export function saveQuestion ( {deckid, question, answer }) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[deckid].questions = data[deckid].questions.concat([{
        question : question,
        answer : answer,
      }])
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}

export function saveScore ( {deckid, score_percentage }) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[deckid].score = score_percentage
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}

export function deleteDeck ({deckid}) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[deckid] = undefined
      delete data[deckid]
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}

export function saveDeckTitle ({ deckid }) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deckid]: {
      title: deckid,
      questions: [],
      score: 0,
    }
    })
  )
}

// export function addCardToDeck ({title, card}) {
//   return ()
// }
