<template>
  <section>
    <div class="box">
      <h3 class="is-size-3">Modifier mon mot de passe</h3>
      <form @submit.prevent="submit">
        <div class="columns is-multiline">
          <div class="column is-6">
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
          <div class="column is-6">
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
            <b-button type="is-primary" native-type="submit"
              >Sauvegarder
            </b-button>
          </p>
          <p class="control">
            <b-button type="is-light" @click.prevent="cancel"
              >Annuler
            </b-button>
          </p>
        </div>
      </form>
    </div>
  </section>
</template>
<script>
export default {
  name: "PasswordPage",
  layout: "account",
  middleware: "auth",
  data() {
    return {
      password: "",
      password_confirmation: "",
    }
  },
  head() {
    return {
      title: "Good Food - Modifier mon mot de passe",
    }
  },
  methods: {
    submit() {
      this.$axios
        .$post("/api/auth/password", {
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
        .then(() => {
          this.$buefy.snackbar.open({
            message:
              "Votre mot de passe a été modifié avec succès. Vous avez été déconnecté.",
            type: "is-success",
          })
          this.$auth.logout()
        })
        .catch(() => {
          this.$buefy.snackbar.open({
            message:
              "Une erreur est survenue lors de la modification de votre mot de passe.",
            type: "is-danger",
          })
        })
    },
    cancel() {
      this.password = ""
      this.password_confirmation = ""
      this.$buefy.snackbar.open({
        message: "Vos modifications ont été annulées",
      })
    },
  },
}
</script>
