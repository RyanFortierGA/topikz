<template>
  <div
    ref='modal'
    :class="open ? 'modal openModal' : 'modal' "
    @click='closeModal'
  >
    <div id='modalContent' class='modalContent' :style="'width:' + size + 'px'">
      <div class='close' @click="handleClose"><Icon  name="mdi:close-thick" /></div>
      <h3>Filter by Topik</h3>
      <div class="filters">
            <div v-for="(filterWrap, index) in allFilters" :key="index" :class="['filterBox', openBoxes.includes(index)?'openBox' : '']">
                <div class="parent">
                    <span :class="[filterWrap.type, 'catIcon']"><Icon  :name="filterWrap.icon" /></span>
                    <h4 @click="toggleOpen(index)">{{filterWrap.type}}</h4>
                    <span class="toggle" v-if="openBoxes.includes(index)" @click="toggleOpen(index)"><Icon  name="ic:baseline-minus" /></span>
                    <span class="toggle" v-else><Icon  name="ic:baseline-plus" @click="toggleOpen(index)"  /></span>
                </div>
                <div class="filterList">
                    <div v-for="(filter, i) in filterWrap.filters" :key="i" :class="['filter', currentFilters.includes(filter)?'activeFilter' : '']" @click="toggleFilter(filter)" >
                        <span class="filterLabel">{{cardInfo[filter].label}}</span>
                        <span :style="'color:' +cardInfo[filter].hex" class="toggleBox checked" v-if="currentFilters.includes(filter)"><Icon name="mdi:checkbox-marked" /></span>
                        <span :style="'color:' +cardInfo[filter].hex" class="toggleBox" v-else ><Icon name="ion:android-checkbox-outline-blank" /></span>
                    </div>
                </div>
            </div>
      </div>
      <div :class=" unlimitedUser? 'actions' : 'freeActions actions'">
          <span class="cancel" @click="handleClose">{{unlimitedUser?'Cancel' : 'Return to free version'}}</span>
          <span v-if="unlimitedUser" class="save" @click="handleSave">Save</span>
          <span v-else class="unlimited" @click="handleSave"><NuxtLink to="/signup">Play any & all you you want for $1.99!</NuxtLink></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      open: {
        type: Boolean
      },
      size: {
        type: String,
        default: 'normal'
      },
      chosenFilters:{
        type: Array,
      },
      cardInfo:{
        type: Object,
      },
    },
    head() {
      return {
        meta: [
          { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ]
      }
    },
    data() {
    return {
            allFilters:[
                {
                    type: 'Conversational',
                    icon: 'bx:bxs-conversation',
                    filters: ['casualConvo', 'familyConvo', 'politicalConvo', 'dateConvo', 'wyrConvo', 'newsConvo', 'philConvo','hardConvo', 'hotConvo', 'riddleConvo', 'todConvo']
                },
                {
                    type: 'Competitive',
                    icon: 'mdi:sword-cross',
                    filters: ['ovoComp', 'fivesecComp', 'ftlComp', 'triviaComp' ,'foundedComp', 'celebComp', 'mlComp', 'castComp', 'songComp', 'revealComp']
                },
                {
                    type: 'Games',
                    icon: 'fluent:games-48-filled',
                    filters: ['dykGame', 'syncedGame', 'whoGame','draftGame']
                },
                {
                    type: 'Larger Groups',
                    icon: 'icon-park-solid:peoples-two',
                    filters: ['likelyGroups', 'simplifyGroups', 'splitGroups']
                },
            ],
            currentFilters: [],
            openBoxes:[]
        }
    },
    mounted() {
      window.addEventListener('keyup', this.handleEsc)
      this.chosenFilters.forEach(fil => {
        this.currentFilters.push(fil)
      });
    },
    beforeDestroy() {
      window.removeEventListener('keyup', this.handleEsc)
    },
    methods: {
      handleEsc(e) {
        if (e.key === 'Escape') {
          this.handleClose()
        }
      },
      handleClose() {
        this.currentFilters = []
        this.chosenFilters.forEach(fil => {
          this.currentFilters.push(fil)
        });
        this.$emit('onClose')
      },
      handleSave(){
        this.$emit('updateFilters', this.currentFilters)
        this.$emit('onClose')
      },
      closeModal(e) {
        if (e.target.classList.contains('modal') || e.target.classList.contains('close')) {
          this.handleClose()
        }
      },
      toggleOpen(index){
        const curIndex = this.openBoxes.indexOf(index)
        if(curIndex > -1){
          this.openBoxes.splice(curIndex, 1)
        } else {
          this.openBoxes.push(index)
        }
      },
      toggleFilter(filter){
        const curIndex = this.currentFilters.indexOf(filter)
        if(curIndex > -1){
          this.currentFilters.splice(curIndex, 1)
        } else {
          this.currentFilters.push(filter)
        }
      }
    },
    computed: {
      unlimitedUser() {
        return this.$route.path.includes('member');
      }
    }
  }
</script>

<style lang='scss' scoped>
  .modal {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0vw;
    left: 0;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: 500ms cubic-bezier(0.075, 0.82, 0.165, 1);
    z-index: 10000000000;

    .modalContent {
      background: #ffffff;
      /* margin: 24px; */
      padding: 40px 40px 40px 40px;
      width: 100%;
      height: 100%;
      position: relative;
      /* border-radius: 16px; */
      h3{
        font-size: 28px;
        text-align: center;
        font-family: Nunito-bold;
      }
      .close {
        font-family: unset;
        display: block;
        position: absolute;
        top: 24px;
        right: 24px;
        font-weight: 400;
        font-size: 24px;
        line-height: 24px;
        z-index: 99999;
        pointer-events: none;
      }
    }
  }

  .openModal {
    opacity: 1;
    pointer-events: all;
    overflow: hidden;
    .modalContent{
      .close{
        pointer-events: all;
      }
    }
  }

  .filters{
    height: 66%;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    gap: 16px;
    touch-action: pan-y;
    &::-webkit-scrollbar {
        display: none;
    }
    .filterBox{
        .parent{
            display: flex;
            align-items: center;
            padding: 10px 0px;
            border-bottom: 1px solid #A9A8AA;
            .catIcon{
                margin-right: 12px;
                background: #FFB930;
                color: #fff;
                border-radius: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 6px;
                svg{
                    width: 24px;
                    height: 24px;
                }
            }
            .Conversational{
                background: #FFB930;
            }
            .Competitive{
                background: #FF5151;
            }
            .Games{
                background: #A5C645;
            }
            .Groups{
                background: #C491DC;
            }
            h4{
                font-size: 18px;
                margin: 0px;
            }
            .toggle{
                margin-left: auto;
                svg{
                    width: 24px;
                    height: 24px;
                    color: #525152;
                }
            }
        }
        .filterList{
            height: 0px;
            opacity: 0;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            transition: 400ms cubic-bezier(0.075, 0.82, 0.165, 1);
            padding-top: 10px;
            .filter{
              display: flex;
              align-items: center;
              padding: 4px 0px;
            }
            .filter:nth-child(even) {
              background: #F0F0F0;
            }
            .toggleBox{
                margin-left: auto;
                display: block;
                svg{
                    width: 18px;
                    height: 18px;
                }
            }
            .checked{
                color: #14e31b;
            }
        }
    }
    .openBox .filterList{
        transition: 400ms;
        height: fit-content;
        opacity: 1;
        &::-webkit-scrollbar {
            display: none;
        }
    }
  }
  .actions{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      gap: 12px;
      margin-top: 24px;
      .save{
          border-radius: 100px;
          padding: 10px 24px;
          background: #E36414;
          color: #fff;
        }
      .cancel{
        border-radius: 100px;
        padding: 10px 24px;
        background: #828182;
        color: #fff;
      }
      .unlimited{
        border-radius: 100px;
        padding: 10px 24px;
        background: #E36414;
        a{
          color: #fff;
          text-decoration: none;
          white-space: pre;
        }
      }
  }
  .freeActions{
    flex-direction: column-reverse;
  }


</style>
