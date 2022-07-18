<template>
  <section class="hero is-medium">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-multiline is-centered">
          <div class="column is-12 has-text-centered">
            <img
              src="~/assets/logo_dark_simple.svg"
              alt="Logo GoodFood"
              width="256"
              class="image is-inline-block"
            />
          </div>
          <div class="column is-6-tablet is-5-desktop is-4-widescreen">
            <form class="box" @submit.prevent="submit">
              <p class="subtitle has-text-centered">
                Modifier mon mot de passe
              </p>
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
              <recaptcha />
              <b-button type="is-primary" native-type="submit" expanded
                >Modifier mon mot de passe
              </b-button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'EditPasswordPage',
  data() {
    return {
      password: '',
      password_confirmation: '',
    }
  },
  head() {
    return {
      title: 'Good Food - Modifier mon mot de passe',
    }
  },
  mounted() {
    this.$axios
      .$get('/api/auth/reset', {
        params: {
          reset_password: this.$route.params.token,
        },
      })
      .then(() => {
        this.$buefy.snackbar.open({
          message: 'Vous pouvez modifier votre mot de passe.',
          type: 'is-success',
        })
      })
      .catch(() => {
        this.$router.push('/account/password/forgot')
        this.$buefy.snackbar.open({
          message:
            "Ce lien de réinitialisation de mot de passe n'est pas valide.",
          type: 'is-danger',
        })
      })
  },
  methods: {
    submit() {
      this.$axios
        .$post('/api/auth/reset', {
          password: this.password,
          password_confirmation: this.password_confirmation,
          reset_password: this.$route.params.token,
        })
        .then(() => {
          this.$buefy.snackbar.open({
            message:
              'Votre mot de passe a été modifié avec succès. Vous pouvez maintenant vous connecter.',
            type: 'is-success',
          })
          this.$auth.logout()
          this.$router.push('/account/login')
        })
        .catch(() => {
          this.$buefy.snackbar.open({
            message:
              'Une erreur est survenue lors de la modification de votre mot de passe.',
            type: 'is-danger',
          })
        })
    },
  },
}
</script>
