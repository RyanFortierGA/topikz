<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
  import useUser from "~/composables/useUser"

  const user = useUser()
  const router = useRouter()
  const route = useRoute()

  const loginRoutes = ['/login', '/signup']
  const checkPath = () => {
    if(process.client) {
      //setting local
      if(user.value){
        console.log(user.value.email)
        localStorage.setItem("localUser", user.value.email)
      }
      //page checks
      console.log(localStorage.active)
      // if (localStorage.localUser && localStorage.active !== 'false' || route.path === 'accountManagement') {
      //     // continue on 
      // } else {
        // if(localStorage.localUser){
        //   router.push('/account')
        // }else{
        //   if(!loginRoutes.includes(route.path))
        //   router.push('/')
        // }
      // }
      if(route.path === 'member'){
        if(localStorage.localUser && localStorage.active !== 'false'){
        }else{
            if(localStorage.localUser){
              router.push('/account')
          } else  {
            router.push('/')
          }
        }
      } else if(route.path === 'account'){
        if(localStorage.localUser){
        } else {
          router.push('/login')
        }
      }
    }

  }

  const curPath = computed(() => {
      return route.path
  })
  checkPath()
  watch(() => curPath, (newPath) => {
    if (newPath) {
      setTimeout(() => {
        checkPath()
      }, 500);
    }
  }, { deep: true })

</script>
<style lang="scss">

</style>