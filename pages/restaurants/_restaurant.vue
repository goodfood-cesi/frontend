<template>
  <section>
    <div class="container is-fluid mt-2 mb-2">
      <div class='box'>
        Infos resto
        <p>{{ restaurant.id }} - {{ restaurant.name }}</p>
        <p>{{ restaurant.address }}</p>

        Menus
        <div v-for='menu in menus' :key='menu.id'>
          {{menu.id }} - {{ menu.name }}
        </div>

        Produits
        <div v-for='product in products' :key='product.id'>
          {{product.id }} - {{ product.name }}
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
      restaurant: {
        id: '',
        name: '',
        address: ''
      },
      menus: [],
      products: []
    }
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
      .get('/api/restaurants/restaurants/' + this.$route.params.restaurant + '/menus')
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
      .get('/api/restaurants/restaurants/' + this.$route.params.restaurant + '/products')
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
  }
}
</script>
