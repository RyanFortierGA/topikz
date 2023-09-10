<template>
<div class="dice">
  <!-- <TresCanvas clear-color="#FCDE9C" shadows alpha window-size class="canvas">
    <TresScene>
      <TresMesh ref="boxRef" :scale="1" cast-shadow>
        <TresBoxGeometry :args="[1, 1, 1]" />
        <TresMeshNormalMaterial />
      </TresMesh>
    </TresScene>
  </TresCanvas> -->
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" rx="1" width="10" height="10"><animate id="spinner_c7A9" begin="0;spinner_23zP.end" attributeName="x" dur="0.2s" values="1;13" fill="freeze"/><animate id="spinner_Acnw" begin="spinner_ZmWi.end" attributeName="y" dur="0.2s" values="1;13" fill="freeze"/><animate id="spinner_iIcm" begin="spinner_zfQN.end" attributeName="x" dur="0.2s" values="13;1" fill="freeze"/><animate id="spinner_WX4U" begin="spinner_rRAc.end" attributeName="y" dur="0.2s" values="13;1" fill="freeze"/></rect><rect x="1" y="13" rx="1" width="10" height="10"><animate id="spinner_YLx7" begin="spinner_c7A9.end" attributeName="y" dur="0.2s" values="13;1" fill="freeze"/><animate id="spinner_vwnJ" begin="spinner_Acnw.end" attributeName="x" dur="0.2s" values="1;13" fill="freeze"/><animate id="spinner_KQuy" begin="spinner_iIcm.end" attributeName="y" dur="0.2s" values="1;13" fill="freeze"/><animate id="spinner_arKy" begin="spinner_WX4U.end" attributeName="x" dur="0.2s" values="13;1" fill="freeze"/></rect><rect x="13" y="13" rx="1" width="10" height="10"><animate id="spinner_ZmWi" begin="spinner_YLx7.end" attributeName="x" dur="0.2s" values="13;1" fill="freeze"/><animate id="spinner_zfQN" begin="spinner_vwnJ.end" attributeName="y" dur="0.2s" values="13;1" fill="freeze"/><animate id="spinner_rRAc" begin="spinner_KQuy.end" attributeName="x" dur="0.2s" values="1;13" fill="freeze"/><animate id="spinner_23zP" begin="spinner_arKy.end" attributeName="y" dur="0.2s" values="1;13" fill="freeze"/></rect></svg>
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
      boxRef.value.position.y = 0;
      boxRef.value.position.z =-1;
      boxRef.value.position.x =-1;
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
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  margin-top: 44px;
  svg{
    width: 36px;
    height: 36px;
  }
  span{
    border-radius: 16px;
    padding: 12px;
    margin: auto;
    cursor: pointer;
    transition: 400ms cubic-bezier(0.075, 0.82, 0.165, 1);
    position: relative;
    background-image: linear-gradient(90deg, #00C0FF 0%, #FFCF00 49%, #FC4F4F 80%, #00C0FF 100%);
    display:flex;
    align-items:center;
    justify-content:center;
    text-transform:uppercase;
    animation:slidebg 120s linear infinite;
    color: #fff;
    font-family: Nunito-bold;
    white-space: pre;
  }
  @keyframes slidebg {
    to {
      background-position: 800vw;
    }
  }
}

</style>