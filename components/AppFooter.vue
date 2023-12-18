<template>
  <footer class="footer">
    <NuxtLink :to="amRoute">Account Management</NuxtLink>
    <div class="bar">.</div>
    <div class="bottom">
      <span>Copyright 2023</span>
      <span>|</span>
      <NuxtLink to="/terms">Terms & Privacy</NuxtLink>
    </div>
  </footer>
</template>

<script>

export default {
  data() {
    return {
      stripeId: null,
      isSubscribed: true,
      amRoute: null
    };
  },
  async mounted() {
    this.stripeId = localStorage.getItem('stripeId')
    if(localStorage.localUser && localStorage.active !== 'false'){
      this.amRoute = '/accountManagement'
      } else{
      this.amRoute = '/login'
    }
  },
  watch: {
    stripeId(value) {
      if(value){
        this.isSubscribed = true
      }
    },
    '$route'() {
      this.handleRouteChange();
    }
  },
  methods: {
        handleRouteChange() {
          if(localStorage.localUser && localStorage.active !== 'false'){
            this.amRoute = '/accountManagement'
          } else{
            this.amRoute = '/login'
          }
        }
    }
};
</script>
<style lang="scss" scoped>
  .footer {
    padding: 12px;
    padding-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Nunito-bold;
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 8px;
    bottom: 0;
    color: #fff;
    height: 84px;
    position: relative;
    z-index: 1000;
    margin-top:24px;
    .bar{
      background: #fff;
      height: 1px;
      width: 100%;
      opacity: 1;
      font-size: 1px;
    }
    a{
      color: #fff;
    }
    .bottom{
      display: flex;
      align-items: center;
      gap: 8px;
      justify-content: center;
      padding-bottom: 12px;
    }
  }
</style>