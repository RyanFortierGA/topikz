<template>
    <div class="draftCard card" >
        <div :class="[learnOpen? 'cardWrap showDetails' : 'cardWrap', info.type]">
            <span v-if="info.icon" class="topic"><Icon :name="info.icon" />{{info.label}}</span>
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
                font-size: 20px;
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
    .familyConvo .topic{
        color: #e84f20;
        border: 1px solid #e84f20;
    }
    .politicalConvo .topic{
        color: #2ab865;
        border: 1px solid #2ab865;
    }
    .dateConvo .topic{
        color: #c61470;
        border: 1px solid #c61470;
    }
    .wyrConvo .topic{
        color: #94512a;
        border: 1px solid #94512a;
    }
    .newsConvo .topic{
        color: #71cfeb;
        border: 1px solid #71cfeb;
    }
    .philConvo .topic{
        color: #8c8c8c;
        border: 1px solid #8c8c8c;
    }
    .hardConvo .topic{
        color: #2a6a15;
        border: 1px solid #2a6a15;
    }
    .hotConvo .topic{
        color: #d00c19;
        border: 1px solid #d00c19;
    }
    .ovoComp .topic{
        color: #d750ac;
        border: 1px solid #d750ac;
    }
    .fivesecComp .topic{
        color: #5041ae;
        border: 1px solid #5041ae;
    }
    .foundedComp .topic{
        color: #797936;
        border: 1px solid #797936;
    }
    .celebComp .topic{
        color: #482203;
        border: 1px solid #482203;
    }
    .mlComp .topic{
        color: #8fd7af;
        border: 1px solid #8fd7af;
    }
    .dykGame .topic{
        color: #3d2e4a;
        border: 1px solid #3d2e4a;
    }
    .likelyGroups .topic{
        color: #292811;
        border: 1px solid #292811;
    }
    .splitGroups .topic{
        color: #85a45a;
        border: 1px solid #85a45a;
    }
}
</style>