<template>
  <section>
    <section class="hero is-primary is-medium">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <div class="navbar-item">
                <img src="https://bulma.io/images/bulma-type-white.png" alt="Logo">
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
              </span>
              <span class="icon">
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
              <li :class="{ 'is-active': activeTab === 'vision' }" @click="tabs('vision')"><a>Notre vision</a></li>
              <li :class="{ 'is-active': activeTab === 'test' }" @click="tabs('test')"><a>Restaurants</a></li>
              <li :class="{ 'is-active': activeTab === 'onsitetakeaway' }" @click="tabs('onsitetakeaway')">
                <a>Sur place ou à emporter !</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body py-3">
        <div class="container has-text-centered">
          <span class="tag is-primary">Nouveau !</span> Notre site web vous permet de commander en ligne dans nos restaurants, sur place ou à emporter !
        </div>
      </div>
    </section>
    <section>
      <div v-if="activeTab === 'vision'">
        <section class="infos mt-2">
          <div class="container">
            <div class="columns">
              <div class="column is-12">
                <div class="columns is-multiline">
                  <div class="column is-12 info">
                    <article class="columns">
                      <div class="column is-7 info-img">
                        <img src="http://source.unsplash.com/random/750x300/?food" alt="">
                      </div>
                      <div class="column is-5 featured-content va">
                        <div>
                          <h1 class="title">Une cuisine attentionnée</h1>
                          <p class="info-excerpt">Chez GoodFood, le fer de lance c'est la satisfaction client. C'est pour cela que nous élaborons nos plats en relation directe avec les consommateurs. Cela se traduit en sondages, avis...</p>
                          <br>
                          <button class="button is-medium is-primary mt-2">
                            <span>
                              Commander !
                            </span>
                            <span class="icon">
                              <b-icon icon="arrow-right-thin-circle-outline" size="is-small"></b-icon>
                            </span>
                          </button>
                        </div>

                      </div>
                    </article>
                  </div>
                </div>
                <hr>
                <div class="columns is-multiline">
                  <div class="column info is-4">
                    <article class="columns is-multiline">
                      <div class="column is-12">
                        <img src="http://source.unsplash.com/random/500x300/?food" alt="Featured Image">
                      </div>
                      <div class="column is-12 featured-content ">
                        <h3 class="heading">CATEGORIE</h3>
                        <h1 class="title">Argument #1</h1>
                        <p class="info-excerpt">Description.</p>
                        <br>
                      </div>
                    </article>
                  </div>
                  <div class="column info is-4">
                    <article class="columns is-multiline">
                      <div class="column is-12">
                        <img src="http://source.unsplash.com/random/500x300/?food" alt="Featured Image">
                      </div>
                      <div class="column is-12 featured-content ">
                        <h3 class="heading">CATEGORIE</h3>
                        <h1 class="title">Argument #2</h1>
                        <p class="info-excerpt">Description.</p>
                        <br>
                      </div>
                    </article>
                  </div>
                  <div class="column info is-4">
                    <article class="columns is-multiline">
                      <div class="column is-12">
                        <img src="http://source.unsplash.com/random/500x300/?food" alt="Featured Image">
                      </div>
                      <div class="column is-12 featured-content ">
                        <h3 class="heading">CATEGORIE</h3>
                        <h1 class="title">Argument #3</h1>
                        <p class="info-excerpt">Description.</p>
                        <br>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div v-if="activeTab === 'test'">Test</div>
      <div v-if="activeTab === 'onsitetakeaway'">OnsiteTakeaway</div>
    </section>
    <AppFooter />
  </section>

</template>
<script>
export default {
  name: 'IndexPage',
  layout: 'home',
  data() {
    return {
      activeTab: 'vision'
    }
  },
  methods: {
    tabs(tab) {
      this.activeTab = tab
    }
  }
}
</script>
<style>
.va {
  display: flex;
  align-items: center;
}

.navbar .navbar-item {
  color: #e4e2ff;
}

.infos {
  padding-top: 4rem;
  padding-bottom: 10rem;
}

.infos article {
  padding: 1.5rem;
}

.infos .info img {
  border-radius: 6px;
}

.infos .info .info-excerpt {
  line-height: 1.5rem;
  letter-spacing: .03rem;
  font-size: 1.2rem;
  font-family: serif;
  color: #92a3ab;
}
</style>
