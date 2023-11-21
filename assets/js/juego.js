/*
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades 
*/

let deck    = []
const tipos = ['C', 'D', 'H', 'S']
const especiales = ['A', 'J', 'Q', 'K']

let puntosJugador = 0
let puntosComputadora = 0
const btnNuevo = document.querySelector('#btnNuevo')
const btnPedir = document.querySelector('#btnPedir')
const btnDetener = document.querySelector('#btnDetener')
const jugador = document.querySelectorAll('small')
const cartasContainer = document.getElementById('jugador-cartas')
const cartasComputadora = document.getElementById('computadora-cartas')


// Esta funcion crea un nuevo Deck

const crearDeck = () =>{

    for ( let i = 2; i <= 10; i++ ) {

        for ( tipo of tipos ){

            deck.push(
                i + tipo,
            )

        }
    }
    
    for ( tipo of tipos ){
            
        for ( especial of especiales ) {
            deck.push( especial + tipo  )
        }

    }

    deck = _.shuffle( deck )

    return deck
}

crearDeck()

// Esta funcion me permitr tomar una carta

const pedirCarta = () =>{

    if ( deck.length === 0) {

        throw 'No hay cartas en el deck'

    }

    const carta = deck.pop()

    return carta
}


const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length - 1);

    return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1
}

const turnoComputadora = ( puntosMinimos ) =>{

    do {

        const carta = pedirCarta()

        puntosComputadora = puntosComputadora + valorCarta(carta)
        jugador[1].innerText = puntosComputadora
        
        const cartaImg = document.createElement('img')
        cartaImg.src = `assets/cartas/${carta}.png`
        cartaImg.classList.add('carta')
        cartasComputadora.append(cartaImg)

        if (puntosMinimos > 21){
            break;
        }

    } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout(() => {
        if (puntosComputadora == puntosMinimos){
            alert('Ninguno Gana :(')
        } else if (puntosMinimos > 21){
            alert('Computadora Ganó La Partida')
        } else if (puntosComputadora > 21){
            alert('Jugador Ganó La Partida')
        }
        else if (btnDetener.disabled === true && puntosComputadora > puntosMinimos && puntosComputadora <= 21){
            alert('Computadora Ganó La Partida')
        }
    
    }, 10);


}


// Eventos

btnNuevo.addEventListener('click', ()=>{
    console.clear()

    deck = []
    deck = crearDeck()

    btnDetener.disabled = false
    btnPedir.disabled = false

    jugador[0].innerText = 0
    jugador[1].innerText = 0
    puntosComputadora = 0
    puntosJugador = 0

    cartasContainer.innerHTML = ''
    cartasComputadora.innerHTML = ''
})


btnPedir.addEventListener('click', () => {

    const cartaImg = document.createElement('img')

    const carta = pedirCarta()

    puntosJugador = puntosJugador + valorCarta(carta)
    jugador[0].innerText = puntosJugador

    cartaImg.src = `assets/cartas/${carta}.png`
    cartaImg.classList.add('carta')
    cartasContainer.append(cartaImg)
    
    if ( puntosJugador > 21 ) {
        console.warn("Lo siento, Per diste")
        btnPedir.disabled = true
        btnDetener.disabled =true
        turnoComputadora(puntosJugador)

    } else if ( puntosJugador === 21) {
        console.warn("21, Excelente!!")
        btnPedir.disabled = true
        btnDetener.disabled =true
        turnoComputadora(puntosJugador)
    }
})

btnDetener.addEventListener('click', ()=>{
    btnPedir.disabled = true
    btnDetener.disabled =true
    console.log(puntosJugador)
    turnoComputadora(puntosJugador)
})