<template>
  <section>
    <AppNavbar />
    <div class="container is-fluid mt-2 mb-2">
      <div class="columns">
        <div class="column is-3">
          <RestaurantsMenu
            :restaurant="restaurant"
            :cart="cart"
            @plusItemInCart="plusItemInCart"
            @minusItemInCart="minusItemInCart"
            @clearCart="clearCart"
          />
        </div>
        <div class="column">
          <div class="box">
            <NuxtChild @addItemToCart="addItemToCart" />
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
  data() {
    return {
      cart: [],
      restaurant: {},
    }
  },
  async mounted() {
    this.loadCartFromLocalStorage()
    await this.$axios
      .get("/api/restaurants/restaurants/" + this.$route.params.restaurant)
      .then((response) => {
        this.restaurant = response.data.data
      })
      .catch(() => {
        this.$router.push("/")
        this.$buefy.snackbar.open({
          message: "Impossible de récupérer les données du restaurant",
          type: "is-danger",
        })
      })
  },
  methods: {
    addItemToCart(item) {
      let type = "product"
      if (item.products) {
        type = "menu"
      }

      if (
        this.cart.find(
          (cartItem) => cartItem.id === item.id && cartItem.type === type
        )
      ) {
        this.cart.find(
          (cartItem) => cartItem.id === item.id && cartItem.type === type
        ).quantity++
      } else {
        this.cart.push({ ...item, quantity: 1, type: type })
      }
      this.saveCartToLocalStorage()
      if (type === "menu") {
        this.$buefy.snackbar.open({
          message: "Le menu a bien été ajouté au panier",
          type: "is-success",
        })
      } else {
        this.$buefy.snackbar.open({
          message: "Le produit a bien été ajouté au panier",
          type: "is-success",
        })
      }
    },
    plusItemInCart(item) {
      this.cart.find(
        (cartItem) => cartItem.id === item.id && cartItem.type === item.type
      ).quantity++
      this.saveCartToLocalStorage()
    },
    minusItemInCart(item) {
      if (
        this.cart.find(
          (cartItem) => cartItem.id === item.id && cartItem.type === item.type
        ).quantity > 1
      ) {
        this.cart.find(
          (cartItem) => cartItem.id === item.id && cartItem.type === item.type
        ).quantity--
      } else {
        this.cart = this.cart.filter((cartItem) => cartItem !== item)
        if (item.type === "menu") {
          this.$buefy.snackbar.open({
            message: "Le menu a bien été supprimé du panier",
            type: "is-success",
          })
        } else {
          this.$buefy.snackbar.open({
            message: "Le produit a bien été supprimé du panier",
            type: "is-success",
          })
        }
      }
      this.saveCartToLocalStorage()
    },
    loadCartFromLocalStorage() {
      if (localStorage.getItem("cart")) {
        this.cart = JSON.parse(localStorage.getItem("cart"))
      }
    },
    saveCartToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart))
    },
    clearCart() {
      this.cart = []
      this.saveCartToLocalStorage()
      this.$buefy.snackbar.open({
        message: "Le panier a bien été vidé",
        type: "is-success",
      })
    },
  },
}
</script>
