<template>
    <div class="draftCard card" >
        <div :class="[learnOpen? 'cardWrap showDetails' : 'cardWrap', info.type]">
            <span v-if="info.icon" class="topic"><Icon :name="info.icon" />{{info.label}}</span>
            <h2>{{info.heading}}</h2>
            <h4 v-if="!gaOpen">How it Works:</h4>
            <p v-if="!gaOpen">{{info.description}}</p>
            <div class="gameArea" v-else>
                <div class="clue">
                    <h4 :class="clue1?'subHeader hide' : 'subHeader clue1'" @click="clue1 = true">Clue 1:</h4>
                    <span :class="clue1?'showOpt' : 'hide'">{{info.clue1}}</span> 
                </div>
                <div class="clue">
                    <h4 :class="clue2?'subHeader hide' : 'subHeader clue2'" @click="clue2 = true">Clue 2:</h4>
                    <span :class="clue2?'showOpt' : 'hide'">{{info.clue2}}</span> 
                </div>
                <div class="clue">
                    <h4 :class="clue3?'subHeader hide' : 'subHeader clue3'" @click="clue3 = true">Clue 3:</h4>
                    <span :class="clue3?'showOpt' : 'hide'">{{info.clue3}}</span> 
                </div>
                <div class="clue">
                    <h4 :class="answer?'subHeader hide' : 'subHeader answer'" @click="answer = true">Answer</h4>
                    <span :class="answer?'answerOpt' : 'hide'">{{info.answer}}</span> 
                </div>
            </div>
            <span class="selector" @click="gaOpen = !gaOpen" v-if="!gaOpen">START</span>
        </div>
        <div class="description">
            <h4 v-if="learnOpen">The Details:</h4>
            <p v-if="learnOpen">{{info.details}}</p>
            <span v-if="!learnOpen" @click="learnOpen = !learnOpen">Learn More <Icon name="mingcute:finger-press-fill" /></span>
            <span class="selector" v-else @click="startFinal">{{gaOpen? 'CONTINUE' : 'START'}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        info:{
            type: Object
        },
        reset: {
            type: Boolean
        }
    }, 
    data() {
        return{
            gaOpen: false,
            learnOpen: false,
            showTruth: false,
            showDare: false,
            clue1: false,
            clue2: false,
            clue3: false,
            answer: false
        }
    },
    methods:{
        startFinal(){
            this.gaOpen = true
            setTimeout(() => {
                this.learnOpen = false
            }, 300);
        }
    },

    watch: {
        reset(value) {
            if(value){
                this.gaOpen = false
                this.learnOpen = false
            } 
        },
    },
}
</script>

<style lang="scss" scoped>
.card{
    position: relative;
    height: 400px;
    .cardWrap{
        margin: 18px;
        margin-bottom: 108px;
        position: relative;
        left: -18px;
        width: 100%;
        background: #fff;
        box-shadow: 0 -6px 24px rgba(0, 0, 0, 0.36);
        border-radius: 24px;
        z-index: 999;
        padding: 24px;
        height: 330px;
        transition: 600ms cubic-bezier(0.075, 0.82, 0.165, 1);
        overflow: hidden;
        .topic{
            text-align: center;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: Nunito-bold;
            color: #59369f;
            border: 1px solid #59369f;
            padding: 4px 8px;
            width: fit-content;
            border-radius: 8px;
            margin: auto;
            margin-bottom: 8px;
        }
        h2{
            margin-top: 0px;
            text-align: center;
            font-size: 20px;
            margin-bottom: 16px;
            letter-spacing: 0.1px;
            height: 54px;
        }
        h4{
            font-size: 16px;
            margin-top: 0px;
            margin-bottom: 4px;
        }
        p{
            margin: 0px;
            margin-bottom: 32px;
        }
        .selector{
            border-radius: 100px;
            padding: 10px 24px;
            background: #E36414;
            color: #fff;
            width: fit-content;
            margin: auto;
            display: block;
            font-family: Nunito-bold;
        }
        .gameArea{
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            gap: 8px;
            margin-bottom: 12px;
            .clue{
                display: flex;
                flex-direction: column;
                justify-content: center;
                z-index: 999;
            }
            .subHeader{
                margin-bottom: 16px;
                font-size: 20px;
                transition: 1s;
            }
            .clue1{
                border-radius: 100px;
                padding: 10px 24px;
                background: #e31414;
                color: #fff;
            }
            .clue2{
                border-radius: 100px;
                padding: 10px 24px;
                background: #d5ce13;
                color: #fff;
            }
            .clue3{
                border-radius: 100px;
                padding: 10px 24px;
                background: #14e0e3;
                color: #fff;
            }
            .answer{
                border-radius: 100px;
                padding: 10px 24px;
                background: #14e31b;
                color: #fff;
            }
            .hide{
                position: absolute;
                opacity: 0;
            }
            .showOpt{
                display: block;
                opacity: 1;
                position: relative;
            }
            .answerOpt{
                color: #14e31b;
                font-size: 24px;
            }
        }
    }
    .showDetails{
        height: 130px;
    }
    .description{
        position: absolute;
        top: 60px;
        background: #E36414;
        width: 100%;
        left: 0px;
        border-bottom-right-radius: 24px;
        border-bottom-left-radius: 24px;
        height: 330px;
        z-index: 1;
        color: #fff;
        h4{
            position: relative;
            font-size: 16px;
            margin-top: 0px;
            margin-bottom: 4px;
            top: 60px;
            padding: 24px;
        }
        p{
            position: relative;
            margin: 0px;
            margin-bottom: 32px;
            top: 14px;
            padding: 24px;
        }
        span{
            position: absolute;
            bottom: 15px;
            font-size: 20px;
            color: #fff;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
        }
        .selector{
            border-radius: 100px;
            padding: 8px 12px;
            background: #fff;
            color: #E36414;
            width: fit-content;
            margin: auto;
            display: block;
            font-family: Nunito-bold;
            font-size: 18px;
            left: 36%;
        }
    }
    
}
</style>