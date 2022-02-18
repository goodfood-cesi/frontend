<template>
  <div v-if='restaurant != null' class='box'>
    <aside class='menu'>
      <p class='menu-label'>
        {{ restaurant.name }}
      </p>
      <ul class='menu-list'>
        <li>
          <NuxtLink :to='`/restaurants/` + restaurant.id' :class='{"is-active": activeMenu === "restaurant"}'>Le restaurant
          </NuxtLink>
        </li>
      </ul>
      <ul class='menu-list'>
        <li>
          <NuxtLink
            :to='`/restaurants/` + restaurant.id + `/menus`'
            :class='{ "is-active": activeMenu === "menus" }'>
            Menus
          </NuxtLink>
        </li>
      </ul>
      <ul class='menu-list'>
        <li>
          <NuxtLink
            :to='`/restaurants/` + restaurant.id + `/products`'
            :class='{ "is-active": activeMenu === "products" }'>
            Produits à l'unité
          </NuxtLink>
        </li>
      </ul>
      <p class='menu-label'>
        <strong>Votre panier</strong>
      </p>
    </aside>
  </div>
  <div v-else class='box'>
    <p>
      Chargement...
    </p>
  </div>
</template>

<script>
export default {
  name: 'RestaurantsMenu',
  props: {
    id: {
      type: String,
      required: true
    },
    activeMenu: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      restaurant: null
    }
  },
  async mounted() {
    await this.$axios
      .get('/api/restaurants/restaurants/' + this.id)
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
  }

}
</script>
