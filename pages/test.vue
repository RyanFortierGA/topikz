<template>
  <div class="account">
    <h1>Stripe Customers</h1>
    <p v-if="emailExists === true">Customer with email {{ emailToCheck }} exists in Stripe.</p>
    <div v-if="emailExists === false">
      <stripe-buy-button
        buy-button-id="buy_btn_1Nm0DyI7NwPvbVzKVksVOKOY"
        publishable-key="pk_test_51LPW9AI7NwPvbVzKslzCBfSA7LOARKwt6ArTJMO1IsV8Md0SxbY9WAojEwLJA9MmIHgrXFKZ7YQdHnVb9yuYkTZJ00ozcvPfGh"
        >
      </stripe-buy-button>
    </div>
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

export default {
  data() {
    return {
      emailToCheck: '',
      emailExists: null,
    };
  },
  async mounted() {
    // page load, check if query parameter is new = true 
    // if it is true create a stripe account with the email from localStorage.getItem('localUser') and set that id in stripeid, and let them buy subscription
    //if it is not new, check if we have a stripeId saved in the local storage, if we do then we can just use that to check if the subscription exists 
    // if we do not stripeId in local storage we need to search all customers and find if they exist and if so do they have a subscription
    
    const stripeId = localStorage.getItem('stripeId')
    if(stripeId){
      this.emailExists = true
    } else {
      const emailToCheck = localStorage.getItem('localUser')

      if (emailToCheck) {
        this.emailToCheck = emailToCheck;
        this.emailExists = await this.checkCustomerEmailExists(emailToCheck);
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
  },
  watch: {
    emailExists(value) {
      console.log(localStorage.getItem('stripeId'))
      if(value){
        this.$router.push('/member')
      }
    },
  },
};
</script>
