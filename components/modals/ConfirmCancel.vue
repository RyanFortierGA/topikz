<template>
    <div>   
        <Modal :open='modalOpen' size='582' @onClose='toggleModal'>
            <h2>Are you sure you want to Cancel?</h2>
            <p>In doing so, after your current period ends, you will lose access to Pro w/ an ad free experience, filtering of any/all types and the ability to keep a leaderboard for you and your friends. If you continue, you will be signed out and need to sign back in to use your Pro membership for your remaining time.</p>
            <div class="buttons">
                <span class="cancel" @click="toggleModal">No, Go Back</span>
                <span class="success" @click="cancelSub">Yes, Cancel</span>
            </div>
        </Modal>
    </div>
</template>

<script setup>
    const props = defineProps({
        orderInfo: {
            type: Object,
            default: null
        },
        modalOpen:{
            type: Boolean,
            default: false
        },
        currentId:{
            type: String,
            default: ''
        } 
    })
    const emit = defineEmits(['toggleModal', 'cancelSub'])

    const toggleModal = (index) => {
        emit('toggleModal')
    }
    const cancelSub = (index) => {
        emit('cancelSub')
    }
</script>

<style lang='scss' scoped>
h2{
    margin: 0px;
}
.buttons{
    display: flex;
    align-items: center;
    gap: 16px;
    .cancel{
        background: #B10F2E;
        padding: 12px;
        border-radius: 24px;
        color: #fff;
    }
    .success{
        margin-left: auto;
    }
}
</style>