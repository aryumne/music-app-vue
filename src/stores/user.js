import { defineStore } from 'pinia'
import { auth, usersCollection as uC } from '@/includes/firebase'

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false
  }),
  actions: {
    async signUp(value) {
      const userCredential = await auth.createUserWithEmailAndPassword(value.email, value.password)
      await uC.doc(userCredential.user.uid).set({
        name: value.name,
        email: value.email,
        age: value.age,
        country: value.country
      })

      await userCredential.user.updateProfile({
        displayName: value.name
      })

      this.userLoggedIn = true
    },
    async signIn(value) {
      await auth.signInWithEmailAndPassword(value.email, value.password)
      this.userLoggedIn = true
    },
    async signOut() {
      await auth.signOut()
      this.userLoggedIn = false
    }
  }
})
