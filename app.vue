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

  const loginRoutes = ['/login', '/signup', 'accountManagement', '/']
  const checkPath = () => {
    if(process.client) {
      //setting local
      if(user.value){
        console.log(user.value.email)
        localStorage.setItem("localUser", user.value.email)
      }
      //page checks
      if (localStorage.localUser && localStorage.active !== 'false') {
        if(route.path === '/'){
          router.push('/member')
        }
      } else {
        if(localStorage.localUser){
          if(route.path === '/member'){
            router.push('/account')
          }
        }else{
          if(!loginRoutes.includes(route.path))
          router.push('/')
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