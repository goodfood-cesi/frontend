<template>
  <section>
    <section class="hero is-primary is-medium">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <div class="navbar-item">
                <img src="~/assets/logo_light_simple.svg" alt="Logo GoodFood" class="image is-128x128"/>
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
            <b-button class="mt-2" size="is-large" icon-right="arrow-right-thin-circle-outline" tag="router-link" type="is-primary" to="/restaurants" inverted>
              Commander !
            </b-button>
          </p>
        </div>
      </div>
      <div class="hero-foot">
        <nav class="tabs is-boxed is-medium is-fullwidth">
          <div class="container">
            <ul>
              <li :class="{ 'is-active': activeTab === 'vision' }" @click="tabs('vision')"><a>Notre vision</a></li>
              <li :class="{ 'is-active': activeTab === 'restaurants' }" @click="tabs('restaurants')"><a>Restaurants</a>
              </li>
              <li :class="{ 'is-active': activeTab === 'onsitetakeaway' }" @click="tabs('onsitetakeaway')">
                <a>Sur place ou à emporter !</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body py-2">
        <div class="container has-text-centered">
          <span class="tag is-primary">Nouveau !</span> Notre site web vous permet de commander en ligne dans nos restaurants, sur place ou à emporter !
        </div>
      </div>
    </section>
    <section>
      <div v-if="activeTab === 'vision'">
        <section class="infos">
          <div class="container">
            <div class="columns">
              <div class="column is-12">
                <div class="columns">
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
                          <b-button class="mt-2" size="is-medium" icon-right="arrow-right-thin-circle-outline" tag="router-link" type="is-primary" to="/restaurants">
                            Commander !
                          </b-button>
                        </div>

                      </div>
                    </article>
                  </div>
                </div>
                <hr>
                <div class="columns">
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
      <div v-if="activeTab === 'restaurants'">
        <div id="map-wrap" style="height: 75vh">
          <client-only>
            <l-map :zoom=8 :center="center">
              <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
              <l-marker v-for="r in restaurants" :key="r.id" :lat-lng="[r.latitude, r.longitude]">
                <l-popup>
                  <div>
                    {{ r.name }} <br> {{ r.address }} <br> {{ r.phone }}
                    <b-button icon-right="arrow-right-thin-circle-outline" tag="router-link" type="is-primary" :to="`/restaurants/` + r.id" expanded>
                      Commandez dès maintenant !
                    </b-button>
                  </div>
                </l-popup>
              </l-marker>
            </l-map>
          </client-only>
        </div>
        <a @click.prevent="addMarker">tt</a>
      </div>
      <div v-if="activeTab === 'onsitetakeaway'">
        <section class="infos">
          <div class="container">
            <div class="columns">
              <div class="column is-12 info">
                <article class="columns">
                  <div class="column is-6 featured-content va">
                    <div>
                      <h1 class="title">Sur place</h1>
                      <p class="info-excerpt">Déjeunez sur place dans nos restaurants en réservant dès maintenant en ligne.</p>
                    </div>

                  </div>
                  <div class="column is-6 info-img">
                    <img src="http://source.unsplash.com/random/750x300/?food" alt="">
                  </div>
                </article>
              </div>
            </div>
            <hr>
            <div class="columns">
              <div class="column is-12 info">
                <article class="columns">
                  <div class="column is-6 info-img">
                    <img src="http://source.unsplash.com/random/750x300/?food" alt="">
                  </div>
                  <div class="column is-6 featured-content va">
                    <div>
                      <h1 class="title">A emporter</h1>
                      <p class="info-excerpt">Commandez dès maintenant en ligne et retirez en Click & Collect dans le restaurant de votre choix !</p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
            <b-button size="is-large" icon-right="arrow-right-thin-circle-outline" tag="router-link" type="is-primary" to="/restaurants" expanded>
              Commandez dès maintenant !
            </b-button>
          </div>
        </section>
      </div>
    </section>
    <AppFooter/>
  </section>

</template>
<script>
export default {
  name: 'IndexPage',
  layout: 'home',
  middleware: 'guest',
  data() {
    return {
      activeTab: 'vision',
      restaurants: [],
      center: [48.856614, 2.3522219],
    }
  },
  async mounted() {
    await this.$axios.get('/api/restaurants/restaurants')
      .then(response => {
        this.restaurants = response.data.data
      })
      .catch(() => {
        this.$buefy.snackbar.open({message: 'Impossible de récupérer la liste des restaurants', type: 'is-danger'})
      })

    await this.$axios.get('/api/geo/json')
      .then(response => {
        this.center = [response.data.lat, response.data.lon]
      })
      .catch(() => {
        this.$buefy.snackbar.open({message: 'Impossible de récupérer votre localisation', type: 'is-danger'})
      })
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
  padding-top: 2rem;
  padding-bottom: 5rem;
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
