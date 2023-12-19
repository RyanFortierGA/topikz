<template>
    <div
      ref='modal'
      :class="[open ? 'modal openModal' : 'modal' ,unlimitedUser?'unlimitedUser' : 'freeUser']"
      @click='closeModal'
    >
      <div id='modalContent' class='modalContent' :style="'width:' + size + 'px'">
        <div class='close' @click="handleClose"><Icon  name="mdi:close-thick" /></div>
        <h3>Leaderboard</h3>
        <div class="leaderboard">
          <transition-group
            move-class="leaderboard__item--move"
            v-if="users.length > 0"
          >
            <LeaderboardItem
              v-for="user in sortedUsers"
              :key="user.id"
              :user="user"
              @step="handleStep"
              @delete="deleteUser"
            />
          </transition-group>
          <p class="message" v-else>Add a player to see Scores!</p>
        </div>
        <div class="addUser">
          <input type="text" v-model="newUserName" placeholder="New User" maxlength="5">
          <span @click="addUser">Add User</span>
        </div>
        <div :class=" unlimitedUser? 'actions' : 'freeActions actions'">
            <span v-if="!unlimitedUser" class="unlimited" @click="handleSave"><NuxtLink to="/signup">Keep a running tally with Pro!</NuxtLink></span>
            <span class="save" @click="handleClose">Close</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import LeaderboardItem from "./LeaderboardItem.vue";

  export default {
    name: "Leaderboard",
    components: { LeaderboardItem: LeaderboardItem, },
      props: {
        open: {
          type: Boolean
        },
        size: {
          type: String,
          default: 'normal'
        },
      },
      data() {
        return {
          users: [
            
          ],
          newUserName: ''
        };
      },
      mounted(){
        if(localStorage.getItem('userScores')){
          this.users = JSON.parse(localStorage.getItem('userScores'))
        } else {
          this.users = [
            { "id": 1, "name": "James", "score": 8 },
            { "id": 2, "name": "Emma", "score": 6 },
            { "id": 3, "name": "Dylan", "score": 0 },
            { "id": 5, "name": "Olivia", "score": 11 }
          ]
        }
      },
      methods: {
        handleClose() {
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
        handleStep(event) {
          const { userId, step } = event;
          let user = this.users.find((user) => user.id === userId);
          user.score += step;
          user.score = user.score < 0 ? 0 : user.score;
          this.users = [...this.users];
          localStorage.setItem("userScores", JSON.stringify(this.users))
        },
        deleteUser(id){
          this.users = this.users.filter(user => user.id !== id);
          localStorage.setItem("userScores", JSON.stringify(this.users))
        },
        addUser() {
          if (this.newUserName.trim() !== '') {
            const newUser = {
              id: this.users.length + 1,
              name: this.newUserName,
              score: 0
            };
            this.users.push(newUser);
            this.newUserName = ''; // Clear the input field after adding the user
            localStorage.setItem("userScores", JSON.stringify(this.users))
          }
        }
      },
      computed: {
        sortedUsers() {
          return [...this.users].sort((a, b) =>
            a.score === b.score
              ? a.name.localeCompare(b.name)
              : a.score > b.score
              ? -1
              : 1
          );
        },
        unlimitedUser() {
          return this.$route.path.includes('member');
        }
      },
    }
  </script>
  
  <style lang='scss' scoped>
    .modal {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: 500ms cubic-bezier(0.075, 0.82, 0.165, 1);
      z-index: 10000;
      overflow: scroll;
  
      .modalContent {
        background: #222;
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
          color: #fff;
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
          color: #fff;
        }
      }
    }
  
    .openModal {
      opacity: 1;
      pointer-events: all;
      .modalContent{
        .close{
          pointer-events: all;
        }
      }
    }
  
    .leaderboard {
      border: 1px solid #bbb;
      border-radius: 0.5rem;
      box-shadow: 1px 1px 10px #777;
      font-family: Arial, Helvetica, sans-serif;
      list-style: none;
      padding: 2rem;
      touch-action: manipulation;
    }
    .leaderboard__item--move {
      transition: transform 0.2s;
    }
    .message {
      text-align: center;
      color: #fff;
    }
    .addUser{
      margin-top: 18px;
      display: flex;
      align-items: center;
      gap: 18px;
      touch-action: manipulation;
      input{
        border: 1px solid #E36414;
        background: #fff;
        color: #000;
        padding: 8px;
        height: 34px;
        border-radius: 8px;
        width: 100%;
        touch-action: manipulation;
      }
      span{
        border-radius: 100px;
        padding: 6px 12px;
        background: #E36414;
        color: #fff;
        height: 34px;
        white-space: pre;
      }
    }
    .freeUser{
      .leaderboard{
        pointer-events: none;
        opacity: 0.7;
      }
      .addUser{
        pointer-events: none;
        opacity: 0.7;
      }
    }
    .actions{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        gap: 12px;
        margin-top: 24px;
        .save{
              border-radius: 100px;
              padding: 10px 24px;
              background: #828182;
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
      flex-direction: column;
    }
  
  
  </style>
  