<template>
    <div id="app">
        <h2 id="phrase"> Tentez votre chance ! Et si vous n'en avez pas, tentez quand même !</h2>
        <center>
            <h2 id="maxluck"> Maximisez vos chances d'obtenir un bonus, stoppez la jauge près d'une zone verte ! Cela ne fait qu'augmenter vos chance, nous ne garantissons aucun résultat. Cordialement, La direction</h2>
            <img id="rotationManagement" class="wheel" src="./assets/roulette/images/luckyWheel.png" alt="">
            <img id="indicator" class="wheel" src="./assets/roulette/images/indatedSuccess.png" alt="">
            <div id="bar">
                <div id="percentage">
            </div>
        </div>
        </center>
        <div>
            <h3 id="displayRes">{{resultat}}</h3>
            <button id="button" @click="changeResult" type="button" value="Go">
                <img class="arrowWheel" src="./assets/roulette/images/arrowWheel.png" alt="">
            </button>
            <p></p>
        </div>
        <!-- <h3>{{betaResult}}</h3>
        <input @click="betaChange" type="button" value="Test Beta">
        <h3>{{visitorResult}}</h3>
        <input @click="visitorChange" type="button" value="Test Poisson">
        <h3>{{breakResult}}</h3>
        <input @click="workOrNotwork" type="button" value="Test Bernouilli"> -->
    </div>
</template>

<script>
    import {BinomialVariable, findEventBinom, Beta, Poisson, isBroken , wheelTime} from './math/VariablesAleatoires.js'
    for (let i=0; i<150; i++) {
        console.log(Beta(5,30,4))
    }
    
    export default {
        name : "Test",
        data() { return {"resultat" : "Clic pour démarrer, sur la flèche hein !",
                            "betaResult" : "beta resultat",
                            "visitorResult" : "Combien de personnes ?!!",
                            "breakResult" : "game over",
                            "timer" : 0
                        }},
        methods : {
            changeResult() {
                var button = document.getElementById("button")
                var rotation = document.getElementById("rotationManagement")
                var greenBar = document.getElementById("percentage")
                if(button.value != "Stop") {
                    if (button.value == "Press to Stop")
                    {
                        button.value = "Stop"
                        //console.log(button.value)
                        greenBar.style.animationPlayState = "paused"
                        var diff = new Date().getTime() - this.timer
                        var deg=36*diff;
                        rotation.style.animation = "rotateAnim 10s linear 0"
                        rotation.style.transform = "rotateZ(" + deg + "deg)"
                        BinomialVariable.p = greenBar.offsetWidth/480
                        console.log("p = "+ BinomialVariable.p)
                        this.resultat = BinomialVariable.eventTab[findEventBinom(BinomialVariable.n,BinomialVariable.p)]
                    }
                    
                    if (button.value == "Go")
                    {
                        this.timer = new Date().getTime()
                        greenBar.style.animation = " width 1s ease-in infinite"
                        rotation.style.animation = "rotateAnim 0.5s linear infinite"
                        button.value = "Press to Stop"                        
                    }
                }
            },

            buttonValue() {
                var button = document.getElementById("button")
                {<h4>
                    button.value
                </h4>}
                return button.value
            },

            speedBar() {

            }

            // betaChange() {
            //     // a=0, b=5, r=2 => Loi en parabole resultat entre [0,25] => plus de résultat entre [0,6] et [19,25]
            //     this.betaResult = Beta(0,5,2)
            // },

            // visitorChange() {
            //     this.visitorResult = Poisson("sun")
            // },

            // workOrNotwork() {
            //     this.breakResult = isBroken(0.9)
            // }
        }
    }
</script>

<style lang="less">
#app{
    background : url('./assets/paper.jpg');
}
#phrase {
    text-align: center;
}

.wheel {
    display:block;
    //position: relative;
    margin-top: 50px;
    width: 500px;
    height: 500px;
    margin-bottom: 50px;
}

#indicator {
    width : 480px;
    height: 50px;
}
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

@keyframes rotateAnim {
    from {transform: rotateZ(0);}
    to {transform: rotateZ(360deg);}
}

#bar {
    /* font-size: 10px */
    width: 30em;
    height: 2em;
    border-radius: 0.5em;
    position: relative;
    background: #f2f2f2;
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.1);
  }

#bar #percentage {
    width: 0%;
    position: absolute;
    font-size: 1em;
    background: #7be245;
    height: 2em;
    border-radius: 0.5em;
  }

  @keyframes width {
      from {width: 0%;}
      to {width: 100%;}
  }

</style>