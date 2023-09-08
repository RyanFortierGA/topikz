<template>
    <div class="defaultCard" data-aos="fade-down" data-aos-delay="300">
      <span>Topic Type: {{info.label}}</span>
      <h2>{{info.heading}}</h2>
      <h4>How it Works:</h4>
      <p>{{info.description}}</p>
    </div>
</template>

<script>
export default {
    props:{
        info:{
            type: Object
        }
    }
}
</script>

<style lang="scss" scoped>
    .defaultCard{
      margin: 18px;
      position: relative;
      left: -18px;
      width: 100%;
      background: #59C9A5;
      box-shadow: 0 -6px 24px rgba(0, 0, 0, 0.36);
      border-radius: 16px;
      z-index: 999;
      padding: 24px;
        span{
            opacity: 0.6;
            text-align: center;
            text-transform: uppercase;
            font-size: 10px;
            display: block;
            font-family: Nunito-bold;
            margin-bottom: 8px;
        }
        h2{
            margin-top: 0px;
            text-align: center;
            text-decoration: underline;
            font-size: 24px;
            margin-bottom: 16px;
        }
        h4{
            font-size: 14px;
            margin-top: 0px;
            margin-bottom: 8px;
        }
        p{
            margin: 0px;
            opacity: 0.6;
        }
    }
</style>