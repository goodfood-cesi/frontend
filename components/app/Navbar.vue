<template>
  <b-navbar class="is-light">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png" alt="Lightweight UI components for Vue.js based on Bulma">
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item href="#">
        Accueil
      </b-navbar-item>
      <b-navbar-item href="#">
        Commander
      </b-navbar-item>
      <b-navbar-dropdown label="Plus d'infos">
        <b-navbar-item href="#">
          A propos
        </b-navbar-item>
        <b-navbar-item href="#">
          Contact
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary"><b>Inscription</b></a>
          <a class="button is-light">Connexion</a>
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
