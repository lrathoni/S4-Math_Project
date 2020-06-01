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
            <h3 id="displayRes">Click and maintain to adjust your luck</h3>
            <button id="button" 
						  v-long-press="300"
    					  @long-press-start="onLongPressStart"
    					  @long-press-stop="onLongPressStop"
						  type="button" value="Go">
                <img class="arrowWheel" src="./assets/roulette/images/arrowWheel.png" alt="">
            </button>
        </div>
		 </div>
		  <modal name="hello-world">
  		  	  <h2 v-if="result.type == 'bonus'">Bonus</h2>
  		  	  <h2 v-else-if="result.type == 'malus'">Malus</h2>
  		  	  <h2 v-else>Nothing</h2>
			  <p>{{ result.message }}</p>
		  </modal>
    </div>
</template>

<script>
    import {BinomialVariable, findEventBinom, Beta,Beta2, Poisson, isBroken , wheelTime} from './math/VariablesAleatoires.js'
    for (let i=0; i<150; i++) {
        console.log(Beta(5,30,4))
    }
    
	import LongPress from 'vue-directive-long-press'

    export default {
        name : "Test",
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
		  	  onLongPressStart() {
              this.timer = new Date().getTime()
              const cursor = document.getElementById("cursor")
              cursor.style.animation = "top 1s ease-in infinite"

			  },
			  onLongPressStop() {
              var diff = new Date().getTime() - this.timer
              var cursor = document.getElementById("cursor")
              var rotation = document.getElementById("rotationManagement")
				  cursor.style.webkitAnimationPlayState = "paused";
              var deg=36*diff;

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

				  console.log(this.result.message)
				  setTimeout(() => { this.$modal.show('hello-world') }, 2500)
			  },
        }
    }
</script>

<style lang="less">
#roulette {
	position: relative;

	.wheel {
    	display:block;
    	margin-top: 50px;
    	width: 500px;
    	height: 500px;
    	margin-bottom: 50px;
		position: relative;

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
}

</style>
