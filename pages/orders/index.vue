<template>
  <section>
    <div class="container is-fluid mt-2 mb-2">
      <div class="columns">
        <div class="column is-2">
          <div class="box" style="position: sticky; top: 10px; z-index: 1">
            <aside class="menu">
              <p class="menu-label">Compte</p>
              <ul class="menu-list">
                <li>
                  <NuxtLink to="/account">Mon profil</NuxtLink>
                </li>
              </ul>
              <p class="menu-label">Commandes</p>
              <ul class="menu-list">
                <li>
                  <NuxtLink to="/orders" class="is-active"
                    >Mes commandes
                  </NuxtLink>
                </li>
                <li><a>Paiements</a></li>
              </ul>
              <p class="menu-label">Sécurité</p>
              <ul class="menu-list">
                <li>
                  <NuxtLink to="/account/password"
                    >Modifier mon mot de passe
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/account/delete">Supprimer mon compte</NuxtLink>
                </li>
              </ul>
            </aside>
          </div>
        </div>
        <div class="column">
          <div class='card'>
            <header class="card-header">
              <p class="card-header-title">
                Mes commandes
              </p>
            </header>
            <div class='card-content'>
              <div class='content'>
                <b-table
                  :key='tableDataKey'
                  ref='table'
                  :data="orders"
                  paginated
                  per-page="15"
                  :current-page.sync="currentPage"
                  :pagination-simple="true"
                  detailed
                  detail-key="id"
                  sort-icon="chevron-up">

                  <b-table-column v-slot="props" field="id" label="Numéro de commande" sortable>
                    <a @click="fetchOrderDetails(props.row)">Commande #{{ props.row.id }}</a>
                  </b-table-column>

                  <b-table-column v-slot="props" field="restaurant_id" label="Restaurant" sortable>
                      {{ props.row.restaurant_id }}
                  </b-table-column>

                  <b-table-column v-slot="props" field="date" label="Date" sortable centered>
                    {{ new Date(props.row.created_at).toLocaleString() }}
                  </b-table-column>

                  <b-table-column v-slot="props" field="date" label="Total € (HT)" sortable centered>
                    {{ props.row.total_untaxed | toCurrency }}
                  </b-table-column>

                  <b-table-column v-slot="props" field="date" label="Status" sortable centered>
                    <p v-if='props.row.status === 1'>
                      En attente
                    </p>
                    <p v-else-if='props.row.status === 2'>
                      Payé
                    </p>
                    <p v-else-if='props.row.status === 3'>
                      Livré
                    </p>

                  </b-table-column>
                  <template #empty>
                    <div class="has-text-centered">Pas de commandes</div>
                  </template>

                  <template #detail="props">
                    <div v-if="props.row.detailed_products">
                      <div
                        v-for="(item, i) in props.row.detailed_products"
                        :key="`orders_`+ props.row.id + `product_` + item.id"
                      >
                        <div class="is-flex is-justify-content-space-between">
                          <div class="is-flex">
                            <img :src="item.image" alt="" class="image is-48x48" />
                            <h3 class="subtitle is-6 ml-1 is-align-self-center">
                              {{ item.name }}
                            </h3>
                          </div>
                        </div>
                        <hr v-if="i + 1 !== props.row.detailed_products.length" />
                      </div>
                    </div>
                  </template>
                </b-table>
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
  name: "OrdersPage",
  middleware: "auth",
  data() {
    return {
      orders: [],
      currentPage: 1,
      tableDataKey: 1,
    }
  },
  mounted() {
    this.getOrders()
  },
  methods: {
    getOrders() {
      this.$axios.get('/api/orders/orders').then(response => {
        this.orders = response.data.data
      })
    },
    fetchOrderDetails(row) {
      if(!row.detailed_products) {
        this.$axios.$get('/api/restaurants/restaurants/' + row.restaurant_id + '/products').then(response => {
          this.orders.find(order => order.id === row.id).detailed_products = response.data.filter(product => {
            return row.products.find(orderProduct => orderProduct.product_id === product.id)
          })
          this.$nextTick(() => {
            this.$refs.table.toggleDetails(row)
          })
        })
      } else {
        this.$nextTick(() => {
          this.$refs.table.toggleDetails(row)
        })
      }
    }
  }
}
</script>
