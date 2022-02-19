<template>
  <div
    class="box is-flex is-justify-content-space-between is-align-items-start"
  >
    <div class="is-flex">
      <img :src="item.image" alt="" class="image is-96x96" />
      <div class="ml-2">
        <h2 class="title is-4 mb-1">{{ item.name }}</h2>
        <p v-for="product in item.products" :key="item.id + `_` + product.id">
          {{ product.quantity }} x {{ product.name }}
        </p>
      </div>
    </div>
    <b-button
      type="is-primary"
      icon-right="cart-plus"
      @click.prevent.stop="$emit('addItemToCart', item)"
    >{{ item.amount | toCurrency }} €</b-button>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
