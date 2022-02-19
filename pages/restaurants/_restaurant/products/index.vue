<template>
  <section>
    <div class="container is-fluid mt-2 mb-2">
      <div class="columns">
        <div class="column is-3">
          <RestaurantsMenu
            :id="$route.params.restaurant"
            :cart="cart"
            active-menu="products"
            @removeItemFromCart="removeItemFromCart"
          />
        </div>
        <div class="column">
          <div class="box">
            <h2 class="title">Produits à l'unité</h2>
            <div class="columns is-multiline">
              <div
                v-for="product in products"
                :key="`product_` + product.id"
                class="column is-6"
              >
                <RestaurantsItemCard
                  :item="product"
                  @addItemToCart="addItemToCart"
                />
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
  name: 'RestaurantProducts',
  data() {
    return {
      products: [],
      restaurant: {},
      cart: [],
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
