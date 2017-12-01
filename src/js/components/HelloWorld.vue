<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <pre>{{ collection }}</pre> -->
    <nav>
      <ul>
        <li v-for="(model, index) in collection" :key="index">
          {{ model.title }}
        </li>
      </ul>
    </nav>
    <div>
      <!-- <pre>{{ players_collection.models }}</pre> -->
      <ul>
        <li v-for="(model, index) in players_collection.models" :key="index">
          {{ model.title.rendered }}
          <img :src="model.acf.lineup_photo.url" alt="">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Collection } from 'vue-collections'

let playersCollection

export default {
  name: 'HelloWorld',
  collection() {
    return new Collection({
      basePath: 'routes/nav',
      id_attribute: 'object_id'
    })
  },
  computed: {
    players_collection() {
      return playersCollection
    }
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created() {
    this.$collection.fetch()
    playersCollection = new Collection({
      basePath: 'wp/v2/peoples'
      // id_attribute: 'object_id'
    })
    this.players_collection.fetch()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
