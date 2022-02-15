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
                <li><NuxtLink to='/account/password' class='is-active'>Modifier mon mot de passe</NuxtLink></li>
                <li><NuxtLink to='/account/delete'>Supprimer mon compte</NuxtLink></li>
              </ul>
            </aside>
          </div>
        </div>
        <div class='column'>
          <div class='box'>
            <h3 class='is-size-3'>Modifier mon mot de passe</h3>
            <form @submit.prevent="submit">
              <div class='columns is-multiline'>
                <div class='column is-6'>
                  <b-field label="Nouveau mot de passe">
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
                <div class='column is-6'>
                  <b-field label="Confirmation">
                    <b-input
                      v-model="password_confirmation"
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
                  <b-button type="is-primary" native-type="submit">Sauvegarder</b-button>
                </p>
                <p class="control">
                  <b-button type="is-light" @click.prevent='cancel'>Annuler</b-button>
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
  name: 'PasswordPage',
  middleware: 'auth',
  data() {
    return {
      password: '',
      password_confirmation: ''
    }
  },
  methods: {
    submit() {
      this.$axios.$post('/api/auth/password', {
        password: this.password,
        password_confirmation: this.password_confirmation
      }).then(() => {
        this.$buefy.snackbar.open({
          message: 'Votre mot de passe a été modifié avec succès. Vous avez été déconnecté.',
          type: 'is-success'
        })
        this.$auth.logout()
      }).catch(() => {
        this.$buefy.snackbar.open({
          message: 'Une erreur est survenue lors de la modification de votre mot de passe.',
          type: 'is-danger'
        })
      })
    },
    cancel() {
      this.password = ''
      this.password_confirmation = ''
      this.$buefy.snackbar.open({
        message: 'Vos modifications ont été annulées',
      })
    }
  }

}
</script>
