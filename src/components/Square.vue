<template>
	<div @click.stop class="square-box-container" :style="computeTemplatePosition">
		{{ num }}
		<div class="square-content-container" :style="backgroundImage">
		</div>
	</div>
</template>

<script>
export default {
	name: 'Square',
	props: [
		'num',
		'square'
	],
	computed: {
		computeTemplatePosition() {
			return {
				gridColumnStart: this.square.x,
				gridColumnEnd: this.square.x + this.square.building.width,
				gridRowStart: this.square.y,
				gridRowEnd: this.square.y + this.square.building.height,
			}
		},
		backgroundImage() {
			const image = require('../assets/buildings/images/' + this.square.building.image);
			return {
				backgroundImage: `url(${image})`
			}
			//require('../assets/buildings/images/' + this.building.image);
		}
	}
}
</script>

<style lang="less">
.square-box-container {
	position: relative;

	.square-content-container {
		color: black;
		font-weight: bold;
		font-size: 20px;
		border-radius: 15px;
		background-color: #FF000022;
		width: 100%;
		height: 120%;
		position: absolute;
		bottom: 0;
		background-size: cover;

		&:hover {
			background-color: #FF000099;
		}
	}
}
</style>
