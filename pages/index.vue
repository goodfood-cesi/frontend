<template>
  <section>
    <section class="hero is-primary is-medium">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <div class="navbar-item"><img src="https://bulma.io/images/bulma-type-white.png" alt="Logo"></div>
              <span class="navbar-burger is-white" data-target="navbarMenuHeroA">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="navbarMenuHeroA" class="navbar-menu">
              <div class="navbar-end">
                <a class="navbar-item is-active"> Accueil </a> <a class="navbar-item"> Commander ! </a>
                <span class="navbar-item">
              <a class="button is-primary is-inverted">
                <span class="icon">
                 <b-icon icon="account" size="is-small"></b-icon>
                </span>
                <span>Mon compte</span>
              </a>
            </span>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <p class="title">
            Une petite faim ?
          </p>
          <p class="subtitle">
            <button class="button is-large is-primary is-inverted mt-2">
              <span>
                Commander !
              </span>
              <span class="icon">
                <b-icon icon="arrow-right-thin-circle-outline" size="is-small"></b-icon>
              </span>
            </button>
          </p>
        </div>
      </div>
      <div class="hero-foot">
        <nav class="tabs is-boxed is-fullwidth">
          <div class="container">
            <ul>
              <li :class="{ 'is-active': activeTab === 'vision' }" @click="tabs('vision')"><a>Notre vision</a></li>
              <li :class="{ 'is-active': activeTab === 'test' }" @click="tabs('test')"><a>Restaurants</a></li>
              <li :class="{ 'is-active': activeTab === 'onsitetakeaway' }" @click="tabs('onsitetakeaway')">
                <a>Sur place ou à emporter !</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body py-3">
        <div class="container has-text-centered">
          <span class="tag is-primary">Nouveau !</span> Notre site web vous permet de commander en ligne dans nos restaurants, sur place ou à emporter !
        </div>
      </div>
    </section>
    <section>
      <div v-if="activeTab === 'vision'">
        <section class="blog-posts mt-2">
          <div class="container">
            <div class="columns">
              <div class="column is-12">
                <div class="columns featured-post is-multiline">
                  <div class="column is-12 post">
                    <article class="columns">
                      <div class="column is-7 post-img">
                        <img src="http://source.unsplash.com/random/750x300/?food" alt="">
                      </div>
                      <div class="column is-5 featured-content va">
                        <div>
                          <h1 class="title post-title">Une cuisine attentionnée</h1>
                          <p class="post-excerpt">Chez GoodFood, le fer de lance c'est la satisfaction client. C'est pour cela que nous élaborons nos plats en relation directe avec les consommateurs. Cela se traduit en sondages, avis...</p>
                          <br>
                          <button class="button is-medium is-primary mt-2">
                            <span>
                              Commander !
                            </span>
                            <span class="icon">
                              <b-icon icon="arrow-right-thin-circle-outline" size="is-small"></b-icon>
                            </span>
                          </button>
                        </div>

                      </div>
                    </article>
                  </div>
                </div>
                <hr>
                <div class="columns is-multiline">
                  <div class="column post is-4">
                    <article class="columns is-multiline">
                      <div class="column is-12 post-img">
                        <img src="http://source.unsplash.com/random/500x300/?food" alt="Featured Image">
                      </div>
                      <div class="column is-12 featured-content ">
                        <h3 class="heading post-category">CATEGORIE</h3>
                        <h1 class="title post-title">Argument #1</h1>
                        <p class="post-excerpt">Description.</p>
                        <br>
                      </div>
                    </article>
                  </div>
                  <div class="column post is-4">
                    <article class="columns is-multiline">
                      <div class="column is-12 post-img">
                        <img src="http://source.unsplash.com/random/500x300/?food" alt="Featured Image">
                      </div>
                      <div class="column is-12 featured-content ">
                        <h3 class="heading post-category">CATEGORIE</h3>
                        <h1 class="title post-title">Argument #2</h1>
                        <p class="post-excerpt">Description.</p>
                        <br>
                      </div>
                    </article>
                  </div>
                  <div class="column post is-4">
                    <article class="columns is-multiline">
                      <div class="column is-12 post-img">
                        <img src="http://source.unsplash.com/random/500x300/?food" alt="Featured Image">
                      </div>
                      <div class="column is-12 featured-content ">
                        <h3 class="heading post-category">CATEGORIE</h3>
                        <h1 class="title post-title">Argument #3</h1>
                        <p class="post-excerpt">Description.</p>
                        <br>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div v-if="activeTab === 'test'">Test</div>
      <div v-if="activeTab === 'onsitetakeaway'">OnsiteTakeaway</div>
    </section>
    <AppFooter />
  </section>

</template>
<script>
export default {
  name: 'IndexPage',
  layout: 'home',
  data() {
    return {
      activeTab: 'vision'
    }
  },
  methods: {
    tabs(tab) {
      this.activeTab = tab
    }
  }
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

.blog-posts {
  padding-top: 4rem;
  padding-bottom: 10rem;
}

.blog-posts article {
  padding: 1.5rem;
}

.blog-posts .post img {
  border-radius: 6px;
}

.blog-posts .post .post-excerpt {
  line-height: 1.5rem;
  letter-spacing: .03rem;
  font-size: 1.2rem;
  font-family: serif;
  color: #92a3ab;
}
</style>
