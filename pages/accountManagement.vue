<template>
  <div class="amPage">
    <img src="~/assets/images/accountManagement_img.png"/>
    <div class="formWrapper">
      <NuxtLink to="/member"><Icon name="ic:twotone-arrow-back" />Back to the fun</NuxtLink>
      <h1>Account Management</h1>
      <span><a href="mailto:contact@dinnertopic.com">contact@topikz.com</a></span>
      <div class="buttons">
         <span @click="signOut">Sign Out</span>
        <span class="cancel" @click="cancelOpen = !cancelOpen">Cancel Subscription</span>
        <span class="delete" @click="modalOpen = !modalOpen">Delete Account</span>
      </div>
      <span class="currentMessage">{{currentMessage}}</span>
      <ConfirmDelete :modalOpen="modalOpen" @toggleModal="modalOpen = !modalOpen" @deleteAccount="deleteAccount"/>
      <ConfirmCancel :modalOpen="cancelOpen" @toggleModal="cancelOpen = !cancelOpen" @cancelSub="cancelCustomerSubscription"/>
    </div>
  </div>
</template>

<script>
import Stripe from 'stripe';
import ConfirmDelete from '../components/modals/ConfirmDelete.vue';
import ConfirmCancel from '../components/modals/ConfirmCancel.vue';
import useUser from "~/composables/useUser"

export default {
  components:{ConfirmDelete, ConfirmCancel},
  data() {
    return {
      subscriptionStatus: 'Active', // Initialize with user's subscription status
      modalOpen: false,
      cancelOpen: false,
      user: useUser(),
      currentMessage: ''
    };
  },
  methods: {
    async signOut(){
      if (this.user) {
        await this.$nuxt.$firebaseAuth.signOut()
      }
      localStorage.removeItem('localUser')
      setTimeout(() => {
        window.location.href = '/';
      }, 300);
    },
    async getCustomerSubscriptions(customerId) {
      try {
        const stripeKeySecret = this.$config.public.stripeKeySecret;
        const stripe = new Stripe(stripeKeySecret, {
          apiVersion: '2020-08-27',
        });

        const subscriptions = await stripe.subscriptions.list({
          customer: customerId,
        });

        return subscriptions.data;
      } catch (error) {
        console.error('Error fetching customer subscriptions:', error);
        throw error;
      }
    },
    async findSubscriptionToCancel(customerId) {
      const subscriptions = await this.getCustomerSubscriptions(customerId);

      // Find the first active subscription, if any
      const activeSubscription = subscriptions.find(subscription => {
        return subscription.status === 'active';
      });

      return activeSubscription;
    },
    async cancelSubscription(subscriptionId) {
      try {
        const stripeKeySecret = this.$config.public.stripeKeySecret;
        const stripe = new Stripe(stripeKeySecret, {
          apiVersion: '2020-08-27',
        });

        // Cancel the subscription by updating it
        await stripe.subscriptions.update(subscriptionId, {
          cancel_at_period_end: true,
        });

        // Handle success and notify the user
        this.currentMessage = 'Your subscription will cancel at the end of your paying period, we also hope to see you back soon!'
      } catch (error) {
        // Handle errors and notify the user
        alert('Error cancelling subscription. Please try again later.');
          this.currentMessage = 'Cancelation failed, please logout and login to try again, if that still fails please reach out to contact@dinnertopic.com for help'
      }
    },
    async cancelCustomerSubscription() {
      this.cancelOpen = false
      try {
        const activeSubscription = await this.findSubscriptionToCancel(localStorage.getItem('stripeId'));

        if (activeSubscription) {
          await this.cancelSubscription(activeSubscription.id);
        } else {
          console.log('No active subscription found for this customer.');
        }
      } catch (error) {
        // Handle errors
        console.error('Error cancelling subscription:', error);
      }
      this.signOut()
    },
    async deleteAccount(){
      if (this.user) {
        const user = this.$nuxt.$firebaseAuth.currentUser;
          user.delete().then(() => {
            this.cancelCustomerSubscription()
          }).catch((error) => {
            this.currentMessage = 'Deletion failed, please logout and login to try again, if that still fails please reach out to contact@dinnertopic.com for help'
          });
      } else {
        this.currentMessage = 'Deletion failed, please logout and login to try again, if that still fails please reach out to contact@dinnertopic.com for help'
      }
    } 
  },
  mounted() {
    // You can optionally call cancelCustomerSubscription here when the component is mounted.
    // this.cancelCustomerSubscription();
  },
};
</script>

<style lang="scss" scoped>
.amPage{
  height: calc(100vh - 150px);
  display: flex;
  align-items: center;
  img{
    top: 66px;
    left: -18px;
    position: absolute;
    object-fit: cover;
    object-position: top center;
    width: calc(100% + 18px);
    opacity: 0.2;
    height: calc(100vh);
  }
  .buttons{
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 16px;
    margin-top: 24px;
    .cancel{
        background: #2b1b1e;
        padding: 12px;
        border-radius: 24px;
        color: #fff;
    }
    .delete{
      font-size: 14px;
      color: #B10F2E;
    }
  }
}
.formWrapper{
  padding: 24px;
  border-radius:24px;
  width: 100%;
  position: relative;
  z-index: 999;
  box-shadow: 0 -6px 24px rgba(0, 0, 0, 0.36);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  h1{
    text-align: center;
    margin: 0px;
    margin-bottom: 24px;
    color: #000;
  }
  span{
    display: flex;
    align-items: center;
    gap: 4px;
    a{
      margin: 0px;
    }
  }
  a{
    color: #280000;
    display: flex;
    align-items: center;
    gap: 4px;
    text-align: center;
    font-size: 18px;
    justify-content: center;
    margin-bottom: 24px;
    svg{
      color: #280000;
    }
  }
  .currentMessage{
    margin-top: 16px;
    text-align: center;
    font-size: 16px;
    display: block;
  }
}
</style>
