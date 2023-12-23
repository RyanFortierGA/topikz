<template>
    <div class="draftCard card" >
        <div :class="[learnOpen? 'cardWrap showDetails' : 'cardWrap', info.type]">
            <span v-if="info.icon" class="topic"><Icon :name="info.icon" />{{info.label}}</span>
            <h2>{{info.heading}}</h2>
            <h4 v-if="!gaOpen">How it Works:</h4>
            <p v-if="!gaOpen">{{info.description}}</p>
            <div class="gameArea" v-else>
                <div class="option" @click="showTruth = true">
                    <h4 :class="showTruth?'subHeader hide' : 'subHeader truthHead'" >Truth</h4>
                    <span :class="showTruth?'showOpt' : 'hide'">{{info.truth}}</span> 
                </div>
                <h3>OR</h3>
                <div class="option" @click="showDare = true">
                    <h4 :class="showDare?'subHeader hide' : 'subHeader dareHead'" >Dare</h4>
                    <span :class="showDare?'showOpt' : 'hide'">{{info.dare}}</span> 
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
            showDare: false
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
            color: #2f8c70;
            border: 1px solid #2f8c70;
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
            margin-bottom: 32px;
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
            gap: 16px;
            margin-bottom: 12px;
            .option{
                display: flex;
                flex-direction: column;
                justify-content: center;
                z-index: 999;
            }
            h3{
                margin: 0px;
            }
            .subHeader{
                font-size: 20px;
                transition: 1s;
            }
            .truthHead{
                border-radius: 100px;
                padding: 10px 24px;
                background: #14ace3;
                color: #fff;
            }
            .dareHead{
                border-radius: 100px;
                padding: 10px 24px;
                background: #e31414;
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
        }
    }
    .showDetails{
        height: 122px;
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
        display: flex;
        flex-direction: column;
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
            display: flex;
            font-family: Nunito-bold;
            font-size: 18px;
            align-self: center;
        }
    }
    
}
</style>