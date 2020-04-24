<template>
	<div @click="selectBuilding" class="building-card-container" :style="{ background: backgroundColor, transform: (this.building.id == this.$store.state.player.selected.id) ? 'translateY(-25px)' : ''}">
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
			<div class="info info-duration">
				<img class="info-icon" src="/icons/hour.svg" alt="">
				<span class="info-content">{{ duration }}</span>
			</div>
			<div class="info info-ticket-cost">
				<img class="info-icon" src="/images/tickets.png" alt="">
				<span class="info-content">{{ ticketCost }}</span>
			</div>
			<div class="empty"></div>
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

			this.$store.commit('player/setSelected', this.building)
		}
	},
	computed: {
		backgroundColor() {
			if (this.$store.state.player.money >= this.building.price)
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
		ticketCost() {
			return this.building.ticket_cost + "$/person"
		},
		price() {
			return this.building.price + "$"
		},
		capacity() {
			return this.building.capacity + " persons"
		},
		happiness() {
			return this.building.happiness + "/person/sec."
		},
		duration() {
			return this.building['duration'] + "s"
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
	grid-template-rows: [header] auto [props-start] repeat(5, 1fr) [props-end] 1fr;
	grid-template-columns: [col1] 1fr [col2] 1.5fr;
	overflow: hidden;
	border: 3px solid white;
	box-shadow: 0 0 10px #00000094;
	transition-property: transform;
	transition-duration: .2s; 
	transition-timing-function: ease-out;
	cursor: pointer;

	.empty {
		display: block;
		place-self: stretch;
		height: 100%;
		content: '';
		grid-row: props-end / span 2;
		grid-column: col1 / span 2;
	}

	&:hover {
		transform: translateY(-30px) rotateZ(-3deg) scale(105%, 105%);
	}


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
