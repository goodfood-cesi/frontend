<template>
  <div class="card is-fullheight">
    <div class="card-header">
      <p
        class="card-header-title is-size-5 is-justify-content-space-between"
      >
        {{ restaurant.name }}
        <a
          href="#"
          @click.prevent="$emit('map', [restaurant.latitude, restaurant.longitude])"
        ><b-icon icon="map-search" />
        </a>
      </p>
    </div>
    <div class="card-image">
      <figure class="image is-3by1">
        <img :src="restaurant.image" alt="Placeholder image" />
      </figure>
    </div>
    <div class="card-content">
      <div class="content is-size-7">
        {{ restaurant.address }}
      </div>
    </div>
    <footer class="card-footer">
      <div class="card-footer-item">
        <b-icon icon="phone" />
        {{ restaurant.phone }}
      </div>
      <div class="card-footer-item">
        <b-button
          tag="nuxt-link"
          :to="`/restaurants/` + restaurant.id"
          icon-right="arrow-right-thin-circle-outline"
          type="is-primary is-light"
          expanded
        >
          Commander
        </b-button>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'RestaurantCard',
  props: {
    restaurant: {
      type: Object,
      required: true
    }
  }
}
</script>
