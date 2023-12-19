<template>
</template>

<script>

export default {
  mounted(){
    localStorage.clear();
    this.$nuxt.$toast.add({ severity: 'success', summary: 'Error Message', detail: 'Reset successful', life: 3000 })
    setTimeout(() => {
        this.$router.push('/');
    }, 200);
  },
  name: 'reset'
}
</script>

