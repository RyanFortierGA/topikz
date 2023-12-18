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
  const checkScreenSize = () => {
    if (process.client) {
      if (window.innerWidth > 768) {
        alert('It appears you are using a desktop device, please use a mobile device to get the best experience on this site. ');
      }
    }
  }

  const curPath = computed(() => {
      return route.path
  })

  checkScreenSize();
  if (process.client) {
    checkPath()
  }
  watch(() => curPath, (newPath) => {
    if (newPath) {
      setTimeout(() => {
        checkPath()
      }, 500);
    }
  }, { deep: true })

</script>
<style lang="scss">
body{
  &::-webkit-scrollbar {
    display: none;
  }
}

</style>