
const miModulo = (() => {
    'use strict';

    // 2C = 2 de trebol
    // 2H = 2 de corazon
    // 2S = 2 de espada
    // 2D = 2 de diamante

    //baraja
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'K', 'Q', 'J'];


    let puntosJugadores = [];


    // referencia html
    let pedir_btn = document.querySelectorAll('button')[1],
        nuevo_btn = document.querySelectorAll('button')[0],
        detener_btn = document.querySelectorAll('button')[2];

    
       

    const divCartasJugadores = document.querySelectorAll('.div_cartas'),
          puntos = document.querySelectorAll('small');



    // esta funcion inicializa el juego
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();

        puntosJugadores=[];

        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);

        }

        puntos.forEach(elem => elem.innerHTML = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        pedir_btn.disabled = false;
        detener_btn.disabled = false;
    };

    const crearDeck = () => {

        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {

                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(especial + tipo);
            }
        }

        return _.shuffle(deck);
    }


    //esta funcion me permite pedir una carta

    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en la baraja';
        }

        return deck.pop(); // elimina y al mismo tiempo la almacena en la variable
    }


    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1); //dice: corta la palabra desde la posicion 0 hasta la ultima posicion menos uno

        return isNaN(valor) ? (valor === 'A') ? 11 : 10
            : valor * 1;
    }


    // turno: 0 = primer jugador y el ultimo sera la IA
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntos[turno].innerHTML = puntosJugadores[turno];
        return puntosJugadores[turno];
    }


    const crearCarta = (carta, turno) => {
        //crear la carta
        const newCard = document.createElement('img');
        newCard.src = `assets/cartas/${carta}.png`;
        newCard.classList.add('carta');
        divCartasJugadores[turno].append(newCard);
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosIA] = puntosJugadores;

        setTimeout(() => {

            if ((puntosIA === puntosMinimos) && puntosIA != 21) {
                alert('Haz perdido contra la poderosa IA :(');
            } else if ((puntosMinimos > puntosIA) && puntosMinimos <= 21) {
                alert('BlackJack Haz Ganado!!!');
            } else if (puntosIA > 21 && puntosMinimos <= 21) {
                alert('BlackJack Haz Ganado!!!');
            } else if (puntosMinimos > 21) {
                alert('Haz perdido, la IA manda!!!');
            } else if ((puntosIA > puntosMinimos) && puntosIA <= 21) {
                alert('Haz perdido, la IA manda!!!');
            } else if (puntosIA < 21 && puntosMinimos <= 21) {
                alert('BlackJack Haz Ganado!!!');
            }
        }, 100)
    }

    const turnoIA = (puntosMinimos) => {

        let puntosIA = 0;

        do {
            const carta = pedirCarta();
            puntosIA = acumularPuntos(carta, puntosJugadores.length - 1);

            crearCarta(carta, puntosJugadores.length - 1);
           
            // if (puntosMinimos > 21) {
            //     break;
            // }


        } while ((puntosIA < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    }







    //! Eventos


    pedir_btn.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        // logica del juego

        if (puntosJugador > 21) {
            console.warn("Haz perdido :'(");
            pedir_btn.disabled = true;
            detener_btn.disabled = true;
            turnoIA(puntosJugador);

        } else if (puntosJugador === 21) {
            console.warn('Ganaste');
            pedir_btn.disabled = true;
            detener_btn.disabled = true;
            turnoIA(puntosJugador);

        }
    })

    detener_btn.addEventListener('click', () => {

        pedir_btn.disabled = true;
        detener_btn.disabled = true;
        turnoIA(puntosJugadores[0]);


    })

    nuevo_btn.addEventListener('click', () => {

        inicializarJuego();
       
    })

    return {
        nuevoJuego: inicializarJuego
    }
})();




