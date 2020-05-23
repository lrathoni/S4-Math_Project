<template>
	<div @click="clickBoard" @mousemove="hoverBuilding" @mouseleave="coords = null" ref="container" class="board-container" >
		<table ref="table" class="board-grid-container">
			<tr v-for="(id_row) in $store.state.board.height" :key="id_row">
				<td v-for="(id_col) in $store.state.board.width" :key="id_col" :class="classTd(id_col, id_row)"></td>
			</tr>
		</table> 
		<div class="board-elements-container" :style="computeGridTemplate">
			<Square v-for="square in $store.state.board.squares" :square="square" :key="square.id" />
			<SquareHover v-if="coords" :coords="coords" :building="$store.state.player.selected"/>
		</div>
	</div>
</template>

<script>
import Square from './Square'
import SquareHover from './SquareHover'

export default {
	name: 'Board',
	components: {
		Square,
		SquareHover
	},
	data() {
		return {
			coords: null
		}
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
		},
	},
	methods: {
		classTd(id_col, id_row) {
			if (id_row % 2 === 0)
				return (id_col % 2 === 0) ? "blue" : "gray";
			else
				return (id_col % 2 === 0) ? "gray" : "blue";
		},
		getPositionOnBoard(event) {
			/* NOTE computes the size of a square */
			const { width, height } = this.$refs.container.getBoundingClientRect();
			const { layerX, layerY } = event;
			const squareWidth = width / this.$store.state.board.width;
			const squareHeight = height / this.$store.state.board.height;

			/* NOTE computes the x and y position is board space */
			const x = Math.trunc(layerX / squareWidth) + 1;
			const y = Math.trunc(layerY / squareHeight) + 1;

			return { x, y };
		},
		hoverBuilding(event) {
			const { x, y } = this.getPositionOnBoard(event);
			const buildingWidth = this.$store.state.player.selected.width;
			const buildingHeight = this.$store.state.player.selected.height;
			if (this.$store.getters['board/IS_CONSTRUCTIBLE'](x, y, buildingWidth, buildingHeight))
				this.coords = { x, y };
			else
				this.coords = null;
		},
		clickBoard(event) {
			const { x, y } = this.getPositionOnBoard(event);

			const buildingWidth = this.$store.state.player.selected.width;
			const buildingHeight = this.$store.state.player.selected.height;

			/* NOTE check that it is possible to build */
			if (this.$store.state.player.money >= this.$store.state.player.selected.price) {
				if (this.$store.getters['board/IS_CONSTRUCTIBLE'](x, y, buildingWidth, buildingHeight))
					this.$store.dispatch('board/addSquareSel', { x, y });
			}
		}
	}
}
</script>

<style lang="less">
.board-container {
	width: max-content;
   height: max-content;
   position: relative;
   margin: 20px auto;

	table {
		margin: auto;
		border-collapse: collapse;
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
		border: 2px dashed #075cff61;
		width: 90px;
		height: 50px;

		&.blue {
			background-color: #5a80cb40;
		}
		&.gray {
			background-color: #60606017;
		}
	}
}
</style>

