<template>
    <div id="app">
        <h2 id="phrase"> Tentez votre chance ! Et si vous n'en avez pas, tentez quand même !</h2>
        <div id="rotationManagement" class="">
            <img class="wheel movement stop" src="./assets/roulette/images/luckyWheel.png" alt="">
        </div>
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

    export default {
        name : "Test",
        data() { return {"resultat" : "Clic pour démarrer?",
                            "betaResult" : "beta resultat",
                            "visitorResult" : "Combien de personnes ?!!",
                            "breakResult" : "game over"
                        }},
        methods : {
            changeResult() {
                var button = document.getElementById("button")
                var rotation = document.getElementById("rotationManagement")
                var rand = 0
                if(button.value != "Stop") {
                    if (button.value == "Press to Stop")
                    {
                        var completeStop = new Date().getTime()
                        rotation.className = "endRotate"
                        while (((new Date().getTime() - completeStop)/1000) < 5)
                            (button.value == "Go")
                        button.value = "Stop"
                        this.resultat = BinomialVariable.eventTab[findEventBinom()]
                    }
                    if (button.value == "Go")
                    {
                        button.value = "Press to Stop"
                        rand += (Math.random() * 360) + 2880;
                        rotation.style.mozTransform = "rotate(" + rand + "deg)";
                        rotation.style.msTransform = "rotate(" + rand + "deg)";
                        rotation.style.transform = "rotate(" + rand + "deg)";
                        rotation.className = "beginRotate"
                    }
                }
            },

            buttonValue() {
                var button = document.getElementById("button")
                {<h4>
                    button.value
                </h4>}
                return button.value
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

#rotationManagement {
    transition: transform 10s cubic-bezier(.5,.1,.15,1);
    transform: rotate(0deg);
    z-index: 1;
    pointer-events: none;
}
.wheel {
    display:block;
    margin-left:auto;
    margin-right:auto;
    position: relative;
    margin-top: 50px;
    width: 500px;
    height: 500px;
    margin-bottom: 50px;
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
.beginRotate {

}
.endRotate {

}


</style>