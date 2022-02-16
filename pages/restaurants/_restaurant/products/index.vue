<template>
  <section>
    Products
    <div v-for="product in products" :key="product.id">
      {{ product.name }}
    </div>
  </section>
</template>
<script>
export default {
  name: 'RestaurantProducts',
  data() {
    return {
      products: [],
    }
  },
  async mounted() {
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
          message: 'Impossible de récupérer les menus du restaurant',
          type: 'is-danger',
        })
      })
  },
}
</script>
