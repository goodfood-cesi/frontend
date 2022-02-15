<template>
  <section>
    <div class='container is-fluid mt-2 mb-2'>
      <div class='columns'>
        <div class='column is-2'>
          <div class='box'>
            <aside class="menu">
              <p class="menu-label">
                Compte
              </p>
              <ul class="menu-list">
                <li><NuxtLink to='/account'>Mon profil</NuxtLink></li>
              </ul>
              <p class="menu-label">
                Commandes
              </p>
              <ul class="menu-list">
                <li><NuxtLink to='/orders'>Mes commandes</NuxtLink></li>
                <li><a>Paiements</a></li>
              </ul>
              <p class="menu-label">
                Sécurité
              </p>
              <ul class="menu-list">
                <li><NuxtLink to='/account/password'>Modifier mon mot de passe</NuxtLink></li>
                <li><NuxtLink to='/account/delete' class='is-active'>Supprimer mon compte</NuxtLink></li>
              </ul>
            </aside>
          </div>
        </div>
        <div class='column'>
          <div class='box'>
            <h3 class='is-size-3'>Supprimer mon compte</h3>
            <p class='mb-2'>
              Vous êtes sur le point de supprimer votre compte.
              Cette action est irréversible.
            </p>
            <form @submit.prevent="submit">
              <div class='columns'>
                <div class='column is-6'>
                  <b-field label="Mot de passe">
                    <b-input
                      v-model="password"
                      minlength="6"
                      placeholder="*******"
                      type="password"
                      password-reveal
                      required
                    ></b-input>
                  </b-field>
                </div>
              </div>
              <div class="field is-grouped is-grouped-right">
                <p class="control">
                  <b-button type="is-danger" native-type="submit">Supprimer mon compte</b-button>
                </p>
                <p class="control">
                  <b-button type="is-light" @click.prevent='$router.push("/account")'>Annuler</b-button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'AccountDelete',
  data () {
    return {
      password: ''
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('account/delete', {
        password: this.password
      })
    }
  }
}
</script>
