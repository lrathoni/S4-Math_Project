<template>
	<popper
		trigger="clickToToggle"
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
			<div class="type">
				Type : {{ buildingType }}
				<img :src="'/icons/' + iconProtectedURL">
				<br>
				<span v-if='square.building.indoor === false'>(Doesn't work when raining)</span>
				<span v-else>(Work under any circumstances)</span>
			</div>
		</div>
		<div slot="reference" @click.stop
			  @mouseover="hover = true"
			  @mouseleave="hover = false"
			  class="square-box-container">
			<div v-show="square.brocken === false" class="visitor-bubble">{{ square.visitors }}</div>
			<div class="square-content-container" :style="{ ...backgroundImage, ...color }">
				<div class="gradient" v-show="( this.square.building.capacity === this.square.visitors )"></div>
				<transition name="flicker">
					<div class="elec" v-if="square.brocken"></div>
				</transition>
			</div>
				<transition name="zoom">
				<popper trigger="hover">
					<div class="popper destroy-price">
						<img src="/icons/crane.svg"><span>-{{ square.building.price * 0.33 }}$</span>	
					</div>
					<div slot="reference" class="scissors" :style="{ backgroundColor: ($store.getters['player/HAS_ENOUGH_MONEY'](square.building.price * 0.33)) ? '' : 'gray' }" v-show="square.brocken && hover" @click.prevent.stop="$store.dispatch('board/removeBuilding', square.id)"></div>
				</popper>
				</transition>
				<div class="gears" v-show=" this.square.building.capacity === this.square.visitors "></div>
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
	data() {
		return {
			hover: false
		}
	},
	props: [
		'square'
	],
	computed: {
		buildingType() {
			if (this.square.building.indoor)
				return "Indoor"
			else
				return "Outdoor"
		},
		iconProtectedURL() {
			if (this.square.building.indoor)
				return 'indoor.png'
			else
				return 'outdoor.png'
		},
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
	font-size: 14px;
	width: 150px;

	.title {
		font-size: 1.1rem;
		font-weight: bold;
	}

	.type {

		img {
			height: 15px;
		}

		span {
			font-size: 0.7rem;
			font-style: italic;
		}
	}
}

.square-box-container {
	position: relative;
	height: 100%;
	cursor: pointer;
	transition-property: transform;
	transition-duration: .2s; 
	transition-timing-function: ease-out; 


	.popper.destroy-price  {
		padding: 5px;
		line-height: 25px;

		img {
			vertical-align: middle;
			height: 25px;
			margin-right: 10px;
		}
		span {
			font-weight: bold;
			color: darkred;
		}
	}

	.gears {
		content: '';
		width: 30px;
		height: 35px;
		background-image: url('/images/gear.gif');
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		z-index: 1;
		position: absolute;
		bottom: 2px;
		left: 2px;
	}

	&:hover {
		transform: translateY(-10px);
	}

	.visitor-bubble {
		position: absolute;
		right: 10px;
		top: 0;
		border-radius: 50%;
		background: white;
		width: 20px;
		height: 20px;
		line-height: 20px;
		box-shadow: 1.9px 3px 12px black;
		border: 2px solid black;
		z-index: 1;
		font-size: 10px;
		font-weight: bold;
	}

	.scissors {
		position: absolute;
		width: 40px;
		height: 40px;
		background-image: url('/icons/scissors.svg');
		background-color: #d94141;
		top: 10px;
		left: 10px;
		background-size: 60%;
		background-position: center;
		background-repeat: no-repeat;
		border-radius: 50%;
		transform: scale(100%, 100%) rotateZ(-20deg);
		box-shadow: 1px 1px 10px black;
		border: 3px dashed white;

		transition-property: transform;
		transition-duration: .2s; 
		transition-timing-function: ease-out; 

		&:hover {
			transform: rotateZ(-40deg);
		}
	}

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

		.gradient {
			content: '';
    		width: 100%;
    		height: 100%;
    		background: linear-gradient(30deg, rgba(255, 0, 0, 1) , rgba(255, 255, 0, 1), rgba(0, 255, 0, 1), rgba(0, 255, 255, 1), rgba(0, 0, 255, 1), rgba(255, 0, 255, 1), rgba(255, 0, 0, 1));
        	background-size: auto;
    		animation: gradientBG 5s ease infinite;
    		background-size: 400% 400%;
    		z-index: -1;
    		position: absolute;
    		opacity: 0.2;
		}

		.elec {
			content: '';
			width: 100%;
			height: 100%;
			background-image: url("/images/elec.gif");
			background-size: contain;
			mix-blend-mode: exclusion;
			opacity: 0.3;
		}
		.flicker-enter-active {
			animation: flicker-in-1 .5s;
		}
		.flicker-leave-active {
			animation: flicker-in-1 .5s reverse;
		}
	}
}

@keyframes gradientBG {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

/* ----------------------------------------------
 * Generated by Animista on 2020-4-22 11:33:43
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * @animation flicker-in-1
 * ----------------------------------------
 */
@-webkit-keyframes flicker-in-1 {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0;
  }
  10.1% {
    opacity: 1;
  }
  10.2% {
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  20.1% {
    opacity: 1;
  }
  20.6% {
    opacity: 0;
  }
  30% {
    opacity: 0;
  }
  30.1% {
    opacity: 1;
  }
  30.5% {
    opacity: 1;
  }
  30.6% {
    opacity: 0;
  }
  45% {
    opacity: 0;
  }
  45.1% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  55% {
    opacity: 1;
  }
  55.1% {
    opacity: 0;
  }
  57% {
    opacity: 0;
  }
  57.1% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  60.1% {
    opacity: 0;
  }
  65% {
    opacity: 0;
  }
  65.1% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75.1% {
    opacity: 0;
  }
  77% {
    opacity: 0;
  }
  77.1% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  85.1% {
    opacity: 0;
  }
  86% {
    opacity: 0;
  }
  86.1% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
@keyframes flicker-in-1 {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0;
  }
  10.1% {
    opacity: 1;
  }
  10.2% {
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  20.1% {
    opacity: 1;
  }
  20.6% {
    opacity: 0;
  }
  30% {
    opacity: 0;
  }
  30.1% {
    opacity: 1;
  }
  30.5% {
    opacity: 1;
  }
  30.6% {
    opacity: 0;
  }
  45% {
    opacity: 0;
  }
  45.1% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  55% {
    opacity: 1;
  }
  55.1% {
    opacity: 0;
  }
  57% {
    opacity: 0;
  }
  57.1% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  60.1% {
    opacity: 0;
  }
  65% {
    opacity: 0;
  }
  65.1% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75.1% {
    opacity: 0;
  }
  77% {
    opacity: 0;
  }
  77.1% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  85.1% {
    opacity: 0;
  }
  86% {
    opacity: 0;
  }
  86.1% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

.zoom-enter-active, .zoom-leave-active {
	transition: transform 5.5s
}

.zoom-enter, .zoom-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: scale(0, 0) !important;
}
</style>
