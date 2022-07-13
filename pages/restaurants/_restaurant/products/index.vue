<template>
  <section>
    <h2 class="title">Produits à l'unité</h2>
    <div class="columns is-multiline">
      <div
        v-for="product in products"
        :key="`product_` + product.id"
        class="column is-6"
      >
        <RestaurantsItemCard
          :item="product"
          @addItemToCart="$emit('addItemToCart', product)"
        />
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'RestaurantProducts',
  layout: 'restaurant',
  data() {
    return {
      products: [],
      restaurant: {},
    }
  },
  head() {
    return {
      title: "Good Food - Produits à l'unité",
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
          message: 'Impossible de récupérer les produits du restaurant',
          type: 'is-danger',
        })
      })
  },
}
</script>
