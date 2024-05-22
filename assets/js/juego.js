
// 2C = 2 de trebol
// 2H = 2 de corazon
// 2S = 2 de espada
// 2D = 2 de diamante

//baraja
let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'K', 'Q', 'J'];

let puntosJugador = 0,
    puntosIA = 0;


// referencia html
let pedir_btn = document.querySelectorAll('button')[1];
let nuevo_btn = document.querySelectorAll('button')[0];
let detener_btn = document.querySelectorAll('button')[2];

let small_jug = document.querySelectorAll('small')[0];
let small_IA = document.querySelectorAll('small')[1];

let divCardPlayer = document.getElementById('jugador-cartas');
let divCardIA = document.getElementById('ia-cartas');

// esta funcion crea una nueva baraja
const crearDeck = () => {

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

    // console.log(deck);

    deck = _.shuffle(deck);
    // console.log(deck);
    return deck;
}

crearDeck();



//esta funcion me permite pedir una carta

const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay cartas en la baraja';
    }

    const carta = deck.pop(); // elimina y al mismo tiempo la almacena en la variable

    // console.log(deck);
    console.log(carta);
    return carta
}

// pedirCarta();

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1); //dice: corta la palabra desde la posicion 0 hasta la ultima posicion menos uno

    return isNaN(valor) ? (valor === 'A') ? 11 : 10
        : valor * 1;


    // let puntos = 0;

    // if (isNaN(valor)) {           //isNan dice: evalua si lo que hay entre parentesis es un numero, // true si no es num
    //     puntos = (valor === 'A') ? 11 : 10;
    // } else {

    //     puntos = valor * 1; //multiplicamos por 1 para transformar el string en num
    // }

    // console.log(puntos);

}

const turnoIA = (puntosMinimos) => {
    do {
        const carta = pedirCarta();

        puntosIA = puntosIA + valorCarta(carta);
    
        small_IA.innerHTML = puntosIA;
        
    
        //crear la carta
        let newCard = document.createElement('img');
        newCard.src = `assets/cartas/${carta}.png`;
        newCard.classList.add('carta');
        divCardIA.append(newCard); 

        if (puntosMinimos > 21){
            break;
        }


    }  while((puntosIA < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(()=> {

        if((puntosIA === puntosMinimos) && puntosIA != 21){
            alert('Haz perdido contra la poderosa IA :(');
        } else if ((puntosJugador > puntosIA) && puntosJugador <= 21){
            alert('BlackJack Haz Ganado!!!');
        } else if (puntosIA > 21 && puntosJugador <= 21){
            alert('BlackJack Haz Ganado!!!');
        } else if (puntosJugador > 21){
            alert('Haz perdido, la IA manda!!!');
        } else if ((puntosIA > puntosMinimos) && puntosIA <= 21 ){
            alert('Haz perdido, la IA manda!!!');
        } else if (puntosIA < 21 && puntosJugador <= 21){
            alert('BlackJack Haz Ganado!!!');
        }
    }, 1000)
}







//! Eventos


pedir_btn.addEventListener('click', () => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);

    small_jug.innerHTML = puntosJugador;
    console.log(puntosJugador);

    //crear la carta
    let newCard = document.createElement('img');
    newCard.src = `assets/cartas/${carta}.png`;
    newCard.classList.add('carta');
    divCardPlayer.append(newCard);

    // logica del juego

    if (puntosJugador > 21) {
        console.warn("Haz perdido :'(");
        pedir_btn.disabled = true;
        detener_btn.disabled = true;
        turnoIA(puntosJugador);
        
    } else if (puntosJugador === 21){
        console.warn('Ganaste');
        pedir_btn.disabled = true;
        detener_btn.disabled = true;
        turnoIA( 20 );
        
    } 
})

detener_btn.addEventListener('click', ()=> {

    pedir_btn.disabled = true;
    detener_btn.disabled = true;
    turnoIA(puntosJugador);


})

nuevo_btn.addEventListener('click', () => {
    window.location.reload();
})


