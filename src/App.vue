<template>
  <div id="app">
	  Width : <button @click="incrementSize('width', 1)">+</button><button @click="incrementSize('width', -1)">-</button>
	  Height : <button @click="incrementSize('height', 1)">+</button><button @click="incrementSize('height', -1)">-</button>
	  <Board />
	  <div class="building-cards">
			<BuildingCard v-for="(building, id) in buildings" :key="id" :building="building" />
	  </div>
  </div>
</template>

<script>
import Board from './components/Board.vue'
import BuildingCard from './components/BuildingCard.vue'

export default {
  name: 'App',
  components: {
    Board,
	  BuildingCard
  },
  	computed: {
		buildings() {
			//console.log(Object.keys(this.$store.getters['buildings/ALL_BUILDINGS']));
			return this.$store.getters['buildings/ALL_BUILDINGS'];
		}
	},
  	methods: {
		incrementSize(type, amount) {
			this.$store.commit('updateSize', { type, amount });
		},
	},
	beforeCreate() {
		/* INFO initializing the available buildings */
		this.$store.dispatch('buildings/init', { buildings: [ 'wheel', 'cinema' ] });
	}
}
</script>

<style lang="less">
#app {
  	font-family: Avenir, Helvetica, Arial, sans-serif;
  	-webkit-font-smoothing: antialiased;
  	-moz-osx-font-smoothing: grayscale;
  	text-align: center;
  	color: #2c3e50;

	.building-cards {
		position: absolute;
		width: 100vw;
		bottom: 0;
		height: 230px;
		display: flex;
	}
}

body {
	margin: 0;
	background-color: white;
  	width: 100vw;
  	height: 100vh;
  	overflow: hidden;
  	position: fixed;
  	top: 0;
  	left: 0;

  	&:after {
	  	content: "";
	  	display: block;
	  	width: 100%;
	  	height: 100%;
	  	position: absolute;
	  	top: 0;
	  	left: 0;
  	  	background-image: url(./assets/paper.jpg);
		z-index: -1;
		opacity: 0.6;

  	}
}
</style>
