import firebase from 'firebase/app'
import 'firebase/firestore'

// Get a Firestore instance
export const db = firebase
  .initializeApp({ projectId: 'instant-runoff-strawpoll' })
  .firestore()

// Export types that exists in Firestore


// if using Firebase JS SDK < 5.8.0
// db.settings({ timestampsInSnapshots: true })
