<template>
  <div
    ref='modalAd'
    :class="open ? 'modal openModal' : 'modal' "
  >
    <div id='modalContentAd' class='modalContent'>
      <div class="adWrap">
        <Adsbygoogle />
      </div>
      <div class="adWrap">
        <Adsbygoogle />
      </div>
      <div class="info">
        <h4>Go Unlimited for Less than one coffee a month!</h4>
        <ul>
          <li>No ADs</li>
          <li>28+ Topik types</li>
          <li>Filter by the Types you want to play</li>
          <li>Over 600 prompts and counting</li>
          <li>Keep a scorecard for you and your friends</li>
          <li>More Types and content added often</li>
        </ul>
        <div class="buttons">
          <NuxtLink :to="'/signup'">Go Unlimited</NuxtLink>
          <span @click="handleClose" :class="canContinue? 'active' : ''">Continue Chatting</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        canContinue: true,
      }
    },
    props: {
      open: {
        type: Boolean
      },
      size: {
        type: String,
        default: 'normal'
      }
    },
    mounted() {
      window.addEventListener('keyup', this.handleEsc)
    },
    updated(){
      if(!this.canContinue && this.open){
        setTimeout(() => {
          this.canContinue = true
        }, 5000);
      }
    },
    beforeDestroy() {
      window.removeEventListener('keyup', this.handleEsc)
    },
    methods: {
      handleEsc(e) {
        if (e.key === 'Escape') {
          this.handleClose()
        }
      },
      handleClose() {
        if (!this.open) return
        this.canContinue = false;
        this.$emit('onClose')
      },
    },
  }
</script>

<style lang='scss' scoped>
  .modal {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: 500ms cubic-bezier(0.075, 0.82, 0.165, 1);
    z-index: 10000;
    overflow: scroll;
    pointer-events: none;
    .modalContent {
      padding: 18px;
      width: 100%;
      height: 100% !important;
      position: relative;
      background: rgba(255, 255, 255, 1);
      h2 {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 16px;
      }

      .close {
        font-family: unset;
        display: block;
        position: absolute;
        top: 16px;
        right: 24px;
        font-weight: 400;
        font-size: 24px;
        line-height: 24px;
        z-index: 99999;
        cursor: pointer;
      }
    }
  }

  .openModal {
    opacity: 1;
    pointer-events: all;
  }

  .adWrap{
    min-width: 100%;
    max-width: 100%;
    min-height: 160px;
    max-height: 160px;
    margin-bottom: 8px;
  }
  .info{
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 8px;
    h4{
      margin-bottom: 0px;
      font-size: 20px;
      text-align: center;
      margin-top: 0px;
    }
    ul{
      padding: 0px;
      color: #14e31b;
      margin: 0px;
    }
    .buttons{
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top:8px;
      a{
        border-radius: 100px;
        padding: 4px 12px;
        background: #14e31b;
        color: #fff;
        text-decoration: none;
        font-size: 20px;
      }
      span{
        opacity:0.4;
        pointer-events: none;
      }
      .active{
        opacity:1;
        pointer-events: all;
      }
    }
  }

</style>
