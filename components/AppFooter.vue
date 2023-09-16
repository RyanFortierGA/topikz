<template>
  <footer class="footer">
    <NuxtLink to="/accountManagement">Account Management</NuxtLink>
    <div class="bar"/>
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
      isSubscribed: true
    };
  },
  async mounted() {
    this.stripeId = localStorage.getItem('stripeId')
  },
  watch: {
    stripeId(value) {
      if(value){
        this.isSubscribed = true
      }
    },
  },
};
</script>
<style lang="scss" scoped>
  .footer {
    background: #B10F2E;
    box-shadow: 0 -6px 24px rgba(0, 0, 0, 0.36);
    padding: 12px;
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
    .bar{
      background: #280000;
      height: 1px;
      width: 100%;
      opacity: 0.4;
    }
    a{
      color: #fff;
    }
    .bottom{
      display: flex;
      align-items: center;
      gap: 8px;
      justify-content: center;
    }
  }
</style>