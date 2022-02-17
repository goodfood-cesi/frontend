<template>
  <section>
    <div class="container is-fluid mt-2 mb-2">
      <div class="columns">
        <div class="column is-2">
          <div class="box">
            <aside class="menu">
              <p class="menu-label">
                {{ restaurant.name }}
              </p>
              <ul class="menu-list">
                <li>
                  <NuxtLink :to="`/restaurants/` + $route.params.restaurant"
                    >Le restaurant</NuxtLink
                  >
                </li>
              </ul>
              <ul class="menu-list">
                <li>
                  <NuxtLink
                    :to="`/restaurants/` + $route.params.restaurant + `/menus`"
                    class="is-active"
                    >Menus</NuxtLink
                  >
                </li>
              </ul>
              <ul class="menu-list">
                <li>
                  <NuxtLink
                    :to="
                      `/restaurants/` + $route.params.restaurant + `/products`
                    "
                    >Produits à l'unité</NuxtLink
                  >
                </li>
              </ul>
              <p class="menu-label">
                <strong>Votre panier</strong>
              </p>
            </aside>
          </div>
        </div>
        <div class="column">
          <div class="box">
            <h2 class="title">Menus</h2>
            <div class="columns is-multiline">
              <a
                v-for="menu in menus"
                :key="menu.id"
                href="#"
                class="column is-6"
              >
                <div
                  class="box is-flex is-justify-content-space-between is-align-items-start"
                >
                  <div class="is-flex">
                    <img :src="menu.image" alt="" class="image is-96x96" />
                    <div class="ml-2">
                      <h2 class="title is-4 mb-1">{{ menu.name }}</h2>
                      <p v-for="product in menu.products" :key="product.id">
                        1x {{ product.name }}
                      </p>
                    </div>
                  </div>
                  <b-button
                    type="is-primary"
                    icon-right="cart-plus"
                    click.prevent.stop=""
                  />
                </div>
              </a>
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
      restaurant: {},
      menus: [],
    }
  },
  async mounted() {
    await this.$axios
      .get('/api/restaurants/restaurants/' + this.$route.params.restaurant)
      .then((response) => {
        this.restaurant = response.data.data
      })
      .catch(() => {
        this.$router.push('/')
        this.$buefy.snackbar.open({
          message: 'Impossible de récupérer les données du restaurant',
          type: 'is-danger',
        })
      })

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
}
</script>
