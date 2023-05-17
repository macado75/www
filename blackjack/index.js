// © Macado.Net, 2023 
// Contact - support@macado.net

let hasBlackJack=false
let isAlive=false
let foundanace=false
let message=""
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let dealerCardsEl = document.getElementById("dealercards-el")
let newCardEl = document.getElementById("newcard-el")
let stickEl = document.getElementById("stick-el")
let speechEl = document.getElementById("speech-el")

let sum = 0
let cards=[]
let dealerCards=[]
let dealerCount=0
let playerCount=0
const suits = ["C","S","D","H"]
let playername="Player"
let playerchips=200

let player ={
    name: "Player",
    chips: 200
}

speechEl.src="images/speech-playin.png"

playerEl.textContent=""

function startGame(){
    newCardEl.hidden = false
    stickEl.hidden = false
    playerEl.hidden = false
    playerEl.hidden = false
    playerEl.textContent = player.name + ": " + "$" + player.chips
    isAlive = true
    hasBlackJack = false
    sum = 0
    cards=[]
    cardsEl.innerHTML =""
    playerCount=0
    speechEl.src="images/speech-what.png"

    cards.push(getRandomCard(),getRandomCard())
    document.getElementById("newcard-el").disabled = false;
    renderGame()
}

function renderGame(){
    player_el.innerHTML = "Player: $"+ playerchips
    cardsEl.innerHTML =""
    let filename=""
    let filenamesuit=""
    let filenamevalue=""
    foundanace=false

    for(let i = 0; i < cards.length; i++)
    {
        if (cards[i].name === "A"){filenamevalue="ace"}
        else if (cards[i].name === "J"){filenamevalue="jack"}
        else if (cards[i].name === "Q"){filenamevalue="queen"}
        else if (cards[i].name === "K"){filenamevalue="king"}
        else {filenamevalue=cards[i].value}

        if (cards[i].suit === "S") {filenamesuit="spades"}
        if (cards[i].suit === "C") {filenamesuit="clubs"}
        if (cards[i].suit === "D") {filenamesuit="diamonds"}
        if (cards[i].suit === "H") {filenamesuit="hearts"}
        
        filename = "images/" + filenamesuit + "_" + filenamevalue + ".png"
        cardsEl.innerHTML += '<img src="'+ filename + '" id=cardimg alt="' +  cards[i].name + cards[i].suit + '" width="150" height="210" margin="15">'
    }

    if(sum <= 20){
        message = "Draw?"    
    } else if (sum === 21){
        message = "Blackack!"
        hasBlackJack = true
        document.getElementById("newcard-el").disabled = true;
        speechEl.src="images/speech-win.png"
    }else { 
        for(let i = 0; i < cards.length; i++)
        {
            if (cards[i].name === "A" && cards[i].gonewild === false)
            {
                cards[i].value = 1
                cards[i].gonewild=true
                sum = sum - 10
                foundanace=true
            }          
        }
        if (foundanace === false)
        {
            message = "Bust!"
            speechEl.src="images/speech-lose.png"
            isAlive = false
            document.getElementById("newcard-el").disabled = true;    
        }
    }
    dealerCardsEl.innerHTML = '<img src="images/back.png" width="75" height="105" margin="15"><img src="images/back.png" width="75" height="105" margin="15">'
}

function newCard(){
    let card = getRandomCard()
    cards.push(card)   
    renderGame()
}

function getRandomCard(){
    let randsuit=Math.floor(Math.random() * 3)
    let randcard=Math.floor(Math.random() * 13) + 1
    let cardobj = {
        value: randcard,
        suit: suits[randsuit],
        name: randcard,
        gonewild: false
    }

    if (cardobj.value === 1) {cardobj.name="A"; cardobj.value=11}
    else if (cardobj.value === 11) {cardobj.name="J"; cardobj.value=10}
    else if (cardobj.value === 12) {cardobj.name="Q"; cardobj.value=10}
    else if (cardobj.value === 13) {cardobj.name="K"; cardobj.value=10}  
    sum += cardobj.value  
    return cardobj
}

function Stick(){
    playerCount = sum
    dealerCards=[]
    dealerCount=0
    dealerCards.push(getRandomCard(),getRandomCard())
    dealerCardsEl.innerHTML = ""
    renderDealerCards()
}

function renderDealerCards() {
    for(let i = 0; i < dealerCards.length; i++)
    {
        if (dealerCards[i].name === "A"){filenamevalue="ace"}
        else if (dealerCards[i].name === "J"){filenamevalue="jack"}
        else if (dealerCards[i].name === "Q"){filenamevalue="queen"}
        else if (dealerCards[i].name === "K"){filenamevalue="king"}
        else {filenamevalue=dealerCards[i].value}

        if (dealerCards[i].suit === "S") {filenamesuit="spades"}
        if (dealerCards[i].suit === "C") {filenamesuit="clubs"}
        if (dealerCards[i].suit === "D") {filenamesuit="diamonds"}
        if (dealerCards[i].suit === "H") {filenamesuit="hearts"}
        
        filename = "images/" + filenamesuit + "_" + filenamevalue + ".png"
        dealerCardsEl.innerHTML += '<img src="'+ filename + '" id=cardimg alt="' +  dealerCards[i].name + dealerCards[i].suit + '" width="75" height="105" margin="15">'
        dealerEval()
    }
}

function dealerEval(){
    dealerCount=0
    for(let i = 0; i < dealerCards.length; i++) 
    {
        dealerCount+=dealerCards[i].value
    }

    if (dealerCount > 16 || dealerCount > playerCount) {}
    else {
        dealerCards.push(getRandomCard())
        dealerEval()
    }

    if (dealerCount > playerCount && dealerCount < 22)
    {
        speechEl.src="images/speech-lose.png"
        playerchips=playerchips-10
    } else {
        speechEl.src="images/speech-win.png"
        playerchips=playerchips+10
    }    
}

