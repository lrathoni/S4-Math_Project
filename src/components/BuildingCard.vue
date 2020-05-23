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
		<popper trigger="hover" :options="{ placement: 'top' }" class="info-popper">
			<div class="popper">Build cost</div>
			<div slot="reference" class="info info-price">
				<img class="info-icon" src="/icons/money.png" alt="">
				<span class="info-content">{{ price }}</span>
			</div>
		</popper>
		<popper trigger="hover" :options="{ placement: 'top' }" class="info-popper">
			<div class="popper">Visitor capacity</div>
			<div slot="reference" class="info info-capacity">
				<img class="info-icon" src="/icons/people.png" alt="">
				<span class="info-content">{{ capacity }}</span>
			</div>
		</popper>
		<popper trigger="hover" :options="{ placement: 'top' }" class="info-popper">
			<div class="popper">Happiness revenue</div>
			<div slot="reference" class="info info-happiness">
				<img class="info-icon" src="/icons/happiness.png" alt="">
				<span class="info-content">{{ happiness }}</span>
			</div>
		</popper>
		<popper trigger="hover" :options="{ placement: 'top' }" class="info-popper">
			<div class="popper">Activity duration</div>
			<div slot="reference" class="info info-duration">
				<img class="info-icon" src="/icons/hour.svg" alt="">
				<span class="info-content">{{ duration }}</span>
			</div>
		</popper>
		<popper trigger="hover" :options="{ placement: 'top' }" class="info-popper">
			<div class="popper">Building durability</div>
			<div slot="reference" class="info info-durability">
				<img class="info-icon" src="/icons/safety.svg" alt="">
				<span class="info-content">
					<div class="durability-gauge">
						<div class="durability-state" :style="{ width: 100/(1-0.94) * (building.durability - 0.94)+'%' }"></div>
					</div>
				</span>
			</div>
		</popper>
		<popper trigger="hover" :options="{ placement: 'top' }" class="info-popper">
			<div class="popper">Ticket cost per visitor</div>
			<div slot="reference" class="info info-ticket-cost">
				<img class="info-icon" src="/images/tickets.png" alt="">
				<span class="info-content">{{ ticketCost }}</span>
			</div>
		</popper>
		<div class="empty"></div>
	</div>
</template>

<script>
import Popper from 'vue-popperjs';

export default {
	name: 'BuildingCard',
	components: {
		Popper
	},
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
	grid-template-rows: [header] auto [props-start] repeat(6, 1fr) [props-end] 2fr;
	grid-template-columns: [col1] 1fr [col2] 1.5fr;
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
		border-top-left-radius: 18px;
		border-top-right-radius: 18px;
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

	.info-popper {
		grid-column: col2;
		place-self: stretch;

		.info {
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

			&.info-durability span {
				width: 60%;

				.durability-gauge {
					width: 80%;
					height: 6px;
					border: 1px solid;
					overflow: hidden;
					padding: 2px;
					border-radius: 70px;

					.durability-state {
						height: 100%;
						background-color: #494bdb;
						border-radius: 20px;
					}
				}
			}
		}
	}

}
</style>
