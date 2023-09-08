<template>
  <div class="accountPage">
    <img src="~/assets/images/account_img.png"/>
    <h1>Hello There <Icon name="ph:smiley-bold" /></h1>
    <p>Thanks for making an account and joining the Topic family</p>
    <div v-if="emailExists === false" class="subBtn" @click="handleCheckoutButtonClick">
      <stripe-buy-button
          class="inactive"
          buy-button-id="buy_btn_1Nm0DyI7NwPvbVzKVksVOKOY"
          publishable-key="pk_test_51LPW9AI7NwPvbVzKslzCBfSA7LOARKwt6ArTJMO1IsV8Md0SxbY9WAojEwLJA9MmIHgrXFKZ7YQdHnVb9yuYkTZJ00ozcvPfGh"
        >
      </stripe-buy-button>
    </div>
    <p>You are just one step away from unlimited topics with no ads, for less than a coffee in 2023. You can cancel anytime, but while you are subscribed, you will be able to play any type of topic, any amount of times and enjoy a seemless ad free experience.</p>
    <Button icon="pi pi-check" label="Sign out" @click="signOut" />
    <div v-if="emailExists === null">
      <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
          <rect x="20" y="50" width="4" height="10" fill="#fff">
            <animateTransform attributeType="xml"
              attributeName="transform" type="translate"
              values="0 0; 0 20; 0 0"
              begin="0" dur="0.6s" repeatCount="indefinite" />
          </rect>
          <rect x="30" y="50" width="4" height="10" fill="#fff">
            <animateTransform attributeType="xml"
              attributeName="transform" type="translate"
              values="0 0; 0 20; 0 0"
              begin="0.2s" dur="0.6s" repeatCount="indefinite" />
          </rect>
          <rect x="40" y="50" width="4" height="10" fill="#fff">
            <animateTransform attributeType="xml"
              attributeName="transform" type="translate"
              values="0 0; 0 20; 0 0"
              begin="0.4s" dur="0.6s" repeatCount="indefinite" />
          </rect>
      </svg>
    </div>
  </div>
</template>
<script>
import Stripe from 'stripe';
import useUser from "~/composables/useUser"

export default {
  data() {
    return {
      emailToCheck: '',
      emailExists: null,
      user: useUser()
    };
  },
  async mounted() {
    //case 1 if signup just happened and its new user, make a stripe account for them and let them create subscription
    if(this.$route.query.new === 'true'){
      const _this = this
      //new account
      const stripeKeySecret = this.$config.public.stripeKeySecret;
      const stripe = new Stripe(stripeKeySecret, {
        apiVersion: '2020-08-27',
      });
      // Create a customer with an email address
      stripe.customers.create({
        email: localStorage.getItem('localUser'),
      }, function(err, customer) {
        if (err) {
          console.error('Error creating customer:', err);
        } else {
          console.log('Customer created:', customer);
          localStorage.setItem("stripeId", customer.id)
          _this.emailExists = false
        }
      });
    //case 2 if not new user
    }else{
      const _this = this
      //case 2 sub 1 if they login and they already have a stripe id, check if their subscription is currently active
      if(localStorage.getItem('stripeId')){
        _this.emailExists = await _this.hasActiveSubscriptions(localStorage.getItem('stripeId'));
      }else{
        const _this = this
        //case 2 sub 2 if they login and they dont have a stripe id check if they have an email in the customer database, and if so then check if they have active subscription cause the stripe id will now exist
        const emailToCheck = localStorage.getItem('localUser')
        if (emailToCheck) {
          _this.emailToCheck = emailToCheck;
          if(await _this.checkCustomerEmailExists(emailToCheck)){
            _this.emailExists = await _this.hasActiveSubscriptions(localStorage.getItem('stripeId'));
          }
        }
      }
    }

    // Add the Stripe buy button script dynamically
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    
    // Append the script to the document's head
    document.head.appendChild(script);
    
  },
  methods: {
    async checkCustomerEmailExists(email) {
      try {
        const stripeKeySecret = this.$config.public.stripeKeySecret;
        const stripe = new Stripe(stripeKeySecret, {
          apiVersion: '2020-08-27',
        });

        let hasMore = true;
        let customers = [];
        let startingAfter = undefined;

        while (hasMore) {
          const options = { limit: 100 };
          if (startingAfter) {
            options.starting_after = startingAfter;
          }

          // List customers with pagination
          const result = await stripe.customers.list(options);

          if (result.data.length > 0) {
            customers = customers.concat(result.data);
            startingAfter = result.data[result.data.length - 1].id;
          } else {
            hasMore = false;
          }
        }

        // Check if the email exists in the list of customers
        const customerWithEmail = customers.find(customer => customer.email === email);
        if(customerWithEmail){
          localStorage.setItem("stripeId", customerWithEmail.id)
        }

        return !!customerWithEmail;
      } catch (error) {
        console.error('Error checking customer email:', error);
        return false;
      }
    },
    async hasActiveSubscriptions(customerId) {
      try {
        const stripeKeySecret = this.$config.public.stripeKeySecret;
        const stripe = new Stripe(stripeKeySecret, {
          apiVersion: '2020-08-27',
        });
        const subscriptions = await stripe.subscriptions.list({
          customer: customerId,
        });
        console.log(customerId)

        // Check if any subscription is active
        const hasActiveSubscription = subscriptions.data.some(subscription => {
          return subscription.status === 'active';
        });
        if(hasActiveSubscription){
          localStorage.setItem("active", true)
        }else{
          localStorage.setItem("active", false)
        }
        return hasActiveSubscription;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    },
    async handleCheckoutButtonClick() {
      try {
        if (!localStorage.getItem('stripeId')) {
          console.error('No customer ID found in localStorage.');
          return;
        }
              const stripeKeySecret = this.$config.public.stripeKeySecret;

        const stripe = new Stripe(stripeKeySecret, {
          apiVersion: '2020-08-27',
        });
        const session = await stripe.checkout.sessions.create({
          customer: localStorage.getItem('stripeId'),
          payment_method_types: ['card'], // Adjust to your preferred payment methods
          line_items: [
            {
              price: 'price_1NkrdPI7NwPvbVzKfl0T0mIW', // Replace with your actual price ID
              quantity: 1,
            },
          ],
          mode: 'subscription',
          success_url: 'https://localhost:3000/account',
          cancel_url: 'https://localhost:3000/account',
        });

        // Redirect the user to the Checkout page
        window.location.href = session.url;
      } catch (error) {
        console.error('Stripe Checkout error:', error);
      }
    },
    async signOut(){
      if (this.user) {
        await this.$nuxt.$firebaseAuth.signOut()
      }
      localStorage.removeItem('localUser')
      this.$router.push('/')
    }
 
  },
  watch: {
    emailExists(value) {
      if(value){
        this.$router.push('/member')
      }
    },
  },
};
</script>
<style lang="scss" scoped>
  .accountPage{
    height: calc(100vh - 58px);
    h1{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      position: relative;
      z-index: 999;
      font-size: 42px;
      font-family: Nunito-bold;
    }
    p{
      position: relative;
      z-index: 999;
      font-size: 22px;
      text-align: center;
    }
    img{
      top: 66px;
      left: -18px;
      position: absolute;
      object-fit: cover;
      width: calc(100% + 18px);
      opacity: 0.2;
      height: 100vh;
    }
  }
  .subBtn{
    background: #fff;
    overflow: hidden;
    position: relative;
    z-index: 999;
    width: fit-content;
    margin: auto;
    .inactive{
      pointer-events: none;
    }
  }
</style>