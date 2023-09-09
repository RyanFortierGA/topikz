<template>
<div class="dice">
  <TresCanvas clear-color="#FCDE9C" shadows alpha window-size class="canvas">
    <TresScene>
      <TresMesh ref="boxRef" :scale="0.8" cast-shadow>
        <TresBoxGeometry :args="[1, 1, 1]" />
        <TresMeshNormalMaterial />
      </TresMesh>
    </TresScene>
  </TresCanvas>
  <span @click="rollNew">New Topic</span>
</div>
</template>


<script setup lang="ts">
import { ShallowRef, shallowRef } from 'vue';

import { useRenderLoop, TresInstance } from '@tresjs/core';

const boxRef: ShallowRef<TresInstance | null> = shallowRef(null);

const { onLoop } = useRenderLoop();
const emit = defineEmits(['rollNew'])

onLoop(({ delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += delta;
    boxRef.value.rotation.z = elapsed * 0.8;

    let isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
      navigator.userAgent &&
      navigator.userAgent.indexOf('CriOS') == -1 &&
      navigator.userAgent.indexOf('FxiOS') == -1;
    if(isSafari){
      boxRef.value.position.y = -4;
      boxRef.value.position.z = -1.5;
    }else{
      boxRef.value.position.y = -3.6;
      boxRef.value.position.z = -1.5;
    }
  }
});
const rollNew = () =>{
  emit('rollNew')
}
</script>
<style lang="scss" scoped>
.dice{
  display: flex;
  justify-content: center;
  align-items: center;
  span{
    border-radius: 16px;
    padding: 24px;
    margin: auto;
    bottom: 40px;
    cursor: pointer;
    transition: 400ms cubic-bezier(0.075, 0.82, 0.165, 1);
    position: absolute;
    background-image: linear-gradient(90deg, #00C0FF 0%, #FFCF00 49%, #FC4F4F 80%, #00C0FF 100%);
    display:flex;
    align-items:center;
    justify-content:center;
    text-transform:uppercase;
    animation:slidebg 5s linear infinite;
    color: #fff;
    font-family: Nunito-bold;
    left: 36px;
  }
  @keyframes slidebg {
    to {
      background-position: 100vw;
    }
  }
}

</style>