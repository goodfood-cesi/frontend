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
  name: "RestaurantProducts",
  data() {
    return {
      products: [],
      restaurant: {},
      cart: [],
    }
  },
  async mounted() {
    this.loadCartFromLocalStorage()
    await this.$axios
      .get(
        "/api/restaurants/restaurants/" +
          this.$route.params.restaurant +
          "/products"
      )
      .then((response) => {
        this.products = response.data.data
      })
      .catch(() => {
        this.$router.push("/")
        this.$buefy.snackbar.open({
          message: "Impossible de récupérer les menus du restaurant",
          type: "is-danger",
        })
      })
  },
  methods: {
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
        message: "Le menu a été retiré du panier",
        type: "is-success",
      })
    },
    loadCartFromLocalStorage() {
      if (localStorage.getItem("cart")) {
        this.cart = JSON.parse(localStorage.getItem("cart"))
      }
    },
    saveCartToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart))
    },
  },
}
</script>
