<template>
  <section>
    <AppNavbar />
    <div class="container is-fluid mt-2 mb-2">
      <div class="columns">
        <div class="column is-3">
          <RestaurantsMenu
            :restaurant="restaurant"
            :cart="cart"
            :active-menu='activeMenu'
            @removeItemFromCart="removeItemFromCart"
            @setActiveMenu="setActiveMenu"
          />
        </div>
        <div class="column">
          <div class="box">
            <NuxtChild @addItemToCart='addItemToCart'/>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </section>
</template>

<script>
export default {
  name: "RestaurantLayout",
  layout: "default",
  data () {
    return {
      cart: [],
      restaurant: {},
      activeMenu: '',
    }
  },
  async mounted() {
    this.loadCartFromLocalStorage()
    await this.$axios
      .get('/api/restaurants/restaurants/' + this.$route.params.restaurant)
      .then((response) => {
        this.restaurant = response.data.data
      })
      .catch(() => {
        this.$router.push('/')
        this.$buefy.snackbar.open({
          message: 'Impossible de récupérer les données du restaurant',
          type: 'is-danger'
        })
      })
  },
  methods: {
    setActiveMenu(menu) {
      this.activeMenu = menu
    },
    addItemToCart(item) {
      if (this.cart.find((cartItem) => cartItem.id === item.id)) {
        this.cart.find((cartItem) => cartItem.id === item.id).quantity++
      } else {
        this.cart.push({ ...item, quantity: 1 })
      }
      this.saveCartToLocalStorage()
      this.$buefy.snackbar.open({
        message: "Le menu a été ajouté au panier",
        type: "is-success",
      })
    },
    removeItemFromCart(item) {
      if (item.quantity > 1) {
        this.cart.find((cartItem) => cartItem.id === item.id).quantity--
      } else {
        this.cart = this.cart.filter((cartItem) => cartItem.id !== item.id)
      }
      this.saveCartToLocalStorage()
      this.$buefy.snackbar.open({
        message: 'Le menu a été retiré du panier',
        type: 'is-success'
      })
    },
    loadCartFromLocalStorage() {
      if (localStorage.getItem('cart')) {
        this.cart = JSON.parse(localStorage.getItem('cart'))
      }
    },
    saveCartToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.cart))
    }
  }
}
</script>
