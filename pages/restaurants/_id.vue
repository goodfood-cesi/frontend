<template>
  <section>
    <div class="container is-fluid mt-2 mb-2">
      <div ref='restaurant' class='box'>
        <p>{{ restaurant.id }} - {{ restaurant.name }}</p>
        <p>{{ restaurant.address }}</p>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'RestaurantPage',
  data() {
    return {
      restaurant: {
        id: '',
        name: '',
        address: ''
      }
    }
  },
  async mounted() {
    const loadingComponent = this.$buefy.loading.open({
      container: this.$refs.restaurant.$el
    })
    await this.$axios
      .get('/api/restaurants/restaurants/' + this.$route.params.id)
      .then((response) => {
        this.restaurant = response.data.data
        loadingComponent.close()
      })
      .catch(() => {
        loadingComponent.close()
        this.$router.push('/')
        this.$buefy.snackbar.open({
          message: 'Impossible de récupérer les donénes du restaurant',
          type: 'is-danger',
        })
      })
  },
}
</script>
