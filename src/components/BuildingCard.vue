<template>
	<div @click="selectBuilding" class="building-card-container" :style="{ backgroundColor: backgroundColor }">
		<div class="header">
			<span>{{ buildingName }}</span>
		</div>
		<div class="image">
			<div class="outdoor">
				<img :src="'/icons/' + iconProtectedURL">
			</div>
			<img :src="buildingImage" alt="">
		</div>
			<div class="info info-price">
				<img class="info-icon" src="/icons/money.png" alt="">
				<span class="info-content">{{ price }}</span>
			</div>
			<div class="info info-capacity">
				<img class="info-icon" src="/icons/people.png" alt="">
				<span class="info-content">{{ capacity }}</span>
			</div>
			<div class="info info-happiness">
				<img class="info-icon" src="/icons/happiness.png" alt="">
				<span class="info-content">{{ happiness }}</span>
			</div>
			<div class="info info-build-time">
				<img class="info-icon" src="/icons/hammer.png" alt="">
				<span class="info-content">{{ constructionTime }}</span>
			</div>
	</div>
</template>

<script>
export default {
	name: 'BuildingCard',
	props: [
		'building'
	],
	data() {
		return {
			buildingProps: Object
		}
	},
	methods: {
		selectBuilding() {
			this.$store.commit('buildings/setSelected', this.building.id)
		}
	},
	computed: {
		backgroundColor() {
			if (this.building.id == this.$store.getters['buildings/SELECTED'].id)
				return "lightgreen";
			else if (this.$store.getters['player/MONEY'] >= this.building.price)
				return "white";
			else
				return "gray";
		},
		buildingName() {
			return this.building.name;
		},
		iconProtectedURL() {
			if (this.building.indoor) 
				return 'indoor.png'
			else
				return 'outdoor.png'
		},
		buildingImage() {
			//const imageURL = "../assets/buildings/images/" + this.building.image;
			return require('../assets/buildings/images/' + this.building.image);
		},
		price() {
			return this.building.price + "$"
		},
		capacity() {
			return this.building.capacity + " persons"
		},
		happiness() {
			return this.building.happiness + "/pers/s"
		},
		constructionTime() {
			return this.building['build-time'] + "s"
		}
	}
}
</script>

<style lang="less">
.building-card-container {
	display: grid;
	background-color: white;
	margin: 10px;
	border-radius: 20px;
	width: 250px;
	grid-template-rows: [header] auto [props-start] repeat(4, 1fr) [props-end];
	grid-template-columns: [col1] 1fr [col2] 1.5fr;
	overflow: hidden;

	.header {
		grid-row: header;
		grid-column: col1 / span 2;
		place-self: stretch;
		font-size: 20px;
		background-color: lightblue;
		padding: 10px 0;
		font-weight: bold;
	}

	.image {
		grid-row: props-start / props-end;
		grid-column: col1;
		position: relative;
		place-self: center;

		.outdoor {
			width: 20px;
			position: absolute;
			top: -10px;
			right: 10px;

			img {
				width: 100%;
			}
		}

		> img {
			width: 50%;
		}
	}

	.info {
		grid-column: col2;
		place-self: stretch;
		display: grid;
		grid-template-columns: [icon] 1fr [info] 4fr;

		.info-icon {
			width: 70%;
			place-self: center;
		}

		.info-content {
			justify-self: left;
			align-self: center;
			margin: 10px;
		}
	}
}
</style>
