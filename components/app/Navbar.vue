<template>
  <b-navbar class="is-primary">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="~/assets/logo_light_simple.svg"
          alt="Logo GoodFood"
          class="image is-128x128"
        />
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="router-link" :to="{ path: '/restaurants' }">
        Commander
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/about' }">
        A propos
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/contact' }">
        Contact
      </b-navbar-item>
    </template>
    <template v-if="!isAuthenticated" #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <NuxtLink to="/register" class="button is-primary"
            ><b>Inscription</b></NuxtLink
          >
          <NuxtLink to="/login" class="button is-light">Connexion</NuxtLink>
        </div>
      </b-navbar-item>
    </template>
    <template v-else #end>
      <b-navbar-item tag="div">
        <b-dropdown aria-role="list">
          <template #trigger="{ active }">
            <b-button
              :label="loggedInUser.firstname + ' ' + loggedInUser.lastname"
              type="is-primary"
              :icon-right="active ? 'menu-up' : 'menu-down'"
            />
          </template>
          <b-dropdown-item has-link aria-role="listitem">
            <NuxtLink to="/account">Mon compte</NuxtLink>
          </b-dropdown-item>
          <b-dropdown-item has-link aria-role="listitem">
            <NuxtLink to="/orders">Mes commandes</NuxtLink>
          </b-dropdown-item>
          <hr class="dropdown-divider" />
          <b-dropdown-item aria-role="listitem" @click="logout">
            <b-icon icon="logout"></b-icon>
            Déconnexion
          </b-dropdown-item>
        </b-dropdown>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppNavbar',
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  methods: {
    async logout() {
      await this.$auth.logout().then(() => {
        this.$router.push('/')
      })
    },
  },
}
</script>
