<template>
  <section>
    <div class="container is-fluid mt-2 mb-2">
      <div class="columns">
        <div class="column is-3">
          <RestaurantsMenu
            :id="$route.params.restaurant"
            :cart="cart"
            active-menu="restaurant"
            @removeItemFromCart='removeItemFromCart'
          />
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
                  >Appeler
                </b-button>
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
      cart: []
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
  },
  methods: {
    addItemToCart(item) {
      this.cart.push(item)
    },
    removeItemFromCart(item) {
      this.cart = this.cart.filter((cartItem) => cartItem.id !== item.id)
    },
  },
}
</script>
