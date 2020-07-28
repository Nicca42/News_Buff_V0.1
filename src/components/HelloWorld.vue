<template>
  <div class="hello">
    <h1>News Buff</h1>
		<h5>
			Censorship-resistant news
		</h5>
		<h2>Interact with the contract</h2>
		<label for="fname">Title: </label>
		<input type="text" v-model="title" name="title" /><br /><br />
		
		<label for="lname">Description: </label>
		<input type="text" v-model="description" name="description" /><br /><br />
		
		<label for="lname">Author: </label>
		<input type="text" v-model="author" name="author" /><br /><br />
		
		<label for="lname">Content: </label>
		<input type="text" v-model="content" name="content" /><br /><br />
		
		<button @click="interact">Submit</button><br /><br />
		<button @click="load">Load</button><br /><br />
    {{ loadedContent }}
    <input type="text" v-model="searchAuth" name="searchAuth" /><br /><br />
    <button @click="search">Search Author</button><br /><br />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      title: null,
      description: null,
      author: null,
      content: null,
      searchAuth: null
    }
  },
  methods: {
    ...mapActions(["CREATE_CONTENT", "LOAD_CONTENT", "LOAD_AUTHORS_CONTENT"]),
    interact() {
      console.log("Creating content");
			let params = {
				title: this.title, 
				description: this.description,
				author: this.author,
				content: this.content
			}
			this.CREATE_CONTENT(params);
		},
    load() {
      this.LOAD_CONTENT();
    },
    search() {
      this.LOAD_AUTHORS_CONTENT(this.searchAuth);
    }
  },
  computed: {
    ...mapState(["loadedContent"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
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
