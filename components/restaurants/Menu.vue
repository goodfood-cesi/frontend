<template>
  <aside>
    <div v-if="restaurant != null" class="box menu">
      <p class="menu-label">
        {{ restaurant.name }}
      </p>
      <ul class="menu-list">
        <li>
          <NuxtLink
            :to="`/restaurants/` + restaurant.id"
            :class="{
              'is-active': currentPageName === 'restaurants-restaurant',
            }"
            >Le restaurant
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            :to="`/restaurants/` + restaurant.id + `/menus`"
            :class="{
              'is-active': currentPageName === 'restaurants-restaurant-menus',
            }"
          >
            Menus
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            :to="`/restaurants/` + restaurant.id + `/products`"
            :class="{
              'is-active':
                currentPageName === 'restaurants-restaurant-products',
            }"
          >
            Produits à l'unité
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div v-else class="box">
      <p>Chargement...</p>
    </div>
    <div class="box menu">
      <div class="menu-label">Votre panier ({{ cart.length }})</div>
      <ul v-if="cart.length === 0" class="menu-list mb-3">
        <li class="box">Votre panier est vide...</li>
      </ul>
      <ul v-else class="menu-list mb-3">
        <li
          v-for="item in cart"
          :key="`cart_` + item.id"
          class="box is-flex is-justify-content-space-between mb-1"
        >
          <div class="is-flex">
            <img :src="item.image" alt="" class="image is-32x32" />
            <p class="ml-1">{{ item.name }}</p>
          </div>
          <span class="tag is-primary"
            >{{ item.quantity }} x {{ item.amount }} €
            <b-button
              class="delete"
              type="is-primary"
              @click="$emit('removeItemFromCart', item)"
            />
          </span>
        </li>
        <li class="box mt-2 is-flex is-justify-content-space-between">
          <p>TOTAL :</p>
          <p>
            <strong>{{ cartTotal | toCurrency }}</strong>
          </p>
        </li>
      </ul>
      <footer class="card-footer">
        <div class="card-footer-item">
          <b-button
            icon-right="cart-remove"
            type="is-danger is-light"
            :disabled="cart.length === 0"
            expanded
            @click="$emit('clearCart')"
          >
            Vider le panier
          </b-button>
        </div>
        <div class="card-footer-item">
          <b-button
            tag="nuxt-link"
            :to="`/pay`"
            icon-right="arrow-right-thin-circle-outline"
            type="is-primary is-light"
            :disabled="cart.length === 0"
            expanded
          >
            Commander
          </b-button>
        </div>
      </footer>
    </div>
  </aside>
</template>

<script>
export default {
  name: "RestaurantsMenu",
  props: {
    restaurant: {
      type: Object,
      required: true,
    },
    cart: {
      type: Array,
      required: true,
    },
  },
  computed: {
    cartTotal() {
      return this.cart.reduce((acc, item) => {
        return acc + item.amount * item.quantity
      }, 0)
    },
    currentPageName() {
      return this.$route.name
    },
  },
}
</script>
