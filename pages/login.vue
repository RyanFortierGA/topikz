<template>
  <div class="flex align-items-center justify-content-center overflow-hidden loginPage">
    <img src="~/assets/images/login_img.png"/>
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width: 80%">
      <div class="formWrapper">
          <div class="w-full md:w-10 mx-auto">
            <h1 v-if="!forgotPassword">Login</h1>
             <h1 v-else>Reset Password</h1>
            <Form @submit="onSubmit" :validation-schema="schema" @invalid-submit="onInvalidSubmit" v-if="!forgotPassword">
              <TextInput
                name="email"
                type="email"
                label="Email"
                placeholder="Email address"
                success-message="Got it, we won't spam you!"
              />
              <TextInput
                name="password"
                type="password"
                label="Password"
                placeholder="Your password"
                success-message="Nice and secure!"
              />
              <Button
                :label="disabled ? 'Please wait...' : 'Sign in'"
                class="w-full p-3 text-xl submit-btn"
                ref="submitBtn"
                type="submit"
                :disabled="disabled"
              />
              <NuxtLink to="/signup">No account? Sign up in 30 seconds!</NuxtLink>
              <span class="forgot" @click="forgotPassword = !forgotPassword">Forgot Password</span>
            </Form>
            <Form @submit="passwordReset" v-else>
              <TextInput
                name="email"
                type="email"
                label="Email"
                placeholder="Email address"
                success-message="Got it, we won't spam you!"
              />
              <Button
                :label="'Send Reset Email'"
                class="w-full p-3 text-xl submit-btn"
                ref="submitBtn"
                type="submit"
              />
              <span class="forgot" @click="forgotPassword = !forgotPassword">Back to Login</span>
            </Form>
          </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Form } from 'vee-validate'
import '~/utils/vee-validate-rules'
import { User } from '~/models/User'
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, sendPasswordResetEmail } from 'firebase/auth'
import TextInput from '~/components/TextInput.vue'

const { $toast, $firebaseAuth } = useNuxtApp()
const user$ = useUser()
const disabled = ref(false)
const signinForm = ref({ email: '', password: '' })
const submitBtn = ref()
const token = useCookie('token')
const forgotPassword = ref(false)

const schema = ref({
  email: 'required|email',
  password: 'required|min:8'
})

const signin = async () => {
  if (signinForm.value.email || signinForm.value.password) disabled.value = true
  try {
    const { user } = await signInWithEmailAndPassword(
      $firebaseAuth,
      signinForm.value.email,
      signinForm.value.password
    )
    user$.value = user as User
    token.value = user$.value.accessToken || ''
    navigateTo('/account')
  } catch (error) {
    $toast.add({ severity: 'error', summary: 'Error Message', detail: 'Login failed, make sure you have an account and typed in all correct info', life: 3000 })
    signinForm.value = { email: '', password: '' }
    disabled.value = false
  }
}
const reset = async () => {
  try {
    const reset = await sendPasswordResetEmail(
      $firebaseAuth,
      signinForm.value.email,
    )
    $toast.add({ severity: 'success', summary: 'Reset Sent:', detail: 'Check your email for further instructions on reseting your password', life: 3000 })
  } catch (error) {
    $toast.add({ severity: 'error', summary: 'Error Message', detail: 'Reset failed, make sure you have an account and typed in all correct info', life: 3000 })
    signinForm.value = { email: '', password: '' }
    disabled.value = false
  }
}

function onSubmit({ email = '', password = '' }) {
  signinForm.value = { email, password }
  signin()
}
function passwordReset({ email = '', password = '' }) {
  signinForm.value = { email, password }
  reset()
}

function onInvalidSubmit() {
  submitBtn.value.classList.add('invalid')
  setTimeout(() => {
    submitBtn.value.classList.remove('invalid')
  }, 1000)
}
</script>
<style lang="scss">
.loginPage{
  height: calc(100vh - 150px);
  img{
     top: 66px;
     left: -18px;
     position: absolute;
     object-fit: cover;
     object-position: top center;
     width: calc(100% + 18px);
     opacity: 0.2;
     height: calc(100vh );
  }
}
.submit-btn {
  background: var(--primary-color);
  outline: none;
  border: none;
  color: #fff;
  font-size: 18px;
  padding: 10px 15px;
  display: block;
  width: 100%;
  border-radius: 7px;
  margin-top: 40px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}

.submit-btn.invalid {
  animation: shake 0.5s;
  /* When the animation is finished, start again */
  animation-iteration-count: infinite;
}
.formWrapper{
  padding: 24px;
  border-radius:24px;
  width: 100%;
  position: relative;
  z-index: 999;
  background: transparent;
  h1{
    text-align: center;
    margin: 0px;
    color: #fff;
    display: block;
    margin-bottom: 16px;
  }
  a{
    color: #fff;
    margin-top: 16px;
    display: block;
    text-align: center;
  }
  .forgot{
    color: #fff;
    margin-top: 16px;
    display: block;
    text-align: center;
  }
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px);
  }
  10% {
    transform: translate(-1px, -2px);
  }
  20% {
    transform: translate(-3px, 0px);
  }
  30% {
    transform: translate(3px, 2px);
  }
  40% {
    transform: translate(1px, -1px);
  }
  50% {
    transform: translate(-1px, 2px);
  }
  60% {
    transform: translate(-3px, 1px);
  }
  70% {
    transform: translate(3px, 1px);
  }
  80% {
    transform: translate(-1px, -1px);
  }
  90% {
    transform: translate(1px, 2px);
  }
  100% {
    transform: translate(1px, -2px);
  }
}

.submit-btn:hover {
  transform: scale(1.1);
}
</style>
