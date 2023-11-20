<template>
<div class="controls">
  <span @click="openFilters"><Icon name="ic:baseline-filter-alt" /></span>
  <span @click="rollNew"><Icon name="tabler:arrows-shuffle" /></span>
  <span @click="openScore"><Icon name="mdi:scoreboard" /></span>
</div>
</template>


<script setup lang="ts">

const emit = defineEmits(['rollNew', 'openFilters', 'openTools'])

const rollNew = () =>{
  emit('rollNew')
}
const openFilters = () =>{
  emit('openFilters')
}
const openScore = () =>{
  emit('openScore')
}
</script>
<style lang="scss" scoped>
.controls{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 44px;

  span{
    border-radius: 16px;
    padding: 12px;
    margin: auto;
    cursor: pointer;
    transition: 400ms cubic-bezier(0.075, 0.82, 0.165, 1);
    position: relative;
    display:flex;
    align-items:center;
    justify-content:center;
    text-transform:uppercase;
    animation:slidebg 120s linear infinite;
    color: #0F4C5C;
    font-family: Nunito-bold;
    white-space: pre;
    background: #fff;
    box-shadow: 0 -6px 24px rgba(0, 0, 0, 0.36);
    svg{
      width: 32px;
      height: 32px;
      color: #E36414;
    }
  }
}

</style>