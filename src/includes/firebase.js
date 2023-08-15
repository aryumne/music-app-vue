import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCdo8G7TbJPBpnsyDqUZPZypf9NDVVtvj4',
  authDomain: 'music-app-vuejs.firebaseapp.com',
  projectId: 'music-app-vuejs',
  storageBucket: 'music-app-vuejs.appspot.com',
  appId: '1:564832070023:web:879c91c58999e1dc188b22'
}
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const firestore = firebase.firestore()

const usersCollection = firestore.collection('users')

export { auth, firestore, usersCollection }
