<template>
  <section>
    <div class="box">
      <h3 class="is-size-3">Mon profil</h3>
      <div class="columns is-centered">
        <figure class="image is-128x128">
          <img src="~/assets/user.png" alt="user" class="is-rounded" />
        </figure>
      </div>
      <form @submit.prevent="submit">
        <div class="columns is-multiline">
          <div class="column is-6">
            <b-field label="Prénom">
              <b-input
                v-model="firstname"
                minlength="2"
                type="text"
                placeholder="Jean-Patrick"
                icon="account"
                required
              ></b-input>
            </b-field>
          </div>
          <div class="column is-6">
            <b-field label="Nom">
              <b-input
                v-model="lastname"
                minlength="2"
                type="text"
                placeholder="Kerckhove"
                icon="account"
                required
              ></b-input>
            </b-field>
          </div>
          <div class="column">
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
  name: "AccountPage",
  layout: "account",
  middleware: "auth",
  data() {
    return {
      firstname: this.$auth.user.firstname,
      lastname: this.$auth.user.lastname,
      email: this.$auth.user.email,
    }
  },
  methods: {
    submit() {
      this.$axios
        .$post("/api/auth/user", {
          firstname: this.firstname,
          lastname: this.lastname,
        })
        .then(() => {
          this.$auth.fetchUser()
          this.$buefy.snackbar.open({
            message: "Vos modifications ont été enregistrées",
            type: "is-success",
          })
        })
        .catch(() => {
          this.$buefy.snackbar.open({
            message: "Une erreur est survenue",
            type: "is-danger",
          })
        })
    },
    cancel() {
      this.firstname = this.$auth.user.firstname
      this.lastname = this.$auth.user.lastname
      this.email = this.$auth.user.email
      this.$buefy.snackbar.open({
        message: "Vos modifications ont été annulées",
      })
    },
  },
}
</script>
