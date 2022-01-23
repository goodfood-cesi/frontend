<template>
  <section class="hero is-medium">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-6-tablet is-5-desktop is-4-widescreen">
            <form action="" class="box">
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
              <b-button type="is-primary" expanded>Connexion</b-button>
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
  data () {
    return {
      email: '',
      password: '',
      checkbox: "Se souvenir de moi"
    }
  },
  methods: {
    clearEmail () {
      this.email = ''
    }
  }
}
</script>
