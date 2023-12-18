<template>
  <div class="terms">
      <NuxtLink :to="homeRoute"><Icon name="ic:twotone-arrow-back" />Back to the fun</NuxtLink>
      <h1>Terms of Service and Privacy Policy</h1>

      <h2>Introduction</h2>
      <p>Welcome to Topikz! By using Topikz.com, you agree to comply with and be bound by the following terms and conditions of use. Please review the following terms carefully. If you do not agree to these terms, you should not use this website.</p>

      <h2>Terms of Service</h2>
      <h3>Use of the Website</h3>
      <ul>
         <li>The content of the pages of this website is for your general information and use only. It is subject to change without notice. There is no content restrictions and we are not liable to anything you did not desire to learn of through our content.</li>
         <li>Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services, or information available through this website meet your specific requirements.</li>
      </ul>

      <h3>User Accounts</h3>
      <ul>
         <li>Users may create an account by providing their email and password.</li>
         <li>Pro accounts are available for purchase, and payments are processed securely through Stripe.</li>
         <li>Pro accounts provide additional features, including the ability to filter content and access a leaderboard.</li>
      </ul>

      <h3>Advertising</h3>
      <p>This website may display Google ads. By using this website, you agree to the display of ads.</p>

      <h2>Privacy Policy</h2>
      <h3>Information Collection</h3>
      <ul>
         <li>We collect and store user-provided information, such as email addresses and passwords, for account creation and authentication purposes.</li>
         <li>We may collect and store payment information for pro account purchases through Stripe.</li>
      </ul>

      <h3>Use of Information</h3>
      <ul>
         <li>User-provided information is used for account management and authentication purposes.</li>
         <li>We may use cookies and similar technologies like google analytics to enhance user experience and track website usage.</li>
      </ul>

      <h3>Data Security</h3>
      <p>We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online.</p>
      <NuxtLink :to="homeRoute"><Icon name="ic:twotone-arrow-forward" />Back to the fun</NuxtLink>
   </div>
</template>
<script>

export default {
   name: 'terms',
   data() {
       return {
           homeRoute: null,
       }
   },
   mounted(){
       if(localStorage.localUser && localStorage.active !== 'false'){
           this.homeRoute = '/member'
       } else{
           this.homeRoute = '/'
       }
   },
   watch: {
       '$route'() {
           this.handleRouteChange();
       }
   },
   
   methods: {
       handleRouteChange() {
           if(localStorage.localUser && localStorage.active !== 'false'){
               this.homeRoute = '/member'
           } else{
               this.homeRoute = '/'
           }
       }
   }

}
</script>
<style lang="scss" scoped>
.terms{
   color: #fff;
   a{
      color: #fff;
      &:last-of-type{
         display:flex;
         flex-direction: row-reverse;
         align-items: center;
         justify-content: center;
         width: fit-content;
         gap: 4px;
         margin: auto;
      }
   }
}

</style>
