<template>
    <div class="options">
        test
    </div>
</template>

<script>
//  this.$emit('onNextVote')
  export default {
    props: {
      open: {
        type: Boolean
      },
    },
    methods: {
      handleEsc(e) {
        if (e.key === 'Escape') {
          this.handleClose()
        }
      },
      handleClose() {
        if (!this.open) return
        this.$emit('onClose')
      },
      closeModal(e) {
        if (e.target.classList.contains('modal') || e.target.classList.contains('close')) {
          this.handleClose()
        }
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
    z-index: 100;
    overflow: scroll;

    .modalContent {
      background: #ffffff;
      border-radius: 8px;
      margin-left: 16px;
      margin-right: 16px;
      padding: 40px 40px 40px 40px;
      width: 100%;
      height: fit-content;
      position: relative;

      h2 {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 16px;
      }

      .close {
        font-family: unset;
        display: block;
        position: absolute;
        top: 16px;
        right: 24px;
        font-weight: 400;
        font-size: 24px;
        line-height: 24px;
        z-index: 99999;
        cursor: pointer;
      }
    }
  }

  .openModal {
    opacity: 1;
    pointer-events: all;
  }

  .size-small {
    .modalContent {
      max-width: 50%;
    }
  }

  .size-720 {
    .modalContent {
      max-width: 720px;
    }
  }

  .confirmationModal {
    .modalContent {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }
  }

</style>
