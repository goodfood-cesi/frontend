<template>
  <section>
    <AppNavbar />
    <div class="container is-fluid mt-2 mb-2">
      <div class="columns">
        <div class="column is-2">
          <AccountMenu style="position: sticky; top: 10px; z-index: 1" />
        </div>
        <div class="column">
          <NuxtChild />
        </div>
      </div>
    </div>
    <AppFooter />
  </section>
</template>
<script>
export default {
  name: 'AccountLayout',
  layout: 'default',
}
</script>
