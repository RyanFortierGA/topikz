<template>
  <div :class="['home', filterOpen?'disableCards' :'']">
    <h1>Lets Talk...</h1>
    <transition name="flip">
      <DefaultCard class="cardWrap" v-if="currentCard.type === 'casualConvo'" :info="currentCard" :reset="reset"/>
    </transition>
    <transition name="flap">
      <DefaultCard class="cardWrap" v-if="currentCard.type === 'familyConvo'" :info="currentCard" :reset="reset"/>
    </transition>
    <transition name="flip">
      <DraftCard class="cardWrap" v-if="currentCard.type === 'draftGame'" :info="currentCard" :reset="reset"/>
    </transition>
    <transition name="flap">
      <DefaultCard class="cardWrap" v-if="currentCard.type === 'politicalConvo'" :info="currentCard" :reset="reset"/>
    </transition>
    <transition name="flip">
      <DefaultCard class="cardWrap" v-if="currentCard.type === 'dateConvo'" :info="currentCard" :reset="reset"/>
    </transition>
    <transition name="flap">
      <DefaultCard class="cardWrap" v-if="currentCard.type === 'wyrConvo'" :info="currentCard" :reset="reset"/>
    </transition>
    <transition name="flip">
      <DefaultCard class="cardWrap" v-if="currentCard.type === 'newsConvo'" :info="currentCard" :reset="reset"/>
    </transition>
    <transition name="flap">
      <DefaultCard class="cardWrap" v-if="currentCard.type === 'philConvo'" :info="currentCard" :reset="reset"/>
    </transition>
    <transition name="flip">
      <DefaultCard class="cardWrap" v-if="currentCard.type === 'hardConvo'" :info="currentCard" :reset="reset"/>
    </transition>
    <transition name="flap">
      <DefaultCard class="cardWrap" v-if="currentCard.type === 'hotConvo'" :info="currentCard" :reset="reset"/>
    </transition>
    <transition name="flip">
      <DefaultCard class="cardWrap" v-if="currentCard.type === 'ovoComp'" :info="currentCard" :reset="reset"/>
    </transition>
    <transition name="flap">
      <DefaultCard class="cardWrap" v-if="currentCard.type === 'fivesecComp'" :info="currentCard" :reset="reset"/>
    </transition>
    <transition name="flip">
      <DefaultCard class="cardWrap" v-if="currentCard.type === 'foundedComp'" :info="currentCard" :reset="reset"/>
    </transition>
    <transition name="flap">
      <DefaultCard class="cardWrap" v-if="currentCard.type === 'celebComp'" :info="currentCard" :reset="reset"/>
    </transition>
    <transition name="flip">
      <DefaultCard class="cardWrap" v-if="currentCard.type === 'mlComp'" :info="currentCard" :reset="reset"/>
    </transition>
    <transition name="flip">
      <DefaultCard class="cardWrap" v-if="currentCard.type === 'dykGame'" :info="currentCard" :reset="reset"/>
    </transition>
    <transition name="flap">
      <DefaultCard class="cardWrap" v-if="currentCard.type === 'likelyGroups'" :info="currentCard" :reset="reset"/>
    </transition>
    <transition name="flip">
      <DefaultCard class="cardWrap" v-if="currentCard.type === 'splitGroups'" :info="currentCard" :reset="reset"/>
    </transition>
    <transition name="flap">
      <AnswerCard class="cardWrap" v-if="currentCard.type === 'riddleConvo'" :info="currentCard" :reset="reset"/>
    </transition>
     <transition name="flip">
      <AnswerCard class="cardWrap" v-if="currentCard.type === 'triviaComp'" :info="currentCard" :reset="reset"/>
    </transition>
    <transition name="flap">
      <AnswerCard class="cardWrap" v-if="currentCard.type === 'ftlComp'" :info="currentCard" :reset="reset"/>
    </transition>
    <transition name="flip">
      <AnswerCard class="cardWrap" v-if="currentCard.type === 'castComp'" :info="currentCard" :reset="reset"/>
    </transition>
    <transition name="flap">
      <AnswerCard class="cardWrap" v-if="currentCard.type === 'songComp'" :info="currentCard" :reset="reset"/>
    </transition>
    <transition name="flip">
      <AnswerCard class="cardWrap" v-if="currentCard.type === 'syncedGame'" :info="currentCard" :reset="reset"/>
    </transition>
    <transition name="flap">
      <AnswerCard class="cardWrap" v-if="currentCard.type === 'simplifyGroups'" :info="currentCard" :reset="reset"/>
    </transition>
    <transition name="flip">
      <TodCard class="cardWrap" v-if="currentCard.type === 'todConvo'" :info="currentCard" :reset="reset"/>
    </transition>
    <transition name="flap">
      <RevealCard class="cardWrap" v-if="currentCard.type === 'revealComp'" :info="currentCard" :reset="reset"/>
    </transition>
    <transition name="flip">
      <WhoCard class="cardWrap" v-if="currentCard.type === 'whoGame'" :info="currentCard" :reset="reset"/>
    </transition>
    <Controls v-if="currentCard.type" @rollNew="getTopic()" @openFilters="toggleFilters" @openScore="scoreOpen = !scoreOpen"/>
    <svg class="loader" v-else version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
        <rect x="20" y="50" width="4" height="10" fill="#fff">
          <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite" />
        </rect>
        <rect x="30" y="50" width="4" height="10" fill="#fff">
          <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite" />
        </rect>
        <rect x="40" y="50" width="4" height="10" fill="#fff">
          <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite" />
        </rect>
    </svg>
    
    <Leaderboard v-if="loaded" :open='scoreOpen' @onClose='scoreOpen = !scoreOpen'/>
    <Filters v-if="loaded" :open='filterOpen' @onClose='toggleFilters' @updateFilters='updateFilters' :chosenFilters="chosenFilters" :cardInfo="cardInfo"/>
    <AdViewer v-if="loaded" :open='adOpen' @onClose='adReset'/>
  </div>
</template>
<script>
import Controls from '../components/Controls.vue';
import DefaultCard from '../components/cards/DefaultCard.vue';
import DraftCard from '../components/cards/DraftCard.vue';
import AnswerCard from '../components/cards/AnswerCard.vue';
import TodCard from '../components/cards/TodCard.vue';
import RevealCard from '../components/cards/RevealCard.vue';
import WhoCard from '../components/cards/WhoCard.vue';
import Filters from '../components/Filters.vue';
import Leaderboard from '../components/Leaderboard.vue';

export default {
  setup() {
    const getCards =`
      *[_type == "card"] {
        _id,
        type,
        heading,
        description,
        truth,
        dare,
        answer,
        clue1,
        clue2,
        clue3,
        who1,
        who2,
        poll5,
        poll4,
        poll3,
        poll2,
        poll1,
        r1,
        r2,
        r3,
        r4,
        r5,
      }
    `
    const { data: cards } = useSanityQuery(getCards)
    return { cards }
  },
  components:{Controls, DefaultCard, DraftCard, AnswerCard, TodCard, RevealCard, WhoCard, Filters, Leaderboard},

  data() {
    return{
      allFilters: ['casualConvo', 'familyConvo', 'politicalConvo', 'dateConvo', 'wyrConvo', 'newsConvo', 'philConvo','hardConvo', 'hotConvo', 'riddleConvo', 'todConvo', 
      'ovoComp', 'fivesecComp', 'ftlComp', 'triviaComp' ,'foundedComp', 'celebComp', 'mlComp', 'castComp', 'songComp', 'revealComp',
      'dykGame', 'syncedGame', 'whoGame', 'draftGame',
      'likelyGroups', 'simplifyGroups', 'splitGroups',],
      chosenFilters: ['casualConvo', 'familyConvo', 'politicalConvo', 'dateConvo', 'wyrConvo', 'newsConvo', 'philConvo','hardConvo', 'hotConvo', 'riddleConvo', 'todConvo', 
      'ovoComp', 'fivesecComp', 'ftlComp', 'triviaComp' ,'foundedComp', 'celebComp', 'mlComp', 'castComp', 'songComp', 'revealComp',
      'dykGame', 'syncedGame', 'whoGame', 'draftGame',
      'likelyGroups', 'simplifyGroups', 'splitGroups',],
      currentCard: {type:'casualConvo'},
      reset: false,
      loaded: false,
      filterOpen: false,
      adOpen: false,
      scoreOpen: false,
      cardInfo: {
        casualConvo:{
          label: 'Casual Conversation',
          description: "There isn't much to be said about this type of topic, its simply to help facilatate conversation in your group",
          details: 'details',
          icon: 'bx:bxs-conversation',
          hex: '#FFB930'
        },
        familyConvo:{
          label: 'Family Conversation',
          description: "There isn't much to be said about this type of topic, its simply to help facilatate conversation in your Family",
          details: 'details',
          icon: 'carbon:pedestrian-family',
          hex: '#e84f20'
        },
        politicalConvo:{
          label: 'Political Conversation',
          description: "There isn't much to be said about this type of topic, its simply to help facilatate conversation in your Family",
          details: 'details',
          icon: 'map:political',
          hex: '#2ab865'
        },
        dateConvo:{
          label: 'Date Night',
          description: "There isn't much to be said about this type of topic, its simply to help facilatate conversation in your Family",
          details: 'details',
          icon: 'ic:round-favorite',
          hex: '#c61470'
        },
        wyrConvo:{
          label: 'Would You Rather',
          description: "There isn't much to be said about this type of topic, its simply to help facilatate conversation in your Family",
          details: 'details',
          icon: 'game-icons:choice',
          hex: '#94512a'
        },
        newsConvo:{
          label: 'Todays News',
          description: "There isn't much to be said about this type of topic, its simply to help facilatate conversation in your Family",
          details: 'details',
          icon: 'material-symbols:breaking-news-alt-1',
          hex: '#71cfeb'
        },
        philConvo:{
          label: 'Philosophical Convo',
          description: "There isn't much to be said about this type of topic, its simply to help facilatate conversation in your Family",
          details: 'details',
          icon: 'icon-park-solid:thinking-problem',
          hex: '#8c8c8c'
        },
        hardConvo:{
          label: 'Hard Hitting',
          description: "There isn't much to be said about this type of topic, its simply to help facilatate conversation in your Family",
          details: 'details',
          icon: 'material-symbols:hardware-rounded',
          hex: '#2a6a15'
        },
        hotConvo:{
          label: 'Hot Takes',
          description: "There isn't much to be said about this type of topic, its simply to help facilatate conversation in your Family",
          details: 'details',
          icon: 'mdi:fire-alert',
          hex: '#d00c19'
        },
        riddleConvo:{
          label: 'Riddle This',
          description: "There isn't much to be said about this type of topic, its simply to help facilatate conversation in your Family",
          details: 'details',
          icon: 'fluent:thinking-20-filled',
          hex: '#60ee39'
        },
        todConvo:{
          label: 'Truth or Dare',
          description: "There isn't much to be said about this type of topic, its simply to help facilatate conversation in your Family",
          details: 'details',
          icon: 'mdi:arrow-left-right-bold',
          hex: '#2f8c70'
        },
        triviaComp:{
          label: 'Trivia Challenge',
          description: "You are going against eachother head to head...",
          details: 'details',
          icon: 'material-symbols:contact-support',
          hex: '#c14a65'
        },
        ovoComp:{
          label: 'One Vs. One',
          description: "You are going against eachother head to head...",
          details: 'details',
          icon: 'icon-park-outline:switch',
          hex: '#d750ac'
        },
        fivesecComp:{
          label: '5 seconds or Less',
          description: "You are going against eachother head to head...",
          details: 'details',
          icon: 'material-symbols:timer-outline',
          hex: '#5041ae'  
        },
        ftlComp:{
          label: 'Find the Link',
          description: "You are going against eachother head to head...",
          details: 'details',
          icon: 'material-symbols:add-link-rounded',
          hex: '#c65804' 
        },
        foundedComp:{
          label: 'Founded',
          description: "You are going against eachother head to head...",
          details: 'details',
          icon: 'bi:building-fill-check',
          hex: '#797936'  
        },
        celebComp:{
          label: 'Guess the Age',
          description: "You are going against eachother head to head...",
          details: 'details',
          icon: 'ic:outline-person-search',
          hex: '#482203' 
        },
        mlComp:{
          label: 'Music Numbers',
          description: "You are going against eachother head to head...",
          details: 'details',
          icon: 'material-symbols:queue-music-rounded',
          hex: '#8fd7af' 
        },
        castComp:{
          label: 'Casted',
          description: "You are going against eachother head to head...",
          details: 'details',
          icon: 'icon-park-solid:peoples-two',
          hex: '#283b6c' 
        },
        songComp:{
          label: 'Name the Song',
          description: "You are going against eachother head to head...",
          details: 'details',
          icon: 'iconamoon:music-album-fill',
          hex: '#39044b' 
        },
        revealComp:{
          label: 'Reveal',
          description: "You are going against eachother head to head...",
          details: 'details',
          icon: 'mdi:eye-check',
          hex: '#59369f' 
        },
        draftGame:{
          label: 'Draft War',
          description: "War has begun, and the only way to settle this is by assembling a team of 5 that best fits the prompt.",
          details: 'Take turns going back and forth and adding a selection to your team. Once a choice has been made, the other team can not draft that option as they are now off the table. After finishing you decide who has won the war.',
          icon: 'mdi:sword-cross',
          hex: '#9f6f09'
        },
        dykGame:{
          label: 'Do you know me',
          description: "Do you know eachother?",
          details: 'Take turns going back and forth and adding a selection to your team. Once a choice has been made, the other team can not draft that option as they are now off the table. After finishing you decide who has won the war.',
          icon: 'fluent-emoji-high-contrast:people-hugging',
          hex: '#3d2e4a'
        },
        syncedGame:{
          label: 'Synced',
          description: "Are yall on the same mindset? if not, yall need to be for this one.",
          details: 'Take turns going back and forth and adding a selection to your team. Once a choice has been made, the other team can not draft that option as they are now off the table. After finishing you decide who has won the war.',
          icon: 'material-symbols:sync-rounded',
          hex: '#ce3e6c'
        },
        whoGame:{
          label: 'Who Am I',
          description: "Are yall on the same mindset? if not, yall need to be for this one.",
          details: 'Take turns going back and forth and adding a selection to your team. Once a choice has been made, the other team can not draft that option as they are now off the table. After finishing you decide who has won the war.',
          icon: 'tabler:user-question',
          hex: '#f4e544'
        },
        likelyGroups:{
          label: 'Who is most likely',
          description: "Are yall on the same mindset? if not, yall need to be for this one.",
          details: 'Take turns going back and forth and adding a selection to your team. Once a choice has been made, the other team can not draft that option as they are now off the table. After finishing you decide who has won the war.',
          icon: 'ion:ios-people',
          hex: '#caff80'
        },
        simplifyGroups:{
          label: 'Simplify It',
          description: "Are yall on the same mindset? if not, yall need to be for this one.",
          details: 'Take turns going back and forth and adding a selection to your team. Once a choice has been made, the other team can not draft that option as they are now off the table. After finishing you decide who has won the war.',
          icon: 'fluent:data-funnel-20-filled',
          hex: '#3e2e33'
        },
        splitGroups:{
          label: 'Split the Room',
          description: "Are yall on the same mindset? if not, yall need to be for this one.",
          details: 'Take turns going back and forth and adding a selection to your team. Once a choice has been made, the other team can not draft that option as they are now off the table. After finishing you decide who has won the war.',
          icon: 'material-symbols:call-split',
          hex: '#85a45a'
        },
      }
    }
  },

  mounted(){
    if(this.cards){
      if(localStorage.getItem('localFilters')){
        this.chosenFilters = localStorage.getItem('localFilters').split(",");
        console.log(this.chosenFilters, 'neww')
      }
      if(localStorage.getItem('freeCount') >= 10){
        localStorage.setItem('freeCount', 9)
      }
      this.getTopic()
    }
  },
  methods:{
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    toggleFilters(){
      this.filterOpen = !this.filterOpen
    },
    getTopic(){
      let curCount = parseInt(localStorage.getItem('freeCount'))
      if(!curCount){
        curCount = 0
      }
      if(curCount >= 10){
        this.adOpen = true
      }else{
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
          //add opt sounds?
          // const audio = new Audio('audio_file.mp3');
          // audio.play();
          this.currentCard = includedCards[index]
          this.currentCard.label = this.cardInfo[this.currentCard.type].label
          this.currentCard.description = this.cardInfo[this.currentCard.type].description
          this.currentCard.details = this.cardInfo[this.currentCard.type].details
          this.currentCard.icon = this.cardInfo[this.currentCard.type].icon
          localStorage.setItem("currentType", this.currentCard.type)
          this.reset = true
          curCount = curCount += 1
          localStorage.setItem('freeCount', curCount)
          setTimeout(() => {
            this.reset = false
            this.loaded = true
          }, 300);
        }
      }
    },
    updateFilters(filters){
      this.chosenFilters = filters
      this.getTopic()
      localStorage.setItem("localFilters", filters)
    },
    adReset(){
      localStorage.setItem('freeCount', 0)
      this.adOpen = !this.adOpen
      this.getTopic()
    },
  }
}
</script> 
<style lang="scss" scoped>
  @import '@/assets/scss/extra/home.scss';
</style>
