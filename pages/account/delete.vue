<template>
  <section>
    <div class="box">
      <h3 class="is-size-3">Supprimer mon compte</h3>
      <p class="mb-2">
        Vous êtes sur le point de supprimer votre compte. Cette action est
        irréversible.
      </p>
      <form @submit.prevent="submit">
        <div class="columns">
          <div class="column is-6">
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
            <b-button type="is-danger" native-type="submit"
              >Supprimer mon compte
            </b-button>
          </p>
          <p class="control">
            <b-button type="is-light" @click.prevent="$router.push('/account')"
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
  name: "AccountDelete",
  layout: "account",
  middleware: "auth",
  data() {
    return {
      password: "",
    }
  },
  methods: {
    submit() {
      this.$store.dispatch("account/delete", {
        password: this.password,
      })
    },
  },
}
</script>
