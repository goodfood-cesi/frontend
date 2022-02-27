export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "frontend",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/app"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~plugins/filters.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    // https://go.nuxtjs.dev/stylelint
    "@nuxtjs/stylelint-module",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "nuxt-buefy",
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "nuxt-leaflet",
    "@nuxtjs/recaptcha",
    "@nuxtjs/auth-next",
    "@nuxtjs/proxy",
  ],

  proxy: {
    "/api/auth/": {
      target: process.env.AUTH_API_URL,
      pathRewrite: { "^/api/auth/": "" },
    },
    "/api/restaurants/": {
      target: process.env.RESTAURANTS_API_URL,
      pathRewrite: { "^/api/restaurants/": "" },
    },
    "/api/orders/": {
      target: process.env.ORDERS_API_URL,
      pathRewrite: { "^/api/orders/": "" },
    },
    "/api/geo/": {
      target: "http://ip-api.com/",
      pathRewrite: { "^/api/geo/": "" },
    },
  },

  auth: {
    strategies: {
      laravelJWT: {
        provider: "laravel/jwt",
        url: `/api/auth`,
        token: {
          property: "token",
          maxAge: 60 * 5,
        },
        refreshToken: {
          maxAge: 60 * 7200,
        },
        user: {
          property: "data",
          autoFetch: true,
        },
        endpoints: {
          login: {
            url: "/login",
          },
          refresh: {
            url: "/refresh",
          },
          logout: {
            url: "/logout",
          },
          user: {
            url: "/user",
          },
        },
      },
    },
    redirect: {
      login: "/account/login",
      logout: "/account/login",
      callback: "/account/login",
      home: "/restaurants",
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: "GoodFood",
      short_name: "GoodFood",
      desription: "GoodFood - Plateforme de commande en ligne",
      lang: "fr",
    },
  },

  loading: {
    color: "white",
    height: "2px",
    throttle: 0,
    duration: 2500,
  },

  loadingIndicator: {
    name: "circle",
    color: "#3b8070",
    background: "white",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  recaptcha: {
    siteKey: process.env.RECAPTCHA_SITE_KEY,
    hideBadge: false,
    version: 2,
    size: "invisible",
  },
  publicRuntimeConfig: {
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  },
}
