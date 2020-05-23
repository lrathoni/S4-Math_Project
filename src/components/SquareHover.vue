<template>
		<div :style="computeTemplatePosition" class="square-box-container-hover">
			<div class="square-content-container" :style="{ ...backgroundImage, ...disabled }"></div>
		</div>
</template>

<script>
export default {
	name: 'SquareHover',
	props: [
		'building', 'coords'
	],
	computed: {
		color() {
			if ( this.square.brocken )
				return {
					opacity: 0.5,
				};
			else
				return {
					//backgroundColor: '#0000FF22'
				};
		},
		computeTemplatePosition() {
			return {
				gridColumnStart: this.coords.x,
				gridColumnEnd: this.coords.x + this.building.width,
				gridRowStart: this.coords.y,
				gridRowEnd: this.coords.y + this.building.height,
			}
		},
		disabled() {
			const disabled = {};
			if (this.$store.state.player.money < this.$store.state.player.selected.price) {
				disabled.filter = 'saturate(0.1)'
				disabled.opacity = 0.2
			}
			return disabled
		},
		backgroundImage() {
			const image = require('../assets/buildings/images/' + this.building.image);
			return {
				backgroundImage: `url(${image})`,
			}
		}
	}
}
</script>

<style lang="less">
.square-box-container-hover {
	position: relative;
	height: 100%;
	cursor: pointer;
	transition-property: transform;
	transition-duration: .2s; 
	transition-timing-function: ease-out; 
	pointer-events: none;
	opacity: 0.6;


	.square-content-container {
		color: black;
		font-weight: bold;
		font-size: 20px;
		border-radius: 15px;
		width: 100%;
		height: 110%;
		position: absolute;
		bottom: 0;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		overflow: hidden;
	}
}
</style>
