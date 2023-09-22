<template>
    <div class="draftCard card" >
        <div :class="[learnOpen? 'cardWrap showDetails' : 'cardWrap', info.type]">
            <span v-if="info.icon" class="topic"><Icon :name="info.icon" />{{info.label}}</span>
            <h2>{{info.heading}}</h2>
            <h4 v-if="!gaOpen">How it Works:</h4>
            <p v-if="!gaOpen">{{info.description}}</p>
            <div class="gameArea" v-else>
                <h4 class="subHeader" v-if="info.type !== 'simplifyGroups'">The Answer is:</h4> 
                <h4 class="subHeader wordHeader" v-else>The word is:</h4> 

                <div class="answer" v-if="info.type !== 'simplifyGroups'">
                    <Icon name="icon-park-solid:correct"/>
                    {{info.answer}}
                </div>
                <div class="word" v-else>
                    {{info.answer}}
                </div>
            </div>
            <span class="selector" @click="gaOpen = !gaOpen" v-if="!gaOpen">Reveal Answer</span>
        </div>
        <div class="description">
            <h4 v-if="learnOpen">The Details:</h4>
            <p v-if="learnOpen">{{info.details}}</p>
            <span v-if="!learnOpen" @click="learnOpen = !learnOpen">Learn More <Icon name="mingcute:finger-press-fill" /></span>
            <span class="selector" v-else @click="startFinal">{{gaOpen? 'Reveal' : 'Reveal'}}</span>
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
            color: #FFB930;
            border: 1px solid #FFB930;
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
            height: 74px;
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
            .subHeader{
                margin-bottom: 16px;
                font-size: 20px;
                color: #2a6a15;
            }
            .wordHeader{
                color: #3e2e33;
            }
            .answer{
                display: flex;
                align-items: center;
                gap: 4px;
                position: relative;
                border: 1px solid #2ab865;
                color: #2ab865;
                padding: 8px 12px;
                border-radius: 100px;
                font-size: 18px;
                text-align: center;
                svg{
                    width: 32px;
                    height: 32px;
                    color: #2ab865;
                }
            }
            .word{
                display: flex;
                align-items: center;
                gap: 4px;
                position: relative;
                border: 1px solid #3e2e33;
                color: #3e2e33;
                padding: 8px 12px;
                border-radius: 100px;
                font-size: 18px;
                text-align: center;
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
    .riddleConvo .topic{
        color: #60ee39;
        border: 1px solid #60ee39;
    }
    .triviaComp .topic{
        color: #c14a65;
        border: 1px solid #c14a65;
    }
    .ftlComp .topic{
        color: #c65804;
        border: 1px solid #c65804;
    }
    .castComp .topic{
        color: #283b6c;
        border: 1px solid #283b6c;
    }
    .songComp .topic{
        color: #39044b;
        border: 1px solid #39044b;
    }
    .syncedGame .topic{
        color: #ce3e6c;
        border: 1px solid #ce3e6c;
    }
    .simplifyGroups .topic{
        color: #3e2e33;
        border: 1px solid #3e2e33;
    }
}
</style>