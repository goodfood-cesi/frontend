<template>
  <section>
    <div class="container is-fluid mt-2 mb-2">
      <div class="columns">
        <div class="column is-3">
          <RestaurantsMenu :id="$route.params.restaurant" active-menu="menus" :cart='cart' />
        </div>
        <div class="column">
          <div class="box">
            <h2 class="title">Menus</h2>
            <div class="columns is-multiline">
              <div v-for="menu in menus" :key="`menu_` + menu.id" class="column is-6">
                <RestaurantsItemCard :item="menu" @addItemToCart='addItemToCart' @removeItemFromCart='removeItemFromCart' />
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
}
</script>
