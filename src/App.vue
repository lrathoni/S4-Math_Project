<template>
  <div id="app">
	  <transition name="fade">
		  <div v-show="$store.state.board.weather !== 'sun'" class="weather-container">
			  <img v-show="$store.state.board.weather === 'rain'" class="rain" src="/images/rain.gif" alt="">
			  <img class="clouds" src="/images/cloud_texture.jpg" alt="">
		  </div>
	  </transition>
	  <div>
		  <h2>Happiness</h2>
		  <Happiness />
		  <Money />
		  <Tickets />
		  <!--{{ $store.state.player.happiness }}-->
		  <GoneVisitors />
		  <!-- <input type="text" v-model="playerMoney"> -->
		  <!--<fieldset v-for="(weatherOption, id) in Object.keys($store.state.visitors.visitorPerWave)" :key="id">-->
			  <!--<input v-model="weather" type="radio" name="weather" :value="weatherOption"><label>{{ weatherOption }}</label>-->
		  <!--</fieldset>-->
		  <Board />
		  <div class="building-cards">
			  <BuildingCard v-for="(building, id) in $store.state.buildings.buildings" :key="id" :building="building" />
		  </div>
		  <transition name="slide">
			  <Roulette class="roulette-container" v-if="roulette" @close="closeRoulette()"/>
		  </transition>
		  
	  </div>
  </div>
</template>

<script>
import Board from './components/Board.vue'
import Money from './components/Money.vue'
import Roulette from './components/Roulette.vue'
import BuildingCard from './components/BuildingCard.vue'
import GoneVisitors from './components/GoneVisitors'
import Tickets from './components/Tickets'
import Happiness from './components/Happiness'

export default {
  name: 'App',
	data() {
		return {
			roulette: false
		}
	},
  components: {
	  Roulette,
	  Board,
	  GoneVisitors,
	  BuildingCard,
	  Tickets,
	  Happiness,
	  Money
  },
	computed: {
		playerMoney: {
			set(money) {
				this.$store.commit('player/setMoney', money);
			},
			get() {
				return this.$store.state.player.money;
			}
		},
		weather: {
			set(value) {
				this.$store.dispatch('board/changeWeather', value);
			},
			get() {
				return this.$store.state.board.weather;
			}
		}
	},
	methods: {
		closeRoulette() {
			this.roulette = false
			setTimeout(() => this.roulette = true, 40000)
		}
	},
	beforeCreate() {
		/* INFO initializing the available buildings */
		const availableBuildings = [ 'wheel', 'cinema', 'food', 'drink', 'roller-coaster' ];
		this.$store.dispatch('init', availableBuildings);
	},
	mounted() {
		this.roulette = true
	}
}
</script>

<style lang="less">
.popper {
	z-index: 99;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;

	.roulette-container {
		width: 500px;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.86);
		box-shadow: 0 0 18px #0009;
	}

	h2 {
		margin-top: 50px;
		margin-bottom: 30px;
	}

	.happiness-container {
		width: 50%;
		text-align: center;
		margin: auto;
		position: relative;
	}

	.building-cards {
		position: absolute;
		width: 100vw;
		bottom: 0;
		height: 350px;
		display: flex;
		transform: translateY(50px);
	}

	.weather-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		opacity: 1;
		z-index: -1;

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
				opacity: .5;
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
		z-index: -2;
		opacity: 0.6;

	}
}

.fade-enter-active {
	animation: fade 2s;
}

.fade-leave-active {
	animation: fade 2s reverse;
}

@keyframes fade {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

.slide-enter-active, .slide-leave-active {
	transition: opacity .5s;
}

.slide-enter, .slide-leave-to {
  opacity: 0;
}
</style>
