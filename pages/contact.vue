<template>
  <section class="hero is-medium">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="columns is-8 is-variable">
          <div class="column is-two-thirds has-text-left">
            <h1 class="title is-1">Contactez-nous</h1>
            <p class="is-size-4">
              Chez GoodFood, la satisfaction clientèle est notre fer de lance.
              Nous mettons tout en oeuvre pour vous satisfaire, c'est pour cela
              que nous mettons à disposition ce formulaire.
            </p>

            <div class="field is-grouped mt-6">
              <p class="control">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  class="button is-light is-large"
                >
                  <b-icon icon="facebook"></b-icon>
                </a>
              </p>
              <p class="control">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  class="button is-light is-large"
                >
                  <b-icon icon="instagram"></b-icon>
                </a>
              </p>
            </div>
          </div>
          <div class="column is-one-third has-text-left">
            <div class="field">
              <label class="label">Nom</label>
              <div class="control">
                <input
                  v-model="name"
                  class="input is-medium"
                  type="text"
                  :disabled="disabled === 1"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  v-model="email"
                  class="input is-medium"
                  type="text"
                  :disabled="disabled === 1"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Message</label>
              <div class="control">
                <textarea
                  v-model="message"
                  class="textarea is-large"
                ></textarea>
              </div>
            </div>
            <div class="control">
              <button
                type="submit"
                class="button is-link is-fullwidth has-text-weight-medium is-medium"
              >
                Envoyer le message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'ContactPage',
  data() {
    return {
      name: '',
      email: '',
      message: '',
      disabled: 0,
    }
  },
  head() {
    return {
      title: 'Good Food - Contact',
    }
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.name = this.$auth.user.firstname + ' ' + this.$auth.user.lastname
      this.email = this.$auth.user.email
      this.disabled = 1
    }
  },
}
</script>
