<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="login_show_alert"
    :class="login_alert_variant"
  >
    {{ login_alert_msg }}
  </div>
  <vee-form @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
        :rules="'required|email'"
      />
      <error-message name="email" class="text-red-600" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password"
        :rules="'required'"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
    </div>
    <error-message name="password" class="text-red-600" />
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="login_in_submission"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import { mapActions } from 'pinia'
import useUserStore from '@/stores/user'
export default {
  data() {
    return {
      login_in_submission: false,
      login_show_alert: false,
      login_alert_variant: 'bg-blue-500',
      login_alert_msg: 'Please wait! Your account is being authenticated.'
    }
  },
  methods: {
    ...mapActions(useUserStore, ['signIn']),
    async login(value) {
      this.reg_show_alert = true
      this.reg_in_submission = true
      this.reg_button_text = 'Loading...'
      try {
        await this.signIn(value)
      } catch (error) {
        this.login_in_submission = false
        this.reg_alert_variant = 'bg-red-500'
        this.reg_alert_msg = error.message
        console.log(error)
        return
      }
      this.login_in_submission = true
      this.login_show_alert = true
      this.login_alert_variant = 'bg-green-500'
      this.login_alert_msg = 'You are successfully authenticated.'
      window.location.reload()
    }
  }
}
</script>
