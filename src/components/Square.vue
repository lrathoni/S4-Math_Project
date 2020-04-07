<template>
	<div @click.stop class="square-box-container" :style="computeTemplatePosition">
		{{ num }}
		<div class="square-content-container">
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
				gridColumnEnd: this.square.x + this.square.width,
				gridRowStart: this.square.y,
				gridRowEnd: this.square.y + this.square.height,
			}
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

		&:hover {
			background-color: #FF000099;
		}
	}
}
</style>
