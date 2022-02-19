<template>
  <section>
    <h2 class="title">Menus</h2>
    <div class="columns is-multiline">
      <div v-for="menu in menus" :key="`menu_` + menu.id" class="column is-6">
        <RestaurantsItemCard
          :item="menu"
          @addItemToCart="$emit('addItemToCart', menu)"
        />
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "RestaurantMenus",
  layout: "restaurant",
  data() {
    return {
      menus: [],
      cart: [],
    }
  },
  async mounted() {
    await this.$axios
      .get(
        "/api/restaurants/restaurants/" +
          this.$route.params.restaurant +
          "/menus"
      )
      .then((response) => {
        this.menus = response.data.data
      })
      .catch(() => {
        this.$router.push("/")
        this.$buefy.snackbar.open({
          message: "Impossible de récupérer les menus du restaurant",
          type: "is-danger",
        })
      })
  },
}
</script>
