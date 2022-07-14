<template>
  <section>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Mes commandes</p>
      </header>
      <div class="card-content">
        <div class="content">
          <b-table
            ref="table"
            :data="orders"
            paginated
            per-page="15"
            :pagination-simple="true"
            detail-transition="fade"
            :show-detail-icon="false"
            detailed
            detail-key="id"
            sort-icon="chevron-up"
          >
            <b-table-column
              v-slot="props"
              field="id"
              label="Numéro de commande"
              sortable
            >
              <a @click="fetchOrderDetails(props.row)"
                >Commande #{{ props.row.id }}</a
              >
            </b-table-column>

            <b-table-column
              v-slot="props"
              field="restaurant_id"
              label="Restaurant"
              sortable
            >
              {{
                restaurants.find(
                  (restaurant) => restaurant.id === props.row.restaurant_id
                )
                  ? restaurants.find(
                      (restaurant) => restaurant.id === props.row.restaurant_id
                    ).name
                  : 'Restaurant Inconnu'
              }}
            </b-table-column>

            <b-table-column v-slot="props" field="date" label="Date" sortable>
              {{ new Date(props.row.created_at).toLocaleString() }}
            </b-table-column>

            <b-table-column
              v-slot="props"
              field="date"
              label="Total (HT) €"
              sortable
            >
              {{ props.row.total_untaxed | toCurrency }}
            </b-table-column>

            <b-table-column v-slot="props" field="date" label="Statut" sortable>
              <p v-if="props.row.status === 1">
                <span class="tag is-primary is-light">En attente</span>
              </p>
              <p v-else-if="props.row.status === 2">
                <span class="tag is-info is-light">Payé</span>
              </p>
              <p v-else-if="props.row.status === 3">
                <span class="tag is-success is-light">Livré</span>
              </p>
            </b-table-column>

            <b-table-column
              v-slot='props'
              label='QR Code'
              >
              <qrcode-vue v-if='props.row.status === 2' :value="props.row.id" level="H"/>
            </b-table-column>

            <template #empty>
              <div class="has-text-centered">Pas de commandes</div>
            </template>

            <template #detail="props">
              <b-table
                :data="[
                  ...props.row.detailed_products,
                  ...props.row.detailed_menus,
                ]"
                paginated
                per-page="5"
                :pagination-simple="true"
                sort-icon="chevron-up"
              >
                <b-table-column v-slot="r" field="id" label="Image" sortable>
                  <img :src="r.row.image" class="image is-48x48" />
                </b-table-column>
                <b-table-column
                  v-slot="r"
                  field="id"
                  label="Nom du produit"
                  sortable
                >
                  {{ r.row.name }}
                </b-table-column>
                <b-table-column v-slot="r" field="id" label="Quantité" sortable>
                  {{ r.row.quantity }}
                </b-table-column>
                <b-table-column
                  v-slot="r"
                  field="id"
                  label="Prix unitaire"
                  sortable
                >
                  {{ r.row.amount | toCurrency }}
                </b-table-column>
                <b-table-column
                  v-slot="r"
                  field="id"
                  label="Prix total"
                  sortable
                >
                  {{ (r.row.quantity * r.row.amount) | toCurrency }}
                </b-table-column>
              </b-table>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import QrcodeVue from 'qrcode.vue';
export default {
  name: 'OrdersPage',
  components: {
    QrcodeVue,
  },
  layout: 'account',
  middleware: 'auth',
  data() {
    return {
      orders: [],
      restaurants: [],
    }
  },
  head() {
    return {
      title: 'Good Food - Mes commandes',
    }
  },
  mounted() {
    this.getRestaurants()
    this.getOrders()
  },
  methods: {
    getOrders() {
      this.$axios.get('/api/orders/orders').then((response) => {
        this.orders = response.data.data
        this.orders.forEach((order) => {
          order.detailed_products = []
          order.detailed_menus = []
        })
      })
    },
    getRestaurants() {
      this.$axios.get('/api/restaurants/restaurants').then((response) => {
        this.restaurants = response.data.data
      })
    },
    fetchOrderDetails(row) {
      if (
        row.detailed_products.length === 0 &&
        row.detailed_menus.length === 0
      ) {
        this.$axios
          .$get(
            '/api/restaurants/restaurants/' + row.restaurant_id + '/products'
          )
          .then((response) => {
            const filteredProducts = response.data.filter((product) => {
              return row.products.find(
                (orderProduct) => orderProduct.product_id === product.id
              )
            })
            filteredProducts.forEach((product) => {
              product.amount = row.products.find(
                (orderProduct) => orderProduct.product_id === product.id
              ).amount_untaxed
              product.quantity = row.products.find(
                (orderProduct) => orderProduct.product_id === product.id
              ).quantity
            })
            this.orders.find((order) => order.id === row.id).detailed_products =
              filteredProducts
          })
          .then(() => {
            this.$axios
              .$get(
                '/api/restaurants/restaurants/' + row.restaurant_id + '/menus'
              )
              .then((response) => {
                const filteredMenus = response.data.filter((menu) => {
                  return row.menus.find(
                    (orderMenu) => orderMenu.menu_id === menu.id
                  )
                })
                filteredMenus.forEach((menu) => {
                  menu.amount = row.menus.find(
                    (orderMenu) => orderMenu.menu_id === menu.id
                  ).amount_untaxed
                  menu.quantity = row.menus.find(
                    (orderMenu) => orderMenu.menu_id === menu.id
                  ).quantity
                })
                this.orders.find(
                  (order) => order.id === row.id
                ).detailed_menus = filteredMenus
              })
              .then(() => {
                this.$nextTick(() => {
                  this.$refs.table.toggleDetails(row)
                })
              })
          })
      } else {
        this.$nextTick(() => {
          this.$refs.table.toggleDetails(row)
        })
      }
    },
  },
}
</script>
