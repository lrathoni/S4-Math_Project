<template>
    <div id="roulette">
		 <div class="wheel">
			 <img src="/images/red-arrow.png" class="arrow" alt="">
			 <img id="rotationManagement" class="pie-wheel" src="/images/simpleLuckyWheel.png" alt="">
		 </div>
		 <div class="controls">
		 <div id="gradient">
			 <div id="cursor"></div>
		 </div>
        <div class="handle">
            <button id="button" 
						  @click="stop"
						  type="button" value="Go">
                <img ref="image" class="arrowWheel" src="/images/handle.png" alt="">
            </button>
        </div>
		 </div>
		  <modal name="hello-world" @closed="$emit('close')">
			  <h2 v-if="result.type == 'bonus'">Bonus</h2>
			  <h2 v-else-if="result.type == 'malus'">Malus</h2>
			  <h2 v-else>Nothing</h2>
			  <p>{{ result.message }}</p>
			  <img v-if="result.type == 'none'" class="prank" src="/images/prank.jpeg" alt="">
			  <img v-else-if="result.type == 'bonus'" class="celebrate" src="/images/celebrate.png" alt="">
			  <img v-else class="bad" src="/images/bad.png" alt="">
		  </modal>
    </div>
</template>

<script>
import LongPress from 'vue-directive-long-press'

    export default {
        name : "Roulette",
		  directives: { 'long-press': LongPress },
        data() { return {"resultat" : "Clic pour démarrer, sur la flèche hein !",
                            "betaResult" : "beta resultat",
                            "visitorResult" : "Combien de personnes ?!!",
                            "breakResult" : "game over",
                            "timer" : 0,
			  result: {
				  message: "",
				  callback: null,
				  type: null
			  }
                        }},
        methods : {
			  stop() {
				  this.$refs.image.src = "/images/handledown.png"
              var cursor = document.getElementById("cursor")
              var rotation = document.getElementById("rotationManagement")
				  cursor.style.webkitAnimationPlayState = "paused";

              const p = cursor.offsetTop/240
				  this.result = this.$store.getters['roulette/RESULT'](p)
				  rotation.animate([
					  // keyframes
					  { transform: 'rotateZ(0)' }, 
					  { transform: `rotateZ(${360 * 2 - (360/10) * this.result.position}deg)` }
				  ], { 
					  // timing options
					  duration: 2500,
					  iterations: 1,
					  fill: 'forwards',
					  easing: 'ease-out'
				  });

				  setTimeout(() => {
					  this.$modal.show('hello-world')
					  if (this.result.callback !== null)
						  this.$store.dispatch('applyCallback', this.result.callback)
						  //this.$store.dispatch('applyCallback', this.$store.state.roulette.entries[3].callback)
				  }, 2500)
			  },
        },
		 mounted() {
          document.getElementById("cursor").style.webkitAnimationPlayState = "running"
		 }
    }
</script>

<style lang="less">
#roulette {
	position: relative;
	z-index: 2000;

	.wheel {
		display: block;
		width: 300px;
		height: 300px;
		position: relative;
		margin: 131px auto 75px;

		.pie-wheel {
			width: 100%;
		}

		.arrow {
			width: 90px;
			position: absolute;
			top: -85px;
			left: 40%;
			rotate: 209deg;
			z-index: 99;
		}
	}

	.controls {
		display: grid;
		grid-template-columns: repeat(2, 1fr);

		#gradient {
			place-self: center;
			width: 40px;
			height: 240px;
			display: block;
			background: linear-gradient(red, orange, green);
			position: relative;
			border-radius: 7px;
			overflow: hidden;

			#cursor {
				animation: top 1s ease-in infinite;
				position: absolute;
				height: 6px;
				width: 100%;
				background-color: white;
				top: 0;
			}
		}
	}
	.handle {
		align-self: center;
		justify-self: left;

		#displayRes {
			text-align: center;
		}
		#button {
			display:block;
			margin-left:auto;
			margin-right:auto;
			background: none;
			border: none;
		}

	}


	@keyframes top {
      0% {top: 0%;}
      50% {top: 100%;}
      100% {top: 0%;}
	}

	.prank {
		position: absolute;
		left: 15px;
	}
	.celebrate {
		width: 40%;
		position: absolute;
		bottom: 10px;
		left: 10px;
	}
	.bad {
		width: 20%;
	}
}

</style>
