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
              <p class="subtitle has-text-centered">Inscription</p>
              <div class="columns">
                <div class="column">
                  <div class="field">
                    <b-field label="Prénom">
                      <b-input
                        v-model="form.firstname"
                        minlength="2"
                        placeholder="John"
                        type="text"
                        icon="account"
                        required
                      ></b-input>
                    </b-field>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <b-field label="Nom">
                      <b-input
                        v-model="form.lastname"
                        minlength="2"
                        placeholder="Doe"
                        type="text"
                        icon="account"
                        required
                      ></b-input>
                    </b-field>
                  </div>
                </div>
              </div>
              <div class="field">
                <b-field label="Adresse e-mail">
                  <b-input
                    v-model="form.email"
                    placeholder="user@goodfood.eu"
                    type="email"
                    icon="email"
                    required
                  ></b-input>
                </b-field>
              </div>
              <b-field label="Mot de passe">
                <b-input
                  v-model="form.password"
                  minlength="6"
                  placeholder="*******"
                  type="password"
                  password-reveal
                  required
                ></b-input>
              </b-field>
              <b-field label="Confirmation du mot de passe">
                <b-input
                  v-model="form.password_confirmation"
                  minlength="6"
                  placeholder="*******"
                  type="password"
                  password-reveal
                  required
                ></b-input>
              </b-field>
              <recaptcha />
              <b-button type="is-primary" native-type="submit" expanded required
                >Inscription
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
  name: "RegisterPage",
  middleware: "guest",
  data() {
    return {
      form: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
    }
  },
  head() {
    return {
      title: "Good Food - inscription",
    }
  },
  methods: {
    async submit() {
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
      if (
        this.form.firstname === "" ||
        this.form.lastname === "" ||
        this.form.email === "" ||
        this.form.password === "" ||
        this.form.password_confirmation === ""
      ) {
        this.$buefy.snackbar.open({
          message: "Veuillez remplir tous les champs",
          type: "is-danger",
        })
        return
      }
      if (this.form.password !== this.form.password_confirmation) {
        this.$buefy.snackbar.open({
          message: "Les mots de passe ne correspondent pas",
          type: "is-danger",
        })
        return
      }
      if (this.form.password.length < 6) {
        this.$buefy.snackbar.open({
          message: "Le mot de passe doit contenir au moins 6 caractères",
          type: "is-danger",
        })
        return
      }
      if (this.form.firstname.length < 2) {
        this.$buefy.snackbar.open({
          message: "Le prénom doit contenir au moins 2 caractères",
          type: "is-danger",
        })
        return
      }
      if (this.form.lastname.length < 2) {
        this.$buefy.snackbar.open({
          message: "Le nom doit contenir au moins 2 caractères",
          type: "is-danger",
        })
        return
      }

      await this.$axios
        .post("/api/auth/register", {
          firstname: this.form.firstname,
          lastname: this.form.lastname,
          email: this.form.email,
          password: this.form.password,
          password_confirmation: this.form.password_confirmation,
          recaptcha: token,
        })
        .then(() => {
          this.$buefy.snackbar.open({
            message: "Votre compte a bien été créé",
            type: "is-success",
          })
          this.$router.push("/account/login")
        })
        .catch((error) => {
          this.$buefy.snackbar.open({
            message: error,
            type: "is-danger",
          })
        })
      await this.$recaptcha.reset()
    },
  },
}
</script>
