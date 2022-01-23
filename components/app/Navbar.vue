<template>
  <b-navbar class="is-primary">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="~/assets/logo_light_simple.svg" alt="Logo GoodFood" class="image is-128x128"/>
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="router-link" :to="{ path: '/restaurants' }">
        Commander
      </b-navbar-item>
    </template>
    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <NuxtLink to="/register" class="button is-primary"><b>Inscription</b></NuxtLink>
          <NuxtLink to="/login" class="button is-light">Connexion</NuxtLink>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
export default {
  name: 'AppNavbar',
}
</script>
