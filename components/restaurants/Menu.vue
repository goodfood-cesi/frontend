<template>
  <aside>
    <div v-if="restaurant != null" class="card">
      <div class="card-header">
        <p class="card-header-title">
          <NuxtLink :to="`/restaurants/` + restaurant.id">{{
            restaurant.name
          }}</NuxtLink>
        </p>
      </div>
      <div class="card-content">
        <div class="menu">
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
                  'is-active':
                    currentPageName === 'restaurants-restaurant-menus',
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
      </div>
    </div>
    <div v-else class="card">
      <p>Chargement...</p>
    </div>
    <div class="card mt-2">
      <div class="card-header">
        <div class="card-header-title">Votre panier ({{ itemsInCart }})</div>
      </div>
      <div class="card-content">
        <div class="menu">
          <ul v-if="itemsInCart === 0" class="menu-list">
            <li>Votre panier est vide...</li>
          </ul>
          <ul v-else class="menu-list">
            <div
              v-for="(item, i) in cart"
              :key="`cart_` + item.type + '_' + item.id"
            >
              <div class="is-flex is-justify-content-space-between">
                <div class="is-flex">
                  <img :src="item.image" alt="" class="image is-48x48" />
                  <h3 class="subtitle is-6 ml-1 is-align-self-center">
                    {{ item.name }}
                  </h3>
                </div>
                <div class="buttons has-addons">
                  <b-button
                    type="is-danger is-light"
                    size="is-small"
                    @click.prevent.stop="$emit('minusItemInCart', item)"
                    >-</b-button
                  >
                  <b-button type="is-primary is-light" size="is-small"
                    >{{ item.quantity }} x {{ item.amount }} €</b-button
                  >
                  <b-button
                    type="is-info is-light"
                    size="is-small"
                    @click.prevent.stop="$emit('plusItemInCart', item)"
                    >+</b-button
                  >
                </div>
              </div>
              <hr v-if="i + 1 !== cart.length" />
            </div>
          </ul>
        </div>
      </div>
      <footer class="card-footer">
        <div class="card-footer-item">
          <b-button
            icon-right="cart-remove"
            type="is-danger is-light"
            :disabled="itemsInCart === 0"
            expanded
            @click="$emit('clearCart')"
          >
            Vider le panier
          </b-button>
        </div>
        <div class="card-footer-item">
          <b-button
            icon-right="arrow-right-thin-circle-outline"
            type="is-primary is-light"
            :disabled="!$auth.loggedIn || itemsInCart === 0"
            expanded
            @click="$emit('payModal')"
          >
            Commander ({{ cartTotal | toCurrency }})
          </b-button>
        </div>
      </footer>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'RestaurantsMenu',
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
    itemsInCart() {
      return this.cart.reduce((acc, item) => {
        return acc + item.quantity
      }, 0)
    },
  },
}
</script>
