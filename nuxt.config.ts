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
          content: 'Nuxt3 + Firebase Authentication Demo'
        }
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
    transpile: ['primevue']
  },
  plugins: [{ src: "@/plugins/aos", ssr: false, mode: "client" }],
  modules: ['nuxt-icon', '@tresjs/nuxt', '@nuxtjs/sanity'],
  //'@nuxtjs/google-adsense'
  // 'google-adsense': {
  //   id: 'pub-9081500660838093',
  //   test: true
  // }
})
