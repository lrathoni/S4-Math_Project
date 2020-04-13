<template>
	<popper
		trigger="clickToOpen"
		:options="{
				    placement: 'bottom',
					 modifiers: { offset: { offset: '0,10px' } }
					 }"
		:style="computeTemplatePosition">
		<div class="popper info-building">
			<span class="title">{{ square.building.name }}</span>
			<div v-if="square.brocken === false">
				Visitors {{ square.visitors }}
			</div>
			<div v-else class="trash">
				Brocken
			</div>
		</div>
		<div slot="reference" @click.stop class="square-box-container">
			<div class="square-content-container" :style="{ ...backgroundImage, backgroundColor }"></div>
			<div v-if="square.brocken" @click.stop="$store.commit('board/removeBuilding', square.id)" class="trash"></div>
		</div>
	</popper>
</template>

<script>
import Popper from 'vue-popperjs';

export default {
	name: 'Square',
	components: {
		popper: Popper
	},
	props: [
		'num',
		'square'
	],
	computed: {
		backgroundColor() {
			if ( this.square.brocken )
				return 'gray';
			else if ( this.square.building.capacity === this.square.visitors )
				return '#FF000022';
			else
				return '#0000FF22';
		},
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
@import '~vue-popperjs/dist/vue-popper.css';


.popper.info-building {
	padding: 10px 20px;
	border-radius: 20px;
	font-size: 16px;
	width: 150px;

	.title {
		font-size: 1.3em;
	}
}

.square-box-container {
	position: relative;
	height: 100%;

	.trash {
		position: absolute;
		width: 40px;
		height: 40px;
		background-color: red;
		top: 0;
		left: 0;
	}

	.square-content-container {
		color: black;
		font-weight: bold;
		font-size: 20px;
		border-radius: 15px;
		background-color: #FF000022;
		width: 100%;
		height: 110%;
		position: absolute;
		bottom: 0;
		background-size: cover;

		&:hover {
			background-color: #FF000099;
		}
	}
}
</style>
