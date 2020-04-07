<template>
	<div @click="logClick" ref="container" class="board-container" >
		<table ref="table" class="board-grid-container">
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

			/* NOTE computes the size of a square */
			const { width, height } = this.$refs.container.getBoundingClientRect();
			const { layerX, layerY } = event;
			const squareWidth = width / this.$store.state.board.width;
			const squareHeight = height / this.$store.state.board.height;

			/* NOTE computes the x and y position is board space */
			const x = Math.trunc(layerX/squareWidth) + 1;
			const y = Math.trunc(layerY/squareHeight) + 1;

			/* NOTE check that it is possible to build */
			if (this.$store.getters.IS_CONSTRUCTIBLE(x, y))
				this.$store.dispatch('addSquareSel', { x, y });
		}
	}
}
</script>

<style lang="less">
.board-container {
	width: max-content;
   height: max-content;
   position: relative;
   margin: 70px auto;

	/*> * {*/
		/*width: 100%;*/
		/*height: 100%;*/
		/*position: absolute;*/
	/*}*/

	table {
		margin: auto;
	}

	.board-elements-container {
		display: grid;
		height: 100%;
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
	}

	.board-grid-container td {
		border: 1px solid black;
		width: 75px;
		height: 75px;
	}
}
</style>

