<template>
	<div class="hello">
		<h1>News Buff</h1>
		<h5>
			Censorship-resistant news
		</h5>
		<h2>Interact with the contract</h2>
		<label for="fname">Name: </label>
		<input type="text" v-model="name" name="name" /><br /><br />
		
		<label for="lname">Carbs: </label>
		<input type="text" v-model="carbs" name="carbs" /><br /><br />
		
		<label for="lname">Fat: </label>
		<input type="text" v-model="fat" name="fat" /><br /><br />
		
		<label for="lname">Protein: </label>
		<input type="text" v-model="protein" name="protein" /><br /><br />
		
		<button @click="interact">Submit</button>
		{{name}}
	</div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "HelloWorld",
  data() {
	  return {
			name: null,
			carbs: null,
			fat: null,
			protein: null
	  	}
  	},
	methods: {
		...mapActions(["INTERACT_CONTRACT"]),
		/** 
		  * This is an example of passing in the parameters as one object
		  */
		interact() {
			let params = {
				name: this.name, 
				carbs: this.carbs,
				fat: this.fat,
				protein: this.protein
			}
			this.INTERACT_CONTRACT(params);
		}
	},
	props: {
		userAddress: String,
	},
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
