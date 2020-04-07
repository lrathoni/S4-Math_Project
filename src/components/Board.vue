<template>
	<div @click="logClick" ref="container" class="board-container" >
		<table class="board-grid-container">
			<tr v-for="(row, id) in $store.state.board.height" :key="id">
				<td v-for="(columns, id) in $store.state.board.width" :key="id"></td>
			</tr>
		</table> 
		<div class="board-elements-container" :style="computeGridTemplate">
			<Square v-for="(square, id) in $store.state.squares" :square="square" :num="id" :key="id" />
		</div>
	</div>
</template>

<script>
import Square from './Square'

export default {
	name: 'Board',
	components: {
		Square
	},
	computed: {
		squares() {
			return 30;
		},
		computeGridTemplate() {
			return {
				gridTemplateColumns: `repeat(${this.$store.state.board.width}, 1fr)`,
				gridTemplateRows: `repeat(${this.$store.state.board.height}, 1fr)`
			}
		}
	},
	methods: {
		logClick(event) {

			const { width, height } = this.$refs.container.getBoundingClientRect();
			const { layerX, layerY } = event;
			const squareWidth = width / this.$store.state.board.width;
			const squareHeight = height / this.$store.state.board.height;

			const x = Math.trunc(layerX/squareWidth) + 1;
			const y = Math.trunc(layerY/squareHeight) + 1;

			if (this.$store.getters.IS_CONSTRUCTIBLE(x, y))
				this.$store.dispatch('addSquareSel', { x, y });
		}
	}
}
</script>

<style lang="less">
.board-container {
	width: 70%;
	height: 60%;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	top: 20%;

	> * {
		width: 100%;
		height: 100%;
		position: absolute;
	}

	.board-elements-container {
		display: grid;
	}

	.board-grid-container td {
		border: 1px solid black;
	}
}
</style>

