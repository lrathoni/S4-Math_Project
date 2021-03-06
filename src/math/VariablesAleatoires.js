
// "Lucky Wheel"

//Structure containing "Event label", number
export const BinomialVariable = {
    eventTab : ["C'est la crise, les prix des installations augmentent de 25%",
                "Tata Monique est passé te voir ce WE, tu commences avec 100 pièces de plus !",
                "Les banques, ce n'est plus ce que c'était, tu as 50 pièces de moins pour débuter!",
                "T'as rien gagné, mais t'as rien perdu",
                "Braderie générale, toutes les installations à -30% !",
                "On m'annonce à l'oreillette qu'il va pleuvoir aujourd'hui",
                "Merveilleux temps pour toute la durée de la partie !",
                "On ne peut pas toujours gagner quelque-chose",
                "Malheureusement, tu vas devoir fermer plus tôt aujourd'hui",
                "Ton fournisseur t'as fait une fleur et a garanti une réinstallation en cas de panne pour chaque bâtiment"],
    n : 9 , // eventTab.size()
    p : 0, //probability chosen => it will be redefine
}

// return an array with the probability of each event
function probability(n,p) {
    var tab = []
    for (let k=0; k<=n; ++k) {
        tab.push(k_parmi_n(k,n) * Math.pow(p,k) * Math.pow(1-p,n-k))
    }
    return tab
}

function factorielle(n) {
    if (n==0 || n==1)
        return 1
    for (let i=0; i<n; i++) {
        return n*factorielle(n-1)
    }
}

function k_parmi_n(k,n) {
    if (k == n || k ==0) {
        return 1
    }
    return factorielle(n)/(factorielle(k)* factorielle(n-k) )
}

//return the range of the event 
export function findEventBinom(n,p) {
    let tab = probability(n,p)
    const t = Math.random() // return a pseudo random number between [0,1]
    let k=0
    let proba =  tab[0] // tab of proba value in BinomialVariable
    while (proba < t) {
        k++
        proba += tab[k]
    }
    return k==9 ? k-1 : k
}




//Weather period

//Here we'll  X^r ~ B(1/r, 1) --> Density graph ~ decresed line

// a>0, b>0, r>0 to respect the condition
// faire B(a,b) ==> b>1
// alpha =1 bêta = 1
export function Beta(a, b ,r) {
    var t = Math.random()
    //return a number between [a,b] ** r
    var x = a + (b - a)* Math.pow(t,r)
    // (a^1/r + (b^1/r-a^1/r)t)^r
    return x
}

/*
gamma (1, lambda) ~ exp param lambda => -(1/lambda) * Math.log(t), t ~ U([0,1])
gamma ( alpha , lambda) = sum alpha fois (-(1/lambda) * Math.log(t))
Beta (alpha, beta ) ~ X / (X + Y) , X ~ G(alpha, lamda), Y ~ G(beta, lamda)
Beta(alpha, beta) =  (sum (alpha times) (-(1/lambda) * Math.log(t))) / sum (alpha + beta times)  (-(1/lambda) * Math.log(t))
*/ 
export function Beta2(a, b, alpha, beta) {
    const gammaX = gamma(alpha, 1)
    const gammaY = gamma(beta, 1)
    const f = gammaX / (gammaX + gammaY)
    //return a number between [a,b] ** r
    return a + (b-a) * f 
}

export function gamma(alpha,lambda) {
    let t=0
    let sumExp = 0
    for (let i = 0; i <alpha; i++ ) {
        t = Math.random();
        sumExp += Math.log(t)
    }
    return -lambda * sumExp
}


//Number of visitors
//--> Value of lambda is the average number of the visitor
//poisson
//1 st Modelise a variable dependent of a exponential law
//U de loi uniforme sur [0,1]. Alors X = -1/lambda * ln(U)

export function Poisson(lambda = 0) {
    //Lambda the parameter of Poisson law is the average number of visitors
    /*let lambda = 0
    if (weather == "sun")
        lambda = 25
    else if (weather == "clouds")
        lambda = 15
    else if (weather == "rain")
        lambda = 5
    else
        throw console.error("weather is not correctly defined")*/

    //simulation of poisson law
    let t = Math.random() // return a pseudo random number between [0,1]
    let ExpSum = (-1/lambda) * Math.log(t)
    let k=0
    while (ExpSum <=1) {
        t = Math.random() // return a pseudo random number between [0,1]
        ExpSum += (-1/lambda) * Math.log(t)
        k++
    }
    return k-1
}


//Broken or not Broken


//Bernoulli
// p is the "durability attribut" of the tested installation
// t is a value randomly chosen in [0,1]

export function isBroken(p) {
    const t= Math.random() // return a pseudo random number between [0,1]
    // if t<=p, the machine continue to work
    if (t<=p)
        return false
    // t>p the machine is broken
    else
        return true
}


//  exports.default = {
//     BinomLaw() {
//         findEventBinom()
//     }

// }
