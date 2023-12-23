import sanityConfig from './sanity'

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Topikz',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'A stress free, low pressure conversation and game starter. With over 28 topik types, hundreds of prompts, and even more fun to be explored.'
        },
        { hid: 'og:image', property: 'og:image', content: '~/assets/images/topikz_logo.png' }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Lato&display=swap'
        }
      ]
    }
  },
  css: [
    'primevue/resources/themes/lara-light-teal/theme.css',
    'primevue/resources/primevue.css',
    'primeflex/primeflex.css',
    'primeicons/primeicons.css',
    '~/assets/scss/app.scss'
  ],
  runtimeConfig: {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    public: {
      firebase: {
        apiKey: process.env.apiKey,
        authDomain: process.env.authDomain,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId,
        appId: process.env.appId
      },
      stripeKey: process.env.stripeKey,
      stripeKeySecret: process.env.stripeKeySecret,
      gtagId: 'G-625F0G2TXV',
    },
  },
  styleResources: {
      scss: [
          '~/assets/scss/app.scss'
      ],
  },
  sanity: {
      projectId: 'rla2jbll',
      dataset: 'production',
  },
  typescript: {
    shim: false
  },
  build: {
    transpile: ['primevue'],
  },
   server: {     
    port: 8000, // default: 3000     
    host: '0.0.0.0', // default: localhost   
  },  
  target: 'static',
  
  plugins: [{ src: "@/plugins/aos", ssr: false, mode: "client" }],
  modules: ['nuxt-icon', '@tresjs/nuxt', '@nuxtjs/sanity','@nuxtjs/google-adsense'],
  'google-adsense': {
    id: 'pub-9081500660838093',
    test: false
  },
})
