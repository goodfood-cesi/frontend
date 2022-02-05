<template>
  <section class="container is-fluid mt-4">
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <strong>{{ restaurants.length }}</strong> restaurants
          </p>
        </div>
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <input class="input" type="text" placeholder="Rechercher un restaurant">
            </p>
            <p class="control">
              <b-button icon-left="magnify">
                Rechercher
              </b-button>
            </p>
          </div>
        </div>
      </div>
      <div class="level-right">
        <p class="level-item">
          <a href="#" :class="[mode === 'list' ? 'has-text-grey-darker' : '']" @click.prevent="changeMode('list')">
            <b-icon icon="view-list"/>
          </a></p>
        <p class="level-item">
          <a href="#" :class="[mode === 'grid' ? 'has-text-grey-darker' : '']" @click.prevent="changeMode('grid')">
            <b-icon icon="view-grid"/>
          </a></p>
        <p class="level-item">
          <a href="#" :class="[mode === 'map' ? 'has-text-grey-darker' : '']" @click.prevent="changeMode('map')">
            <b-icon icon="map-marker-minus"/>
          </a></p>
      </div>
    </nav>
    <section v-if="mode === 'list'">
      <section>
        <b-table :data="restaurants" :paginated="true" :current-page.sync="currentPage" :pagination-simple="true" :per-page="15" sort-icon="chevron-up">

          <b-table-column v-slot="props" field="name" label="Nom" sortable>
            {{ props.row.name }}
          </b-table-column>

          <b-table-column v-slot="props" field="address" label="Adresse" sortable>
            {{ props.row.address }}
          </b-table-column>

          <b-table-column v-slot="props" field="phone" label="Téléphone" sortable>
            {{ props.row.phone }}
          </b-table-column>

          <b-table-column v-slot="props" custom-key="actions">
            <div class="buttons has-addons">
              <b-button icon-right="map-search" type="is-info is-light" @click.prevent="locateOnMap([props.row.latitude, props.row.longitude])">Voir sur la carte</b-button>
              <b-button tag="nuxt-link" :to="`/restaurants/` + props.row.id" icon-right="arrow-right-thin-circle-outline" type="is-primary is-light">Commander</b-button>
            </div>
          </b-table-column>

        </b-table>
      </section>
    </section>
    <section v-if="mode === 'grid'">
      <div class="columns is-multiline">
        <div v-for="r in restaurants" :key="r.id" class="column is-3">
          <section>
            <div class="card">
              <div class="card-header">
                <p class="card-header-title is-justify-content-space-between">
                  {{ r.name }}
                  <a href="#" @click.prevent="locateOnMap([r.latitude, r.longitude])"><b-icon icon="map-search"/></a>
                </p>
              </div>
              <div class="card-image">
                <figure class="image is-3by1">
                  <img :src="r.image" alt="Placeholder image">
                </figure>
              </div>
              <div class="card-content">
                <div class="content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. <a>#buefy</a>.
                </div>
              </div>
              <footer class="card-footer">
                <a class="card-footer-item">
                  <b-button tag="nuxt-link" :to="`/restaurants/` + r.id" icon-right="arrow-right-thin-circle-outline" type="is-primary is-light" native-type="submit" expanded>Commander</b-button>
                </a>
              </footer>
            </div>
          </section>
        </div>
      </div>
    </section>
    <section v-if="mode === 'map'">
      <RestaurantsMap :zoom="zoom" :center="center" :restaurants="restaurants"/>
    </section>
  </section>
</template>
<script>
export default {
  name: "RestaurantsPage",
  data() {
    return {
      restaurants: [],
      mode: 'grid',
      currentPage: 1,
      map : null,
      center: [48.866667,  2.333333],
      zoom: 8
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
    changeMode(mode) {
      this.mode = mode
    },
    locateOnMap(coordinates) {
      this.center = coordinates
      this.zoom = 13
      this.mode = 'map'
    }
  },
}
</script>
