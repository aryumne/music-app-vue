import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage,
  defineRule,
  configure
} from 'vee-validate'
import {
  required,
  min,
  email,
  min_value as minValue,
  max_value as maxValue,
  confirmed,
  not_one_of as exclude,
  alpha_spaces as alphaSpaces
} from '@vee-validate/rules'
export default {
  // eslint-disable-next-line no-unused-vars
  install(app, options) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('tos_required', required)
    defineRule('min', min)
    defineRule('email', email)
    defineRule('min_value', minValue)
    defineRule('max_value', maxValue)
    defineRule('password_mismatch', confirmed)
    defineRule('exclude', exclude)
    defineRule('alpha_spaces', alphaSpaces)

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required.`,
          min: `The field ${ctx.field} is to short.`,
          max: `The field ${ctx.field} is to long.`,
          alpha_spaces: `The field ${ctx.field} may only contain aplhabetical characters and spaces.`,
          email: `The field ${ctx.field} must be a valid email.`,
          min_value: `The field ${ctx.field} is to low.`,
          max_value: `The field ${ctx.field} is to high.`,
          exclude: `You are not allowed to use this value for the field ${ctx.field}`,
          password_mismatch: "This confirmation password don't match",
          tos_required: 'You must accept the Terms of Service'
        }
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid.`
        return message
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false
    })
  }
}
