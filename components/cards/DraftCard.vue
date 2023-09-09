<template>
    <div class="draftCard" data-aos="fade-down" data-aos-delay="300">
      <span>Topic Type: {{info.label}}</span>
      <h2>{{info.heading}}</h2>
      <h4 v-if="!draftStarted">How it Works:</h4>
      <p v-if="!draftStarted">{{info.description}}</p>
      <div class="gameArea" v-else>
            <div class="left">
                <input type="text" placeholder="Team 1 Round #1"/>
                <input type="text" placeholder="Team 1 Round #2"/>
                <input type="text" placeholder="Team 1 Round #3"/>
                <input type="text" placeholder="Team 1 Round #4"/>
                <input type="text" placeholder="Team 1 Round #5"/>
            </div>
            <div class="right">
                <input type="text" placeholder="Team 2 Round #1"/>
                <input type="text" placeholder="Team 2 Round #2"/>
                <input type="text" placeholder="Team 2 Round #3"/>
                <input type="text" placeholder="Team 2 Round #4"/>
                <input type="text" placeholder="Team 2 Round #5"/>
            </div>
      </div>
      <span class="selector" @click="draftStarted = !draftStarted"> {{draftStarted? 'View Instructions' : 'Get Drafting'}}</span>
    </div>
</template>

<script>
export default {
    props:{
        info:{
            type: Object
        }
    }, 
    data() {
        return{
            draftStarted: false
        }
    }
}
</script>

<style lang="scss" scoped>
    .draftCard{
      margin: 18px;
      position: relative;
      left: -18px;
      width: 100%;
      background: #59C9A5;
      box-shadow: 0 -6px 24px rgba(0, 0, 0, 0.36);
      border-radius: 16px;
      z-index: 999;
      padding: 16px;
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
        .selector{
            border-radius: 100px;
            padding: 4px 12px;
            background: #fff;
            width: fit-content;
            opacity: 1;
            margin: auto;
        }
        .gameArea{
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 12px;
            .left,.right{
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            input{
                border: none;
                border-radius: 8px;
                padding: 4px 8px;
                max-width: 38vw;
            }
        }
    }
</style>