<template>
  <section class="hero is-medium">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-multiline is-centered">
          <div class="column is-12 has-text-centered">
            <img src="~/assets/logo_dark.svg" alt="Logo GoodFood" width="256" class="image is-inline-block"/>
          </div>
          <div class="column is-6-tablet is-5-desktop is-4-widescreen">
            <form class="box" @submit.prevent="submit">
              <div class="field">
                <b-field label="Adresse e-mail">
                  <b-input v-model="email" placeholder="user@goodfood.eu" type="email" icon="email" icon-right="close-circle" icon-right-clickable @icon-right-click="clearEmail"></b-input>
                </b-field>
              </div>
              <b-field label="Mot de passe">
                <b-input v-model="password" placeholder="*******" type="password" password-reveal></b-input>
              </b-field>
              <b-field>
                <b-checkbox v-model="checkbox" true-value="Se souvenir de moi" false-value="Ne pas se souvenir de moi">
                  {{ checkbox }}
                </b-checkbox>
              </b-field>
              <recaptcha/>
              <b-button type="is-primary" native-type="submit" expanded>Connexion</b-button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'LoginPage',
  middleware: 'guest',
  data() {
    return {
      email: '',
      password: '',
      checkbox: "Se souvenir de moi"
    }
  },
  methods: {
    clearEmail() {
      this.email = ''
    },
    async submit() {
      if (this.email === '' || this.password === '') {
        this.$buefy.snackbar.open({
          message: 'Veuillez remplir tous les champs',
          type: 'is-danger',
          position: 'is-bottom-right',
          queue: false
        })
        return
      }
      const token = await this.$recaptcha.getResponse()
      if (!token) {
        this.$buefy.snackbar.open({
          message: 'Veuillez valider le captcha',
          type: 'is-danger',
          position: 'is-bottom-right',
          queue: false
        })
        return
      }
      await this.$auth.loginWith('laravelJWT', {
        data: {
          email: this.email,
          password: this.password,
          remember_me: this.checkbox,
          recaptcha: token
        }
      })
      await this.$recaptcha.reset()
    }
  }
}
</script>
