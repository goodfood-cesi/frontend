<template>
  <section>
    <div class='container is-fluid mt-2 mb-2'>
      <div class='columns'>
        <div class='column is-2'>
          <div class='box'>
            <aside class="menu">
              <p class="menu-label">
                Compte
              </p>
              <ul class="menu-list">
                <li><NuxtLink to='/account'>Mon profil</NuxtLink></li>
              </ul>
              <p class="menu-label">
                Commandes
              </p>
              <ul class="menu-list">
                <li><NuxtLink to='/orders' class='is-active'>Mes commandes</NuxtLink></li>
                <li><a>Paiements</a></li>
              </ul>
              <p class="menu-label">
                Sécurité
              </p>
              <ul class="menu-list">
                <li><NuxtLink to='/account/password'>Modifier mon mot de passe</NuxtLink></li>
                <li><a>Supprimer mon compte</a></li>
              </ul>
            </aside>
          </div>
        </div>
        <div class='column'>
          <div class='box'>
            Mes commandes
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'OrdersPage',
  middleware: 'auth',
}
</script>
