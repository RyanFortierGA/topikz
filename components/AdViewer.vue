<template>
  <div
    ref='modalAd'
    :class="open ? 'modal openModal' : 'modal' "
  >
    <div id='modalContentAd' ref="modalContent" class='modalContent'>
      <div class="adWrap">
        <Adsbygoogle />
      </div>
      <div class="adWrap">
        <Adsbygoogle />
      </div>
      <div class="info">
        <h4>Go Pro for Less than a dollar/month!</h4>
        <ul>
          <li>No ADs, Just conversation</li>
          <li>28+ Topik types & Growing prompts library</li>
          <li>Filter by the Types you want to play</li>
          <li>Keep a scorecard for you and your friends</li>
        </ul>
        <div class="buttons">
          <NuxtLink :to="'/signup'">Try pro today</NuxtLink>
          <span @click="handleClose" :class="canContinue? 'active countdown' : 'countdown'">Continue Chatting <p v-if="!canContinue">({{countdown}})</p></span>
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
        countdown: 10
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
    watch: {
    open(newVal, oldVal) {
      if(newVal && !this.canContinue){
          let countdownInterval = setInterval(() => {
            this.countdown = (this.countdown -= 1);
          }, 1000);
          setTimeout(() => {          
            this.canContinue = true
            clearInterval(countdownInterval);
            this.countdown = 10
          }, 10000);
        }
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
    background: #fff;
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
    margin-bottom: 4px;
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
      color: #E36414;
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
        background: #E36414;
        color: #fff;
        text-decoration: none;
        font-size: 20px;
      }
      span{
        opacity:0.4;
        pointer-events: none;
        display: flex;
        align-items: center;
        gap: 4px;
        width: 154px;
        white-space: pre;
        p{
          margin: 0px;
        }
      }
      .active{
        opacity:1;
        pointer-events: all;
      }
    }
  }

</style>
