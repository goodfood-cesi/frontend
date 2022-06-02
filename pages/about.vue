<template>
  <section>
    <section class="infos">
      <div class="container">
        <div class="columns">
          <div class="column is-12 info">
            <article class="columns">
              <div class="column is-6 featured-content va">
                <div>
                  <h1 class="title">Sur place</h1>
                  <p class="info-excerpt">
                    Déjeunez sur place dans nos restaurants en réservant dès
                    maintenant en ligne.
                  </p>
                </div>
              </div>
              <div class="column is-6 info-img">
                <img
                  src="https://source.unsplash.com/random/750x300/?food"
                  alt=""
                />
              </div>
            </article>
          </div>
        </div>
        <hr />
        <div class="columns">
          <div class="column is-12 info">
            <article class="columns">
              <div class="column is-6 info-img">
                <img
                  src="https://source.unsplash.com/random/750x300/?food"
                  alt=""
                />
              </div>
              <div class="column is-6 featured-content va">
                <div>
                  <h1 class="title">A emporter</h1>
                  <p class="info-excerpt">
                    Commandez dès maintenant en ligne et retirez en Click &
                    Collect dans le restaurant de votre choix !
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
        <b-button
          size="is-large"
          icon-right="arrow-right-thin-circle-outline"
          tag="router-link"
          type="is-primary"
          to="/restaurants"
          expanded
        >
          Commandez dès maintenant !
        </b-button>
      </div>
    </section>
    <section class="infos">
      <div class="container">
        <div class="columns">
          <div class="column is-12">
            <div class="columns">
              <div class="column is-12 info">
                <article class="columns">
                  <div class="column is-7 info-img">
                    <img
                      src="https://source.unsplash.com/random/750x300/?food"
                      alt=""
                    />
                  </div>
                  <div class="column is-5 featured-content va">
                    <div>
                      <h1 class="title">Une cuisine attentionnée</h1>
                      <p class="info-excerpt">
                        Chez GoodFood, le fer de lance c'est la satisfaction
                        client. C'est pour cela que nous élaborons nos plats en
                        relation directe avec les consommateurs. Cela se traduit
                        en sondages, avis...
                      </p>
                      <br />
                      <b-button
                        class="mt-2"
                        size="is-medium"
                        icon-right="arrow-right-thin-circle-outline"
                        tag="router-link"
                        type="is-primary"
                        to="/restaurants"
                      >
                        Commander !
                      </b-button>
                    </div>
                  </div>
                </article>
              </div>
            </div>
            <hr />
            <div class="columns">
              <div class="column info is-4">
                <article class="columns is-multiline">
                  <div class="column is-12">
                    <img
                      src="https://source.unsplash.com/random/500x300/?food"
                      alt="Featured Image"
                    />
                  </div>
                  <div class="column is-12 featured-content">
                    <h3 class="heading">CATEGORIE</h3>
                    <h1 class="title">Argument #1</h1>
                    <p class="info-excerpt">Description.</p>
                    <br />
                  </div>
                </article>
              </div>
              <div class="column info is-4">
                <article class="columns is-multiline">
                  <div class="column is-12">
                    <img
                      src="https://source.unsplash.com/random/500x300/?food"
                      alt="Featured Image"
                    />
                  </div>
                  <div class="column is-12 featured-content">
                    <h3 class="heading">CATEGORIE</h3>
                    <h1 class="title">Argument #2</h1>
                    <p class="info-excerpt">Description.</p>
                    <br />
                  </div>
                </article>
              </div>
              <div class="column info is-4">
                <article class="columns is-multiline">
                  <div class="column is-12">
                    <img
                      src="https://source.unsplash.com/random/500x300/?food"
                      alt="Featured Image"
                    />
                  </div>
                  <div class="column is-12 featured-content">
                    <h3 class="heading">CATEGORIE</h3>
                    <h1 class="title">Argument #3</h1>
                    <p class="info-excerpt">Description.</p>
                    <br />
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
export default {
  name: "AboutPage",
  head() {
    return {
      title: "Good Food - A propos",
    }
  },
}
</script>
<style>
.va {
  display: flex;
  align-items: center;
}

.navbar .navbar-item {
  color: #e4e2ff;
}

.infos {
  padding-top: 2rem;
  padding-bottom: 5rem;
}

.infos article {
  padding: 1.5rem;
}

.infos .info img {
  border-radius: 6px;
}

.infos .info .info-excerpt {
  line-height: 1.5rem;
  letter-spacing: 0.03rem;
  font-size: 1.2rem;
  font-family: serif;
  color: #92a3ab;
}
</style>
