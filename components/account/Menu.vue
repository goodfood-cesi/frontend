<template>
  <div class="box" style="position: sticky; top: 10px; z-index: 1">
    <aside class="menu">
      <p class="menu-label">Compte</p>
      <ul class="menu-list">
        <li>
          <NuxtLink
            to="/account"
            :class="{
              'is-active': currentPageName === 'account',
            }"
            >Mon profil
          </NuxtLink>
        </li>
      </ul>
      <p class="menu-label">Commandes</p>
      <ul class="menu-list">
        <li>
          <NuxtLink
            to="/account/orders"
            :class="{
              'is-active': currentPageName === 'account-orders',
            }"
            >Mes commandes
          </NuxtLink>
        </li>
        <li><a>Paiements</a></li>
      </ul>
      <p class="menu-label">Sécurité</p>
      <ul class="menu-list">
        <li>
          <NuxtLink
            to="/account/password/edit"
            :class="{
              'is-active': currentPageName === 'account-password-edit',
            }"
            >Modifier mon mot de passe
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/account/delete"
            :class="{
              'is-active': currentPageName === 'account-delete',
            }"
            >Supprimer mon compte
          </NuxtLink>
        </li>
      </ul>
    </aside>
  </div>
</template>
<script>
export default {
  name: 'AccountMenu',
  layout: 'account',
  computed: {
    currentPageName() {
      return this.$route.name
    },
  },
}
</script>
