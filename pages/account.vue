<template>
  <div class="accountPage">
    <!-- <img src="~/assets/images/account_img.png"/> -->
    <h1>Hello There <Icon name="ph:smiley-bold" /></h1>
    <p>Thanks for making an account and joining the Topikz family</p>
    <div v-if="emailExists === false" class="subBtn" @click="handleCheckoutButtonClick">
      <stripe-buy-button
        buy-button-id="buy_btn_1OGoxGI7NwPvbVzKnITvo8IT"
        publishable-key="pk_live_51LPW9AI7NwPvbVzKAEYNw9T1ArvdfcxBjXl2d43sYpw0VAkCq1eaQtNwZDD9mJw2q2m87uopxuY7EJeQuzyam3s800Uv9XuURw"
      >
      </stripe-buy-button>
    </div>
    <h4 v-if="!linking || emailExists === false">Go Unlimited and get:</h4>
    <ul v-if="!linking || emailExists === false">
      <li>No more ADs, Just conversation</li>
      <li>28+ Topik types with many more to come</li>
      <li>Filter by the Types you want to play</li>
      <li>Keep a Leaderboard for you and your friends</li>
      <li>A growing library of prompts and games</li>
    </ul>
    <Button class="signOut" label="Sign out" @click="signOut" />
    <p v-if="linking && emailExists === true" class="linker">
      <svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
      <path fill="#fff" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
        c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">
            <animateTransform 
              attributeName="transform" 
              attributeType="XML" 
              type="rotate"
              dur="2s" 
              from="0 50 50"
              to="360 50 50" 
              repeatCount="indefinite" />
        </path>
      <path fill="#fff" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
        c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">
            <animateTransform 
              attributeName="transform" 
              attributeType="XML" 
              type="rotate"
              dur="1s" 
              from="0 50 50"
              to="-360 50 50" 
              repeatCount="indefinite" />
        </path>
      <path fill="#fff" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
        L82,35.7z">
            <animateTransform 
              attributeName="transform" 
              attributeType="XML" 
              type="rotate"
              dur="2s" 
              from="0 50 50"
              to="360 50 50" 
              repeatCount="indefinite" />
        </path>
      </svg>
      Linking New Device, if this takes longer than 45 seconds try refreshing the page or logging out and back in.
    </p>
    <div v-if="emailExists === null" class="loader">
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
import constructFB from '../server/lib/config.js'

export default {
  data() {
    return {
      emailToCheck: '',
      emailExists: null,
      user: useUser(),
      firebaseData: null,
      updated: false,
      linking: false
    };
  },
  async mounted() {
    setTimeout(() => {
      this.updated = true
    }, 10000);
    if(this.user && this.user.email) {
      localStorage.setItem("localUser", this.user.email)
      localStorage.setItem("userUid", this.user.uid)
    } else if(this.$route.query.purchaseComplete === 'true'){
      localStorage.setItem("stripeId", this.$route.query.id)
      localStorage.setItem("localUser", this.$route.query.email)
      this.user.uid = localStorage.getItem('userUid')
    }
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
      }, async function(err, customer) {
        if (err) {
          console.error('Error creating customer:', err);
        } else {
          localStorage.setItem("stripeId", customer.id)
          _this.writeToFirestore(customer.id)
          _this.emailExists = false
        }
      });
    //case 2 if not new user
    }else{
      const _this = this
      //case 2 main check for local storage stripe id
      if(localStorage.getItem('stripeId')){
        _this.emailExists = await _this.hasActiveSubscriptions(localStorage.getItem('stripeId'));
      }//end of main and start of main else
      else{ 
        this.linking = true
        //case 2 sub 1 if they login and they already have a stripe id in firebase, check if their subscription is currently active
        //firebase check
          const firebase2  = constructFB(this.$config)
 
          const query = firebase2.store.collection("users").where("fId", "==", this.user.uid);
          const _this = this
          query.get().then((querySnapshot) => {
          // querySnapshot contains the results of the query
          if (!querySnapshot.empty) {
            // There are documents that match the query
            querySnapshot.forEach((doc) => {
              // Access the data of each matching document
              const data = doc.data();
              _this.firebaseData = data
            });
          } else {
            // No documents match the query
          }
        }).catch((error) => {
          console.error("Error querying Firestore:", error);
        });

        setTimeout( async() => {
          if(this.firebaseData && this.firebaseData.stripeId){
            localStorage.setItem("stripeId", this.firebaseData.stripeId)
            _this.emailExists = await _this.hasActiveSubscriptions(this.firebaseData.stripeId);
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
          }//end of sub 2
        }, 500);
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
        let customerWithEmail = customers.find(customer => customer.email === email);
        if(customerWithEmail){
          localStorage.setItem("stripeId", customerWithEmail.id)
        }//if it doesnt create one 
        else {
          const _this = this
          //new account
          const stripeKeySecret = this.$config.public.stripeKeySecret;
          const stripe = new Stripe(stripeKeySecret, {
            apiVersion: '2020-08-27',
          });
          // Create a customer with an email address
          stripe.customers.create({
            email: localStorage.getItem('localUser'),
          }, async function(err, customer) {
            if (err) {
              console.error('Error creating customer:', err);
            } else {
              localStorage.setItem("stripeId", customer.id)
              _this.writeToFirestore(customer.id)
              _this.emailExists = false
            }
          });
          customerWithEmail = customer
        }
        //either way should return with a customer new or not
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
        // Check if any subscription is active
        const hasActiveSubscription = subscriptions.data.some(subscription => {
          return subscription.status === 'active';
        });
        console.log(subscriptions, customerId)
        if(hasActiveSubscription){
          localStorage.setItem("active", 'true')
        }else{
          localStorage.setItem("active", 'false')
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
              price: 'price_1OGou8I7NwPvbVzKU6Kei1Sz', // Replace with your actual price ID
              quantity: 1,
            },
          ],
          mode: 'subscription',
          success_url: window.location.origin + '/account?purchaseComplete=true?email=' + localStorage.getItem('localUser') + '?id=' + localStorage.getItem('stripeId'),
          cancel_url: window.location.origin + '/account',
        });
        console.log(session.url, 'ss')
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
      //dont remove stripe id
      this.$router.push('/')
    },
    async writeToFirestore(id){
      const firebase  = constructFB(this.$config)
        const ref = await firebase.store.collection('users').doc(this.user.uid).set({
          stripeId: id,
          fId: this.user.uid
        });
    },
    handleRouteChange(){
      if(this.$route.query.purchaseComplete === 'true'){
        this.$router.push('/member')
      }
    }
  },
  watch: {
    emailExists(value) {
      if(value){
        this.$router.push('/member')
      }
    },
    '$route'() {
      this.handleRouteChange();
    }
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
      color: #fff;
    }
    h4{
      margin-bottom: 24px;
      font-size: 20px;
      text-align: center;
      margin-top: 24px;
      color: #fff;
    }
    ul{
      padding: 0px;
      color: #E36414;
      margin: 0px;
      margin-left: 18px;
      font-size: 18px;
      font-weight: bold;
      li{
        margin-bottom: 4px;
      }
    }
    .signOut{
      background: #E36414;
      border: none;
      margin: auto;
      margin-top: 20px;
      display: block;
    }
    p{
      position: relative;
      z-index: 999;
      font-size: 22px;
      text-align: center;
      color: #fff;
    }
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
  .linker, .loader{
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    justify-content: center;
    svg{
      width: 32px;
      height: 32px;
    }
  }
</style>