<template>
    <div class="leaderboard__item">
      <span class="leaderboard__user">{{ user.name }}</span>
      <div class="leaderboard__buttons">
        <button
          @click="$emit('step', { userId: user.id, step: 1 })"
          class="leaderboard__button"
        >
          +
        </button>
        <button
          @click="$emit('step', { userId: user.id, step: -1 })"
          :class="{
            leaderboard__button: true,
            'leaderboard__button--disabled': user.score < 1,
          }"
          v-if="user.score > 0"
        >
          -
        </button>
        <button
          @click="$emit('delete', user.id )"
          class="leaderboard__button leaderboard__button_delete"
          v-else
        >
        <Icon name="octicon:trashcan" />
        </button>
      </div>
      <span class="leaderboard__score">
        {{ user.score }} {{ user.score === 1 ? "point" : "points" }}
      </span>
    </div>
  </template>
  
  <script>
  export default {
    name: "LeaderboardItem",
    props: {
      user: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style>
  .leaderboard__item {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;
    padding: 0.25rem;
    max-width: 74vw;
    touch-action: manipulation;
  }
  .leaderboard__user {
    text-align: left;
    width: 30%;
    color: #fff;
    text-transform: capitalize;
  }
  .leaderboard__score {
    text-align: right;
    width: 30%;
    color: #fff;
    white-space: pre;
  }
  .leaderboard__buttons {
    display: flex;
    justify-content: center;
    width: 30%;
  }
  .leaderboard__button {
    background: #E36414;
    border: 1px solid #E36414;
    color: #fff;
    cursor: pointer;
    height: 2rem;
    line-height: 1;
    margin: 0 0.1rem;
    width: 2rem;
  }
  .leaderboard__button_delete{
    background: red;
    border: red;
  }
  .leaderboard__button--disabled {
    background: #eee;
    border: 1px solid #ccc;
    color: #ccc;
    cursor: auto;
  }
  </style>