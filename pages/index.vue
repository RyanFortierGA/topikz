<template>
  <div class="home">
    <h1>Lets Talk...</h1>
    <DefaultCard v-if="currentCard.type && ['convo'].includes(currentCard.type)" :info="currentCard"/>
    <DraftCard v-if="currentCard.type && ['draft'].includes(currentCard.type)" :info="currentCard"/>
    <ThreeBackground v-if="currentCard.type"/>
    <svg class="loader" v-else version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
        <rect x="20" y="50" width="4" height="10" fill="#fff">
          <animateTransform attributeType="xml"
            attributeName="transform" type="translate"
            values="0 0; 0 20; 0 0"
            begin="0" dur="0.6s" repeatCount="indefinite" />
        </rect>
        <rect x="30" y="50" width="4" height="10" fill="#fff">
          <animateTransform attributeType="xml"
            attributeName="transform" type="translate"
            values="0 0; 0 20; 0 0"
            begin="0.2s" dur="0.6s" repeatCount="indefinite" />
        </rect>
        <rect x="40" y="50" width="4" height="10" fill="#fff">
          <animateTransform attributeType="xml"
            attributeName="transform" type="translate"
            values="0 0; 0 20; 0 0"
            begin="0.4s" dur="0.6s" repeatCount="indefinite" />
        </rect>
    </svg>
    <div class="ad">
      <!-- <adsbygoogle /> -->
    </div>
    <span class="topicSelector">Topic Types<Icon name="jam:message-writing" /></span>
    <span class="leaderboardSelector">Leaderboard<Icon name="tdesign:leaderboard" /></span>
  </div>
</template>
<script>
import ThreeBackground from '../components/ThreeBackground.vue';
import DefaultCard from '../components/cards/DefaultCard.vue';
import DraftCard from '../components/cards/DraftCard.vue';

export default {
  setup() {
    const getCards =`
      *[_type == "card"] {
        _id,
        type,
        heading,
        description
      }
    `
    const { data: cards } = useSanityQuery(getCards)
    return { cards }
  },
  components:{ThreeBackground, DefaultCard, DraftCard},

  data() {
    return{
      chosenFilters: ['convo', 'draft', 'guessCompany'],
      currentCard: {},
      cardInfo: {
        convo:{
          label: 'Casual Conversation',
          description: "There isn't much to be said about this type of topic, its simply to help facilatate conversation in your group"
        },
        draft:{
          label: 'Draft War',
          description: "War has begun, and the only way to settle this is by assembling a team of 5 that best fits the prompt. Take turns going back and forth and adding a selection to your team, and after finishing you decide who has won the war."
        },
        guessCompany:{
          label: 'Guess the Company',
          description: "guess the company description"
        }
      }
    }
  },

  mounted(){
    if(this.cards){
      console.log(this.cards)
      this.getTopic()
    }
  },
  methods:{
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    getTopic(){
      const includedCards = []
      this.cards.forEach(card => {
        if(this.chosenFilters.includes(card.type)){
          includedCards.push(card)
        }
      });
      const index = this.getRandomInt(includedCards.length)
      this.currentCard = includedCards[index]
      this.currentCard.label = this.cardInfo[this.currentCard.type].label
      this.currentCard.description = this.cardInfo[this.currentCard.type].description
      console.log(this.currentCard)
    }
  }
}
</script> 
<style lang="scss" scoped>
.home{
    height: calc(100vh - 93px);
    z-index:  999;
    h1{
      margin-top: 0px;
      position: relative;
      z-index: 999;
      text-align: center;
    }
    .topicSelector, .leaderboardSelector{
      position: fixed;
      right: -52px;
      transform: rotate(270deg);
      background: #fff;
      padding: 4px 12px;
      color: #280000;
      border: 1px solid #280000;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: 400ms cubic-bezier(0.075, 0.82, 0.165, 1);
      cursor: pointer;
      top: 68%;
      &:hover{
        background: #280000;
        color: #fff;
        border: 1px solid #fff;
      }
    }
    .leaderboardSelector{
      right: -56px;
      top: 88%;
    }
    .loader{
      margin: auto;
      display: block;
      left: 100px;
      position: absolute;
      width: 300px;
      height: 300px;
    }
}
</style>
