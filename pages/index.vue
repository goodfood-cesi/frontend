<template>
  <section>
    <section class="hero is-primary is-medium">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <a class="navbar-item"><img src="https://bulma.io/images/bulma-type-white.png" alt="Logo"></a>
              <span class="navbar-burger" data-target="navbarMenuHeroA">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="navbarMenuHeroA" class="navbar-menu">
              <div class="navbar-end">
                <a class="navbar-item is-active"> Accueil </a> <a class="navbar-item"> Commander ! </a>
                <span class="navbar-item">
              <a class="button is-primary is-inverted">
                <span class="icon">
                 <b-icon icon="account" size="is-small"></b-icon>
                </span>
                <span>Mon compte</span>
              </a>
            </span>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <p class="title">
            Une petite faim ?
          </p>
          <p class="subtitle">
            <button class="button is-large is-primary is-inverted mt-2">
            <span>
              Commander !
            </span> <span class="icon">
                 <b-icon icon="arrow-right-thin-circle-outline" size="is-small"></b-icon>
            </span>
            </button>
          </p>
        </div>
      </div>
      <div class="hero-foot">
        <nav class="tabs is-boxed is-fullwidth">
          <div class="container">
            <ul>
              <li :class="{ 'is-active': activeTab === 'menu' }" @click="tabs('menu')"><a>Notre vision</a></li>
              <li :class="{ 'is-active': activeTab === 'test' }" @click="tabs('test')"><a>Restaurants</a></li>
              <li :class="{ 'is-active': activeTab === 'onsitetakeaway' }" @click="tabs('onsitetakeaway')">
                <a>Sur place ou à emporter !</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
    <section>
      <div v-if="activeTab === 'menu'">Notre menu</div>
      <div v-if="activeTab === 'test'">Test</div>
      <div v-if="activeTab === 'onsitetakeaway'">OnsiteTakeaway</div>
    </section>
  </section>

</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'home',
  data() {
    return {
      activeTab: 'menu'
    }
  },
  methods: {
    tabs(tab) {
      this.activeTab = tab
    }
  }
}
</script>
