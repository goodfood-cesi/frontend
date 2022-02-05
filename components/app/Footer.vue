<template>
  <footer class="footer py-5">
    <div class="content has-text-centered">
      <img
        src="~/assets/logo_dark.svg"
        alt="Logo GoodFood"
        width="256"
        class="image is-inline-block"
      />
      <p>&copy; LORNET</p>
      <p>
        <RouterLink to="/about">A propos</RouterLink>
        |
        <RouterLink to="/contact">Contactez-nous</RouterLink>
      </p>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'AppFooter',
}
</script>
