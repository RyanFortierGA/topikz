<template>
  <div class="flex align-items-center justify-content-center overflow-hidden signupPage">
    <img src="~/assets/images/signup_img.png"/>
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width: 80%">
      <div class="formWrapper">
          <div class="w-full md:w-10 mx-auto">
            <h1>Sign Up</h1>
            <Form @submit="onSubmit" :validation-schema="schema" @invalid-submit="onInvalidSubmit">
              <TextInput
                name="email"
                type="email"
                label="E-mail"
                placeholder="Your email address"
              />
              <TextInput
                name="password"
                type="password"
                label="Password"
                placeholder="Your password"
                success-message="Nice and secure!"
              />
              <Button
                :label="disabled ? 'Please wait...' : 'Sign Up'"
                class="w-full p-3 text-xl submit-btn"
                ref="submitBtn"
                type="submit"
                :disabled="disabled"
              />
              <NuxtLink to="/login">Already have an account? Login!</NuxtLink>
            </Form>
          </div>
        </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Form } from 'vee-validate'
import '~/utils/vee-validate-rules'
// import { User } from '~/models/User'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import TextInput from '~/components/TextInput.vue'

localStorage.setItem('freeCount', 0)

const { $toast, $firebaseAuth } = useNuxtApp()
const user$ = useUser()
const disabled = ref(false)
const signinForm = ref({ email: '', password: '' })
const submitBtn = ref()
const token = useCookie('token')

const schema = ref({
  email: 'required|email',
  password: 'required|min:8'
})

const signup = async () => {
  if (signinForm.value.email || signinForm.value.password) disabled.value = true
  try {
    const { user } = await createUserWithEmailAndPassword(
      $firebaseAuth,
      signinForm.value.email,
      signinForm.value.password
    )
    user$.value = user as User
    token.value = user$.value.accessToken || ''
    navigateTo('/account?new=true')
  } catch (error) {
    $toast.add({ severity: 'error', summary: 'Error Message', detail: error, life: 3000 })
    signinForm.value = { email: '', password: '' }
    disabled.value = false
  }
}

function onSubmit({ email = '', password = '' }) {
  signinForm.value = { email, password }
  signup()
}

function onInvalidSubmit() {
  submitBtn.value.classList.add('invalid')
  setTimeout(() => {
    submitBtn.value.classList.remove('invalid')
  }, 1000)
}
</script>
<style lang="scss" scoped>
.signupPage{
  height: calc(100vh - 150px);
  img{
     top: 66px;
     left: -18px;
     position: absolute;
     object-fit: cover;
     object-position: top center;
     width: calc(100% + 18px);
     opacity: 0.2;
     height: calc(100vh);
  }
}
.submit-btn {
  background: #E36414;
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
.formWrapper{
  padding: 24px;
  border-radius:24px;
  width: 100%;
  position: relative;
  z-index: 999;
  h1{
    text-align: center;
    margin: 0px;
    display: block;
    margin-bottom: 16px;
  }
}
</style>
