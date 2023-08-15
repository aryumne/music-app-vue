<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ reg_alert_msg }}
  </div>
  <vee-form :validation-schema="register_form" @submit="reqister" :initial-values="userData">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <error-message name="name" class="text-red-600" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <error-message name="email" class="text-red-600" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <error-message name="age" class="text-red-600" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600 d-inline" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        name="confirm_password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <error-message name="confirm_password" class="text-red-600" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antartica">Antartica</option>
      </vee-field>
      <error-message name="country" class="text-red-600" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        type="checkbox"
        name="tos"
        value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <label class="inline-block">Accept terms of service</label>
      <error-message name="tos" class="text-red-600 block" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="reg_in_submission"
    >
      {{ reg_button_text }}
    </button>
  </vee-form>
</template>

<script>
import { mapActions } from 'pinia'
import useUserStore from '@/stores/user'

export default {
  data() {
    return {
      register_form: {
        name: 'required',
        email: 'required|email',
        age: 'required|min_value:17|max_value:25',
        password: 'required|min:6|exclude:123123',
        confirm_password: 'required|password_mismatch:@password',
        country: 'required|exclude:Antartica',
        tos: 'tos_required'
      },
      userData: {
        country: 'Germany'
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_msg: 'Please wait! Your account is being created.',
      reg_button_text: 'Submit'
    }
  },
  methods: {
    ...mapActions(useUserStore, { createUser: 'signUp' }),
    async reqister(value) {
      this.reg_show_alert = true
      this.reg_in_submission = true
      this.reg_button_text = 'Loading...'
      try {
        await this.createUser(value)
      } catch (error) {
        console.log(error)
        this.reg_in_submission = false
        this.reg_alert_variant = 'bg-red-500'
        this.reg_alert_msg = error
        this.reg_button_text = 'Re Submit'
        return
      }
      this.reg_button_text = 'Submit'
      this.reg_alert_variant = 'bg-green-500'
      this.reg_alert_msg = 'Success! Your account has been created'
      window.location.reload()
    }
  }
}
</script>
