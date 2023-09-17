<template>
  <div class="home">
    <h1>Lets Talk Member...</h1>
    <DefaultCard v-if="currentCard.type && ['convo'].includes(currentCard.type)" :info="currentCard"/>
    <DraftCard v-if="currentCard.type && ['draft'].includes(currentCard.type)" :info="currentCard"/>
    <Controls v-if="currentCard.type" @rollNew="getTopic()"/>
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
  </div>
</template>
<script>
import Controls from '../components/Controls.vue';
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
  components:{Controls, DefaultCard, DraftCard},

  data() {
    return{
      chosenFilters: ['convo', 'draft', 'guessCompany'],
      currentCard: {},
      cardInfo: {
        convo:{
          label: 'Casual Conversation',
          description: "There isn't much to be said about this type of topic, its simply to help facilatate conversation in your group",
          details: 'details'
        },
        draft:{
          label: 'Draft War',
          description: "War has begun, and the only way to settle this is by assembling a team of 5 that best fits the prompt.",
          details: 'Take turns going back and forth and adding a selection to your team. Once a choice has been made, the other team can not draft that option as they are now off the table. After finishing you decide who has won the war.'
        },
        guessCompany:{
          label: 'Guess the Company',
          description: "guess the company description",
          details: 'details'
        }
      }
    }
  },

  mounted(){
    if(this.cards){
      this.getTopic()
    }
  },
  methods:{
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    getTopic(){
      const cur = localStorage.getItem('currentType')
      const includedCards = []
      this.cards.forEach(card => {
        if(this.chosenFilters.includes(card.type)){
          includedCards.push(card)
        }
      });
      const index = this.getRandomInt(includedCards.length)
      if(cur && cur === includedCards[index].type && this.chosenFilters.length > 1){
        this.getTopic()
      }else{
        this.currentCard = includedCards[index]
        this.currentCard.label = this.cardInfo[this.currentCard.type].label
        this.currentCard.description = this.cardInfo[this.currentCard.type].description
        this.currentCard.details = this.cardInfo[this.currentCard.type].details
        localStorage.setItem("currentType", this.currentCard.type)
      }
    }
  }
}
</script> 
<style lang="scss" scoped>
.home{
    h1{
      margin-top: 0px;
      margin-bottom: 0px;
      position: relative;
      z-index: 999;
      text-align: center;
      color: #fff;
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
      top:20%;
      z-index: 999;
      &:hover{
        background: #280000;
        color: #fff;
        border: 1px solid #fff;
      }
    }
    .leaderboardSelector{
      width: fit-content;
      left: -56px;
      top: 20%;
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
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
