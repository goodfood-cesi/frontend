<template>
  <div id="map-wrap" :style="`height: ` + height + `vh`">
    <client-only>
      <l-map ref="map" :zoom="zoom" :center="center">
        <l-tile-layer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-marker
          v-for="r in restaurants"
          :key="r.id"
          :lat-lng="[r.latitude, r.longitude]"
        >
          <l-popup>
            <div>
              <img :src="r.image" alt="Image du restaurant" /> {{ r.name }}
              <br />
              {{ r.address }} <br />
              {{ r.phone }}
              <b-button
                icon-right="arrow-right-thin-circle-outline"
                tag="router-link"
                type="is-primary"
                :to="`/restaurants/` + r.id"
                expanded
              >
                Commandez dès maintenant !
              </b-button>
            </div>
          </l-popup>
        </l-marker>
      </l-map>
    </client-only>
  </div>
</template>
<script>
export default {
  name: "RestaurantsMap",
  props: {
    restaurants: {
      type: Array,
      default: () => [],
    },
    center: {
      type: Array,
      default: () => [48.866667, 2.333333],
    },
    zoom: {
      type: Number,
      default: 8,
    },
    height: {
      type: Number,
      default: 75,
    },
  },
}
</script>
