<template>
  <section>
    <div
      class="is-flex is-justify-content-space-between is-align-content-center"
    >
      <div>
        <h1 class="title">{{ restaurant.name }}</h1>
      </div>
      <div class="buttons has-addons">
        <b-button
          tag="a"
          :href="`tel:` + restaurant.phone"
          icon-right="phone"
          type="is-primary is-light"
          >Appeler
        </b-button>
      </div>
    </div>
    <hr />
    <img :src="restaurant.image" alt="Image du restaurant" class="image mb-3" />
    <div class="columns">
      <div class="column is-6">
        <h2 class="title">Accès au restaurant</h2>
        <h2 class="subtitle">{{ restaurant.address }}</h2>
        <RestaurantsMap
          :height="50"
          :zoom="11"
          :center="center"
          :restaurants="restaurants"
        />
      </div>
      <div class="column is-6">
        <h2 class="title">Horaires</h2>
        <hr />
        <table
          v-if="restaurant.days"
          class="table is-bordered is-hoverable is-fullwidth"
        >
          <thead>
            <tr>
              <th>Jour</th>
              <th>Horaire d'ouverture</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lundi</td>
              <td>{{ restaurant.days.monday }}</td>
            </tr>
            <tr>
              <td>Mardi</td>
              <td>{{ restaurant.days.tuesday }}</td>
            </tr>
            <tr>
              <td>Mercredi</td>
              <td>{{ restaurant.days.wednesday }}</td>
            </tr>
            <tr>
              <td>Jeudi</td>
              <td>{{ restaurant.days.thursday }}</td>
            </tr>
            <tr>
              <td>Vendredi</td>
              <td>{{ restaurant.days.friday }}</td>
            </tr>
            <tr>
              <td>Samedi</td>
              <td>{{ restaurant.days.saturday }}</td>
            </tr>
            <tr>
              <td>Dimanche</td>
              <td>{{ restaurant.days.sunday }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "RestaurantPage",
  layout: "restaurant",
  data() {
    return {
      restaurant: {},
    }
  },
  head() {
    return {
      title: "Good Food - Restaurant",
    }
  },
  computed: {
    center() {
      if (this.restaurant.latitude && this.restaurant.longitude) {
        return [this.restaurant.latitude, this.restaurant.longitude]
      } else {
        return [48.866667, 2.333333]
      }
    },
    restaurants() {
      if (this.restaurant.latitude && this.restaurant.longitude) {
        return [this.restaurant]
      } else {
        return []
      }
    },
  },
  async mounted() {
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
}
</script>
