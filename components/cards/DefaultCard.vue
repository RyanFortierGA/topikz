<template>
    <div class="draftCard card" data-aos="flip-left" data-aos-delay="300">
        <div :class="learnOpen? 'cardWrap showDetails' : 'cardWrap'">
            <span class="topic"><Icon name="bx:bxs-conversation" />{{info.label}}</span>
            <h2>{{info.heading}}</h2>
            <h4 v-if="!gaOpen">How it Works:</h4>
            <p v-if="!gaOpen">{{info.description}}</p>
            <div class="gameArea" v-else>
                <h4 class="subHeader">Well... get to talking!</h4> 
                <div class="icons">
                    <Icon name="tdesign:user-talk-1"/>
                    <Icon name="game-icons:conversation" />
                    <Icon class="mirror" name="tdesign:user-talk-1"/>
                </div>
            </div>
            <span class="selector" @click="gaOpen = !gaOpen" v-if="!gaOpen">START</span>
        </div>
        <div class="description">
            <h4 v-if="learnOpen">The Details:</h4>
            <p v-if="learnOpen">{{info.details}}</p>
            <span v-if="!learnOpen" @click="learnOpen = !learnOpen">Learn More <Icon name="mingcute:finger-press-fill" /></span>
            <span class="selector" v-else @click="startFinal">{{gaOpen? 'Continue' : 'START'}}</span>
        </div>
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
            gaOpen: false,
            learnOpen: false,
        }
    },
    methods:{
        startFinal(){
            this.learnOpen = false
            setTimeout(() => {
                this.gaOpen = true
            }, 600);
        }
    }
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
            gap: 8px;
            margin-bottom: 12px;
            .subHeader{
                margin-bottom: 16px;
            }
            .icons{
                display: flex;
                align-items: center;
                gap: 16px;
                position: relative;
                svg{
                    width: 64px;
                    height: 64px;
                }
                .mirror{
                    transform: scaleX(-1);
                }
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
        z-index: -1;
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