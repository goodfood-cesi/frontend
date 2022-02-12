<template>
  <section>
    <div v-if="restaurant != null" class="container">
      <div class="row">
        <div class="col-md-12">
          <p>{{ restaurant.id }} - {{ restaurant.name }}</p>
          <p>{{ restaurant.address }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'RestaurantPage',
  data() {
    return {
      restaurant: null,
    }
  },
  async mounted() {
    await this.$axios
      .get('/api/restaurants/restaurants/' + this.$route.params.id)
      .then((response) => {
        this.restaurant = response.data.data
      })
      .catch(() => {
        this.$buefy.snackbar.open({
          message: 'Impossible de récupérer la liste des restaurants',
          type: 'is-danger',
        })
      })
  },
}
</script>
