 
const miModulo = (
    () => {
        

    'user strict'

    let deck    = []

    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K']

    let puntosJugadores = []

    const btnNuevo = document.querySelector('#btnNuevo'),
          btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener');


    const puntosHTML = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divCartas')
    
    //Esta funcion se encarga de Inicializar el Juego 
    const inicializarJuego = ( numJugadores = 2 ) => {

       deck = crearDeck()

        puntosJugadores = []

       for ( i = 0; i < numJugadores; i++){
            puntosJugadores.push(0)
       }

       puntosHTML.forEach( elem => elem.innerText = 0 )
       divCartasJugadores.forEach( elem => elem.innerHTML = '' )
       btnDetener.disabled = false
       btnPedir.disabled = false

    }

    // Esta funcion crea un nuevo Deck

    const crearDeck = () =>{
        
        deck = []

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
        
        return _.shuffle( deck )
    }


    // Esta funcion me permitr tomar una carta

    const pedirCarta = () =>{

        if ( deck.length === 0) {

            throw 'No hay cartas en el deck'

        }
        
        return deck.pop()
    }


    const valorCarta = ( carta ) => {

        const valor = carta.substring(0, carta.length - 1);

        return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1
    }

    
    const acumularPuntos = (carta, turno) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta)
        puntosHTML[turno].innerText = puntosJugadores[turno]

        return puntosJugadores[turno]
    }

    const crearCarta = (carta, turno) => {

        const cartaImg = document.createElement('img')
        cartaImg.src = `assets/cartas/${carta}.png`
        cartaImg.classList.add('carta')
        divCartasJugadores[turno].append(cartaImg)

    }

    const determinarGanador = () => {

        const [puntosComputadora, puntosMinimos] = puntosJugadores

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
        
        }, 100);

    }

    const turnoComputadora = ( puntosMinimos ) =>{

        do {

            const carta = pedirCarta()
            
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1)
            
            crearCarta(carta, puntosJugadores.length - 1)

            if (puntosMinimos > 21){
                break;
            }

        } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

       
        determinarGanador()

    }


    // Eventos

    btnNuevo.addEventListener('click', ()=>{ 
        inicializarJuego()
    })


    btnPedir.addEventListener('click', () => {


        const carta = pedirCarta()
        puntosJugador = acumularPuntos(carta, 0)

        crearCarta(carta, 0)    
        
        if ( puntosJugador > 21 ) {
            console.warn("Lo siento, Perdiste")
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
    });

    return {
        nuevoJuego : inicializarJuego
    }
    }
)();

