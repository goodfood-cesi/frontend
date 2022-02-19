<template>
  <section>
    <div class="container is-fluid mt-2 mb-2">
      <div class="columns">
        <div class="column is-3">
          <RestaurantsMenu
            :id="$route.params.restaurant"
            :cart="cart"
            active-menu="menus"
            @removeItemFromCart="removeItemFromCart"
          />
        </div>
        <div class="column">
          <div class="box">
            <h2 class="title">Menus</h2>
            <div class="columns is-multiline">
              <div
                v-for="menu in menus"
                :key="`menu_` + menu.id"
                class="column is-6"
              >
                <RestaurantsItemCard
                  :item="menu"
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
  name: 'RestaurantMenus',
  data() {
    return {
      menus: [],
      cart: [],
    }
  },
  async mounted() {
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
  },
  methods: {
    addItemToCart(item) {
      if(this.cart.find(cartItem => cartItem.id === item.id)) {
        this.cart.find(cartItem => cartItem.id === item.id).quantity++
      } else {
        this.cart.push({...item, quantity: 1})
      }
      this.$buefy.snackbar.open({
        message: 'Le menu a été ajouté au panier',
        type: 'is-success',
      })
    },
    removeItemFromCart(item) {
      if(item.quantity > 1) {
        this.cart.find(cartItem => cartItem.id === item.id).quantity--
      } else {
        this.cart = this.cart.filter((cartItem) => cartItem.id !== item.id)
      }
      this.$buefy.snackbar.open({
        message: 'Le menu a été retiré du panier',
        type: 'is-success',
      })
    },
  },
}
</script>
