<template>
  <section>
    <b-modal v-model="isPayModalActive" style='z-index: 9999'>
      <div class='card'>
        <header class="card-header">
          <p class="card-header-title">
            Votre commande de {{ cartTotal | toCurrency }} dans le restaurant {{ restaurant.name }}
          </p>
          <div class='card-header-icon' @click="closePayModal()">
            <button class="delete"></button>
          </div>
        </header>
        <div class='card-content'>
          <div class='content'>
            <div
              v-for="item in cart"
              :key="`cart_` + item.type + '_' + item.id"
            >
              <div class='box'>
                <div class="is-flex is-justify-content-space-between">
                  <div class="is-flex">
                    <img :src="item.image" alt="" class="image is-48x48" />
                    <h3 class="subtitle is-6 ml-1 is-align-self-center">
                      {{ item.name }}
                    </h3>
                  </div>
                  <div class="is-flex">
                    <h3 class="subtitle is-6 is-align-self-center">
                      {{ item.quantity }} x {{ item.amount | toCurrency }} €
                    </h3>
                  </div>
                </div>
              </div>
              <hr/>
            </div>
          </div>
          <div class='box is-flex is-justify-content-space-between'>
            <strong>TOTAL :</strong>
            {{ cartTotal | toCurrency }}
          </div>
          <div id='paypal-buttons' class='has-text-centered'></div>
        </div>
      </div>
    </b-modal>
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
            @payModal='payModal'
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
import { loadScript } from '@paypal/paypal-js'

export default {
  name: "RestaurantLayout",
  layout: "default",
  data() {
    return {
      cart: [],
      restaurant: {},
      isPayModalActive: false
    }
  },
  computed: {
    cartTotal() {
      return this.cart.reduce((acc, item) => {
        return acc + item.amount * item.quantity
      }, 0)
    },
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
        this.saveCartToLocalStorage()
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
    },
    loadCartFromLocalStorage() {
      if (localStorage.getItem("cart_" + this.$route.params.restaurant)) {
        this.cart = JSON.parse(
          localStorage.getItem("cart_" + this.$route.params.restaurant)
        )
      }
    },
    saveCartToLocalStorage() {
      localStorage.setItem(
        "cart_" + this.$route.params.restaurant,
        JSON.stringify(this.cart)
      )
    },
    clearCart() {
      this.cart = []
      this.saveCartToLocalStorage()
      this.$buefy.snackbar.open({
        message: "Le panier a bien été vidé",
        type: "is-success",
      })
    },
    payModal() {
      this.isPayModalActive = true
      loadScript({
        'client-id': this.$config.PAYPAL_CLIENT_ID || '',
        'currency': 'EUR',
        'enable-funding': ['card', 'credit', 'paylater'],
        'components': ['buttons']
      }).then((paypal, $this = this) => {
        paypal.Buttons({
          style: {
            label: 'checkout',
            tagline: 'false',
            layout: 'horizontal',
            color: 'blue',
            shape: 'rect'
          },
          createOrder() {
            return $this.$axios.$post('/api/orders/init', {
              cart: $this.cart,
              restaurant: $this.restaurant.id
            }, {
              headers: {
                'content-type': 'application/json',
                'Authorization': $this.$auth.strategy.token.get()
              }
            }).then((data) => {
              return data.data.result.id
            }).catch((err) => {
              $this.$buefy.snackbar.open({
                message: "Un erreur est survenue : " + err.message,
                type: "is-warning",
              })
            })
          },
          onApprove(data) {
            return $this.$axios.$post('/api/orders/capture', {
              order: data.orderID
            }, {
              headers: {
                'content-type': 'application/json',
                'Authorization': $this.$auth.strategy.token.get()
              }
            }).then((data) => {
              if (data.meta.success === true) {
                $this.clearCart()
                $this.closePayModal()
                $this.$buefy.snackbar.open({
                  message: "Votre commande a été validée. Vous allez être redirigé vers votre commande.",
                  type: "is-success",
                })
                setTimeout(() => {
                  $this.$router.push('/orders')
                }, 3000)
              } else {
                $this.$buefy.snackbar.open({
                  message: "Une erreur est survenue : " + data.meta.message,
                  type: "is-warning",
                })
              }
            })
          },
          onError() {
            return (err) => {
              $this.$buefy.snackbar.open({
                message: "Une erreur est survenue lors de la commande : " + err.message,
                type: "is-danger",
              })
            }
          }
        }).render(document.getElementById('paypal-buttons'))
      }).catch(() => {
        this.$buefy.snackbar.open({
          message: "Une erreur est survenue lors du chargement de Paypal",
          type: "is-danger",
        })
      })
    },
    closePayModal() {
      this.isPayModalActive = false
    },
  },
}
</script>
