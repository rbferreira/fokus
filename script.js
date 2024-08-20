const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const iniciarBt = document.querySelector('.app__card-primary-button')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('./sons/luna-rise-part-one.mp3')
const startPauseBt = document.querySelector('#start-pause')
let tempoDecorridoEmSegundos = 1500
let intervaloId = null
musica.loop = true
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const tempoNaTela = document.querySelector('#timer')

const iconePlayPause = document.querySelector('.app__card-primary-button-icon')

const somBeep = new Audio('./sons/beep.mp3')
const somPlay = new Audio('./sons/play.wav')
const somPause = new Audio('./sons/pause.mp3')

const displayTempo = document.getElementById('timer')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')

const tempoFoco = 1500;
const tempoCurto = 300;
const tempoLongo = 900;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
        }   
        else {
            musica.pause()
        }
})

focoBt.addEventListener('click', () => { 
    tempoDecorridoEmSegundos = tempoFoco
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => { 
    tempoDecorridoEmSegundos = tempoCurto
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})
    

longoBt.addEventListener('click', () => { 
    tempoDecorridoEmSegundos = tempoLongo
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
             Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
             Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
                Hora de voltar a superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        somBeep.play()
        alert('Tempo finalizado')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
    console.log('temporizador: ' + tempoDecorridoEmSegundos)
    console.log('Id: ' + intervaloId)
}

startPauseBt.addEventListener('click', iniciarOuPausar)



function iniciarOuPausar() {
    if(intervaloId) {
        somPause.play()
        zerar()
        return
    }
    somPlay.play()
    iconePlayPause.setAttribute('src', './imagens/pause.png')
    iniciarOuPausarBt.textContent = "Pausar"
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    iconePlayPause.setAttribute('src', './imagens/play_arrow.png')
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}


mostrarTempo()