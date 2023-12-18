<template>
  <div class="layout-main-container">
    <div class="layout-header">
      <AppHeader />
    </div>
    <div class="layout-main">
      <div>
        <div class="wrapper">
          <slot />
        </div>
      </div>
    </div>
    <AppFooter />
    <Toast />
  </div>
</template>

<style lang="scss">
  .wrapper{
    padding: 18px;
    padding-top: 0px;
    color: #280000;
    max-width:768px;
    margin: auto;
  }
</style>