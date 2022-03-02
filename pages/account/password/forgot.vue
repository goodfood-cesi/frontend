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
              <p class="subtitle has-text-centered">Mot de passe oublié</p>
              <b-field label="Adresse e-mail">
                <b-input
                  v-model="email"
                  placeholder="user@goodfood.eu"
                  type="email"
                  icon="email"
                  icon-right="close-circle"
                  icon-right-clickable
                  @icon-right-click="clearEmail"
                ></b-input>
              </b-field>
              <recaptcha />
              <b-button type="is-primary" native-type="submit" expanded
                >Connexion
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
  name: "ForgotPage",
  middleware: "guest",
  data() {
    return {
      email: "",
    }
  },
  head() {
    return {
      title: "Good Food - Mot de pass oublié",
    }
  },
  methods: {
    clearEmail() {
      this.email = ""
    },
    async submit() {
      if (this.email === "") {
        this.$buefy.snackbar.open({
          message: "Veuillez remplir tous les champs",
          type: "is-danger",
          position: "is-bottom-right",
          queue: false,
        })
        return
      }
      const token = await this.$recaptcha.getResponse()
      if (!token) {
        this.$buefy.snackbar.open({
          message: "Veuillez valider le captcha",
          type: "is-danger",
          position: "is-bottom-right",
          queue: false,
        })
        return
      }
      // @todo call forgot password route
      await this.$recaptcha.reset()
    },
  },
}
</script>
