let numeroSecreto = 0;
let numIntentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);

    if (!elementoHTML) return;

    if (elemento === 'h1') {
        escribirTexto(elementoHTML, texto, 50);
    } else {
        elementoHTML.innerHTML = texto;
    }
}


function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p',`Ya adivinaste todos los numeros del 1 al ${numeroMaximo}`);
        listaNumerosSorteados=[];
    } else {
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function verificarIntento() {
    let numeroUsuario = parseInt(document.getElementById('numeroUsuario').value);
    if(numeroUsuario===numeroSecreto){
        asignarTextoElemento('p',`Acertaste el numero Secreto en ${numIntentos} ${(numIntentos>1) ? 'intentos': 'intento'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if (numeroSecreto>numeroUsuario) {
            asignarTextoElemento('p','El numero secreto es mayor');
        }else{
            asignarTextoElemento('p','El numero secreto es menor');
        }
        numIntentos++;
        limpiarEntrada();

    }
    return;
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'El juego del Numero Secreto');
    asignarTextoElemento('p', `Ingrese un numero entre 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    numIntentos = 1;
}

condicionesIniciales();

function nuevoJuego(){
    limpiarEntrada();
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled',true);
}

function limpiarEntrada(){
    document.getElementById('numeroUsuario').value = '';
}

function escribirTexto(elemento, texto, velocidad) {
    let i = 0;
    elemento.innerHTML = "";
    const intervalo = setInterval(() => {
        if (i < texto.length) {
            elemento.innerHTML += texto[i];
            i++;
        } else {
            clearInterval(intervalo);
        }
    }, velocidad);
    limpiarEntrada();
}


function setDificultad(dificultad) {
    console.log('Dificultad seleccionada: ' + dificultad);
    numeroMaximo = dificultad;  
    nuevoJuego();  
    cerrarModal();  
}

function cerrarModal() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
}

function abrirModal() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'block';
}

