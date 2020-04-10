<template>
  <div id="app">
	  <transition name="fade">
	  	  <div v-show="$store.state.board.weather !== 'sun'" class="weather-container">
	  	  	  <img v-show="$store.state.board.weather === 'rain'" class="rain" src="/images/rain.gif" alt="">
	  	  	  <img class="clouds" src="/images/cloud_texture.jpg" alt="">
	  	  </div>
	  </transition>
	  <div class="next-wave">
		  {{ $store.state.visitors.nextWaveVisitors }}
	  </div>
	  <div class="exit">
		  {{ $store.state.visitors.goneVisitors }}
	  </div>
	  Money : {{ $store.state.player.money }} <input type="text" v-model="playerMoney">
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
			return this.$store.state.buildings.buildings;
		},
		playerMoney: {
			set(money) {
				this.$store.commit('player/setMoney', money);
			},
			get() {
				return this.$store.state.player.money;
			}
		}
	},
	methods: {
		//incrementSize(type, amount) {
			//this.$store.commit('updateSize', { type, amount });
		//},
	},
	beforeCreate() {
		/* INFO initializing the available buildings */
		this.$store.dispatch('init', {
			buildings: [ 'wheel', 'cinema', 'food', 'drink', 'roller-coaster' ],
			visitors: 12
		});
	},
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

	.weather-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;

		> img {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;

			&.rain {
				mix-blend-mode: color-burn;
				opacity: .2;
			}

			&.clouds {
				mix-blend-mode: multiply;
			}
		}

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

.fade-enter-active, .fade-leave-active {
  transition: opacity 2.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
