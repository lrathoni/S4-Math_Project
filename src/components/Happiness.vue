<template>
	<div class="happiness-container">
    	<span class="percentage" :style="{ left: percentage + '%' }">{{ Math.round(percentage) + '%' }}</span>
		<progress :max="$store.state.player.maxHappiness" :value="$store.state.player.happiness" class="html5">
		</progress>
		<span class="state">{{ $store.state.player.happiness }}/{{ $store.state.player.maxHappiness }}</span>
	</div>
</template>

<script>
export default {
	name: 'Happiness',
	computed: {
		percentage() {
			return 100 / this.$store.state.player.maxHappiness * this.$store.state.player.happiness;
		}
	}
}
</script>

<style lang="less">
.happiness-container {

	span.percentage {
		transform: translateX(-50%);
		position: absolute;
		top: -20px;
	}

	span.state {
		font-weight: bold;
	}

	progress[value] {
		appearance: none;
		border: none;
		width: 100%; height: 20px;
		background-color: whiteSmoke;
		border-radius: 3px;
		box-shadow: 0 2px 3px rgba(0,0,0,.5) inset;
		position: relative;
		margin: 0 0 1.5em; 
	}
	progress[value]::-webkit-progress-bar {
		background-color: whiteSmoke;
		border-radius: 3px;
		box-shadow: 0 2px 3px rgba(0,0,0,.5) inset;
	}

	progress[value]::-webkit-progress-value {
		position: relative;
		background-size: 35px 20px, 100% 100%, 100% 100%;
		border-radius:3px;
	}

	progress[value]::-webkit-progress-value:after {
		content: '';
		position: absolute;
		width:5px; height:5px;
		top:7px; right:7px;
		background-color: white;
		border-radius: 100%;
	}


	progress[value]::-moz-progress-bar {
		background-image:
		-moz-linear-gradient( 135deg,
		transparent,
		transparent 33%,
		rgba(0,0,0,.1) 33%,
		rgba(0,0,0,.1) 66%,
		transparent 66%),
		-moz-linear-gradient( top,
		rgba(255, 255, 255, .25),
		rgba(0,0,0,.2)),
		-moz-linear-gradient( left, #09c, #f44);
		background-size: 35px 20px, 100% 100%, 100% 100%;
		border-radius:3px;
	}

	.html5::-webkit-progress-value,
	.python::-webkit-progress-value  {
		background-image:
		-webkit-linear-gradient( 135deg,
		transparent,
		transparent 33%,
		rgba(0,0,0,.1) 33%,
		rgba(0,0,0,.1) 66%,
		transparent 66%),
		-webkit-linear-gradient( top,
		rgba(255, 255, 255, .25),
		rgba(0,0,0,.2)),
		-webkit-linear-gradient( left, #09c, #f44);
	}
}
</style>
