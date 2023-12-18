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
      currentCard: {type: 'loading'},
      reset: false,
      loaded: false,
      filterOpen: false,
      adOpen: false,
      scoreOpen: false,
      cardInfo: {
        casualConvo:{
          label: 'Casual Conversation',
          description: "This is as relaxed as it gets, use this topic to help guide the conversation.",
          details:  "There isn't much to be said about this type of topic, its simply to help facilatate conversation in your group.",
          icon: 'bx:bxs-conversation',
          hex: '#FFB930'
        },
        familyConvo:{
          label: 'Family Conversation',
          description: "This is as relaxed as it gets, use this topic to help guide the conversation.",
          details: "Not much to explain about this type of topic, its simply to help facilatate conversation in your Family.",
          icon: 'carbon:pedestrian-family',
          hex: '#e84f20'
        },
        politicalConvo:{
          label: 'Political Conversation',
          description: "In the most civil way possible, use this prompt to discuss a range of political topics.",
          details: "In the most civil way possible, use this prompt to discuss a range of political topics. You can always opt out of answering it, but we encourage everyone to be understanding of different POV's.",
          icon: 'map:political',
          hex: '#2ab865'
        },
        dateConvo:{
          label: 'Date Night',
          description: "A night out or in with your favorite person calls for some good conversation, let us help!",
          details: "A night out or in with your favorite person calls for some good conversation. You can talk about anything, but why not point those questions towards a bit more of a romantic side for a bit.",
          icon: 'ic:round-favorite',
          hex: '#c61470'
        },
        wyrConvo:{
          label: 'Would You Rather',
          description: "This or That? You have to choose one.",
          details: "It may be hard to decide, it may be easy but either way you have to pick one or the other, you may just have to explain yourself...",
          icon: 'game-icons:choice',
          hex: '#94512a'
        },
        newsConvo:{
          label: 'Todays News',
          description: "Discuss together what is currently happening around the world.",
          details: "Are you keeping up with the newest trends? May as well talk about some to stay in the loop.",
          icon: 'material-symbols:breaking-news-alt-1',
          hex: '#71cfeb'
        },
        philConvo:{
          label: 'Philosophical Convo',
          description: "Life can be pretty complex, and theres always something unique to talk about, let us help.",
          details: "Lets get introspective, use these prompts to talk about stuff that may not always have a definite answer.",
          icon: 'icon-park-solid:thinking-problem',
          hex: '#8c8c8c'
        },
        hardConvo:{
          label: 'Hard Hitting',
          description: "If you love the ability to have a conversation over something that is often divisive, but do it in a civil manner. This topic is for you.",
          details: "If you love the ability to have a conversation over something that is often divisive, but do it in a civil manner. This topic is for you.",
          icon: 'material-symbols:hardware-rounded',
          hex: '#2a6a15'
        },
        hotConvo:{
          label: 'Hot Takes',
          description: "You ever said something so outlandish and just hoped someone agrees with you?",
          details: "It's never to late to be controversial, just make sure to do it in a civil way. Whoever wants to can state a hot take in regards to the topic and see what others think.",
          icon: 'mdi:fire-alert',
          hex: '#d00c19'
        },
        riddleConvo:{
          label: 'Riddle This',
          description: "Riddle me this... Can you solve the riddle given?",
          details: "Dont go straight to the answer, try and take some time with this one, maybe think out of the box and you may just get connect the dots.",
          icon: 'fluent:thinking-20-filled',
          hex: '#60ee39'
        },
        todConvo:{
          label: 'Truth or Dare',
          description: "Pick truth or pick dare, but whatever you choose is your fate.",
          details:  "A classic game, but not one for the faint of heart. Pick truth or pick dare, but whatever you choose is your fate. You can always come up with a penalty for failing to follow thorugh.",
          icon: 'mdi:arrow-left-right-bold',
          hex: '#2f8c70'
        },
        triviaComp:{
          label: 'Trivia Challenge',
          description: "This is as simple as it sounds, it is trivia! You just have to get it right.",
          details: "Everyone can make their guesses and then once you are locked in, reveal to see who was right. Consider giving a point on the leaderboard for getting it right.",
          icon: 'material-symbols:contact-support',
          hex: '#c14a65'
        },
        ovoComp:{
          label: 'One Vs. One',
          description: "Use the prompt to go back and forth quickly naming items that match the category.",
          details:  "This can get heated, use the prompt to go back and forth quickly naming items that match the category. If one person has to think for a few seconds and doesn't name something, they conceed the round!",
          icon: 'icon-park-outline:switch',
          hex: '#d750ac'
        },
        fivesecComp:{
          label: '5 seconds or Less',
          description: "You have 5 seconds to name a determined amount of things that fit in the category, can you?",
          details:  "Use the prompt to go back and forth claiming how much you could say( i could name 7 states, oh i could name 9)...etc. Once you are confident the other person cant do as many as they said, start counting down and let them try and meet their number in 5 seconds.",
          icon: 'material-symbols:timer-outline',
          hex: '#5041ae'  
        },
        ftlComp:{
          label: 'Find the Link',
          description: "It's your job to find what links all of the listed words together.",
          details: "This may seem like there is just some random words listed out, but really they all of something that connects them all. Your job is to find out what.",
          icon: 'material-symbols:add-link-rounded',
          hex: '#c65804' 
        },
        foundedComp:{
          label: 'Founded',
          description: "Okay you are a huge fan of the year 1989, but can you name what happened then?",
          details: "Okay we need a bit of help from our friend google on this one. We gave yall a year, now your goal is to take turns guessing a company founded date / event /whatever you decide that matches the year given.",
          icon: 'bi:building-fill-check',
          hex: '#797936'  
        },
        celebComp:{
          label: 'Guess the Age',
          description: "You may love a celberity for all they do, but do you know how old they are?",
          details: "We are giving yall a random age, now your goal is to take turns guessing a Celebrity that matches the year given. Use google to confirm your guesses and crown a winner",
          icon: 'ic:outline-person-search',
          hex: '#482203' 
        },
        mlComp:{
          label: 'Music Numbers',
          description: "Try and guess the popularity of your favorite musicians and artists.",
          details:"We are giving yall a random number of listeners, now your goal is to take turns guessing a band/artist that matches the number given. Use spotify/apple music to see who wins!",
          icon: 'material-symbols:queue-music-rounded',
          hex: '#8fd7af' 
        },
        castComp:{
          label: 'Casted',
          description: "Become the casting director for a day, can you remember what project these actors worked on togehter?",
          details: "You are given the names of people who are all casted in the same movie or tv show, can you guess which one it is?",
          icon: 'icon-park-solid:peoples-two',
          hex: '#283b6c' 
        },
        songComp:{
          label: 'Name the Song',
          description: "Okay you are singing along, but can you name the song and artist of the song you are singing?",
          details: "We all love music, we all love singing along...but can you remember what exact song you were singing along to?",
          icon: 'iconamoon:music-album-fill',
          hex: '#761498' 
        },
        revealComp:{
          label: 'Reveal',
          description: "You are on a goal to figure out whats being slowly revealed as quickly as possible, use the clues to get you there.",
          details: "Use the clues to help decipher what you are trying to guess, it could be a movie, event, person...etc. Do your best to get it with as few clues as possible.",
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
          description: "Do you know eachother? Lets find out with some questions.",
          details: 'Everyone will think of an answer for themselves, now its the goal of the other player/players to be able to guess what your answer would be. Take turns who is guessing and find out who really is your best friend.',
          icon: 'fluent-emoji-high-contrast:people-hugging',
          hex: '#ffb3d4'
        },
        syncedGame:{
          label: 'Synced',
          description: "Are yall on the same mindset? if not, yall need to be for this one.",
          details: 'One person will look at the hidden number, this number is on a scale of 1-20(ex. 19). The other player/s then give them categories(ex. cars) and the person who knows the number (ex. 19) would give an answer like "Ferrari", to try and get them to think of 19. After doing 3 categories, take a guess what the number is!',
          icon: 'material-symbols:sync-rounded',
          hex: '#ce3e6c'
        },
        whoGame:{
          label: 'Who Am I',
          description: "So many questions, but will they help you decide who is who?",
          details: 'Each team or person will reveal and then hide one of the "who" cards. This is who your opponent is. Now go back and forth asking yes & no questions to try and narrow down and guess who you are before the other person beats you to it.',
          icon: 'tabler:user-question',
          hex: '#f4e544'
        },
        likelyGroups:{
          label: 'Who is most likely',
          description: "We all know who is most likely to do that... right?",
          details: 'This is meant for a group of people, so it works better with 3+ people, but any size can play! Read the prompt and take some time talking about who each of yall think is most likely to follow it and why.',
          icon: 'ion:ios-people',
          hex: '#caff80'
        },
        simplifyGroups:{
          label: 'Simplify It',
          description: "Take a word, and try and explain it in as few words as possible.",
          details: 'This is meant to be played with 4+ players, but you can alter the rules to play it differently. Each team has to have one advocate and the rest will be guessers. The advocates need to go back and forth claiming how few words they can describe the secret word with. Once you dont believe the other advocate, call them out and make them do it.',
          icon: 'fluent:data-funnel-20-filled',
          hex: '#3e2e33'
        },
        splitGroups:{
          label: 'Split the Room',
          description: "Some times we are completely alone on an opinion, but usually at least half agree with us.",
          details: 'Using the category invovled in the prompt, Each person will attempt to split the room by stating an opinion they believe and they think around half of the group would also agree with. Be honest, do not agree or disagree just to keep someone from getting a point!',
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
      }
      if(localStorage.getItem('freeCount') >= 10){
        localStorage.setItem('freeCount', 9)
      }
      this.getTopic()
    }
    setTimeout(() => {
      if(this.currentCard.type = 'loading'){
        this.getTopic()
      }
    }, 500);
  },
  methods:{
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    toggleFilters(){
      this.filterOpen = !this.filterOpen
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
          setTimeout(() => {
            this.reset = false
            this.loaded = true
          }, 300);
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
