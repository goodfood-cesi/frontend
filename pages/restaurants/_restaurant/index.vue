<template>
  <section>
    <div class="container is-fluid mt-2 mb-2">
      <div class="columns">
        <div class="column is-2">
          <div class="box">
            <aside class="menu">
              <p class="menu-label">
                {{ restaurant.name }}
              </p>
              <ul class="menu-list">
                <li>
                  <NuxtLink
                    :to="`/restaurants/` + restaurant.id"
                    class="is-active"
                    >Le restaurant</NuxtLink
                  >
                </li>
              </ul>
              <ul class="menu-list">
                <li>
                  <NuxtLink :to="`/restaurants/` + restaurant.id + `/menus`"
                    >Menus</NuxtLink
                  >
                </li>
              </ul>
              <ul class="menu-list">
                <li>
                  <NuxtLink :to="`/restaurants/` + restaurant.id + `/products`"
                    >Produits à l'unité</NuxtLink
                  >
                </li>
              </ul>
              <p class="menu-label">
                <strong>Votre panier</strong>
              </p>
            </aside>
          </div>
        </div>
        <div class="column">
          <div class="box">
            <div
              class="is-flex is-justify-content-space-between is-align-content-center"
            >
              <div>
                <h1 class="title">{{ restaurant.name }}</h1>
              </div>
              <div class="buttons has-addons">
                <b-button
                  tag="a"
                  :href="`tel:` + restaurant.phone"
                  icon-right="phone"
                  type="is-primary is-light"
                  >Appeler</b-button
                >
              </div>
            </div>
            <hr />
            <img
              :src="restaurant.image"
              alt="Image du restaurant"
              class="image mb-3"
            />
            <div class="columns">
              <div class="column is-6">
                <h2 class="title">Accès au restaurant</h2>
                <h2 class="subtitle">{{ restaurant.address }}</h2>
                <RestaurantsMap
                  :height="50"
                  :zoom="11"
                  :center="center"
                  :restaurants="restaurants"
                />
              </div>
              <div class="column is-6">
                <h2 class="title">Horaires</h2>
                <hr />
                <table class="table is-bordered is-hoverable is-fullwidth">
                  <thead>
                    <tr>
                      <th>Jour</th>
                      <th>Horaire d'ouverture</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Lundi</td>
                      <td>11h00 - 14h00 / 18h00 - 22h00</td>
                    </tr>
                    <tr>
                      <td>Mardi</td>
                      <td>11h00 - 14h00 / 18h00 - 22h00</td>
                    </tr>
                    <tr>
                      <td>Mercredi</td>
                      <td>11h00 - 14h00 / 18h00 - 22h00</td>
                    </tr>
                    <tr>
                      <td>Jeudi</td>
                      <td>11h00 - 14h00 / 18h00 - 22h00</td>
                    </tr>
                    <tr>
                      <td>Vendredi</td>
                      <td>11h00 - 14h00 / 18h00 - 22h00</td>
                    </tr>
                    <tr>
                      <td>Samedi</td>
                      <td>11h00 - 14h00 / 18h00 - 22h00</td>
                    </tr>
                    <tr>
                      <td>Dimanche</td>
                      <td><strong>Fermé</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'RestaurantPage',
  data() {
    return {
      restaurant: {},
      menus: [],
      products: [],
    }
  },
  computed: {
    center() {
      if (this.restaurant.latitude && this.restaurant.longitude) {
        return [this.restaurant.latitude, this.restaurant.longitude]
      } else {
        return [48.866667, 2.333333]
      }
    },
    restaurants() {
      if (this.restaurant.latitude && this.restaurant.longitude) {
        return [this.restaurant]
      } else {
        return []
      }
    },
  },
  async mounted() {
    await this.$axios
      .get('/api/restaurants/restaurants/' + this.$route.params.restaurant)
      .then((response) => {
        this.restaurant = response.data.data
      })
      .catch(() => {
        this.$router.push('/')
        this.$buefy.snackbar.open({
          message: 'Impossible de récupérer les données du restaurant',
          type: 'is-danger',
        })
      })

    await this.$axios
      .get(
        '/api/restaurants/restaurants/' +
          this.$route.params.restaurant +
          '/menus'
      )
      .then((response) => {
        this.menus = response.data.data
      })
      .catch(() => {
        this.$router.push('/')
        this.$buefy.snackbar.open({
          message: 'Impossible de récupérer les menus du restaurant',
          type: 'is-danger',
        })
      })

    await this.$axios
      .get(
        '/api/restaurants/restaurants/' +
          this.$route.params.restaurant +
          '/products'
      )
      .then((response) => {
        this.products = response.data.data
      })
      .catch(() => {
        this.$router.push('/')
        this.$buefy.snackbar.open({
          message: 'Impossible de récupérer les produits du restaurant',
          type: 'is-danger',
        })
      })
  },
}
</script>
