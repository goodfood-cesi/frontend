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
                <li><NuxtLink to='/account' class='is-active'>Mon profil</NuxtLink></li>
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
                <li><a>Supprimer mon compte</a></li>
              </ul>
            </aside>
          </div>
        </div>
        <div class='column'>
          <div class='box'>
            <div class='columns is-centered'>
              <figure class='image is-128x128'>
                <img src="~/assets/user.png" alt="user" class="is-rounded" />
              </figure>
            </div>
            <form @submit.prevent="submit">
              <div class='columns is-multiline'>
                <div class='column is-6'>
                  <b-field label="Prénom">
                    <b-input
                      v-model="firstname"
                      type="text"
                      placeholder="Jean-Patrick"
                      icon="account"
                    ></b-input>
                  </b-field>
                </div>
                <div class='column is-6'>
                  <b-field label="Nom">
                    <b-input
                      v-model="lastname"
                      type="text"
                      placeholder="Kerckhove"
                      icon="account"
                    ></b-input>
                  </b-field>
                </div>
                <div class='column'>
                  <b-field label="Adresse e-mail">
                    <b-input
                      v-model="email"
                      placeholder="user@goodfood.eu"
                      type="email"
                      icon="email"
                      disabled
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
  name: 'AccountPage',
  middleware: 'auth',
  data() {
    return {
      firstname: this.$auth.user.firstname,
      lastname: this.$auth.user.lastname,
      email: this.$auth.user.email,
    }
  },
  methods: {
    submit() {
      this.$axios.$post('/api/auth/user', {
        firstname: this.firstname,
        lastname: this.lastname,
      }).then(() => {
        this.$auth.fetchUser()
        this.$buefy.snackbar.open({
          message: 'Vos modifications ont été enregistrées',
          type: 'is-success',
        })
      }).catch(() => {
        this.$buefy.snackbar.open({
          message: 'Une erreur est survenue',
          type: 'is-danger',
        })
      })

    },
    cancel() {
      this.firstname = this.$auth.user.firstname
      this.lastname = this.$auth.user.lastname
      this.email = this.$auth.user.email
      this.$buefy.snackbar.open({
        message: 'Vos modifications ont été annulées',
      })
    }
  }
}
</script>
