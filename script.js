const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const icone = document.querySelector('.app__card-primary-butto-icon')

const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const startPauseBtn = document.querySelector('#start-pause');
const iniciarOuPausarBtn = document.querySelector('#start-pause span')

// const imagemPlay = document.querySelector('./imagens/play_arrow.png')
// const imagemPause = document.querySelector('./imagens/pause.png')

const audio = new Audio('./sons/luna-rise-part-one.mp3');
const audioPausa = new Audio('./sons/pause.mp3')
const audioStart = new Audio('./sons/play.wav')
const audioAcabouTempo = new Audio('./sons/beep.mp3')

let tempoDecorridoEmSegundos = 5;
let intervaloID = null;

audio.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (audio.paused) {
        audio.play()
    } else {
        audio.pause()
    }
})

focoBtn.addEventListener('click', () => {
    alterarContexto('foco')
    focoBtn.classList.add('active')
})

curtoBtn.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    curtoBtn.classList.add('active') 
})

longoBtn.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    longoBtn.classList.add('active')
})

function alterarContexto(contexto) {

    botoes.forEach(function(contexto) {
        contexto.classList.remove('active')
    });

    html.setAttribute('data-contexto', contexto);

    banner.setAttribute('src', `./imagens/${contexto}.png`);
    
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
            case 'descanso-longo':
                titulo.innerHTML = `
                Hora de voltar à superficie.<br>
                    <strong class="app__title-strong">Faça uma pausa longa.</strong>
                `
                break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        //audioAcabouTempo.play()
        alert('Tempo Finalizado')
        zerar()
        icone.setAttribute('src', `./imagens/play_arrow.png`)
        return
    }
    tempoDecorridoEmSegundos -= 1
    console.log('Tempo Decorrido ' + tempoDecorridoEmSegundos)
}

startPauseBtn.addEventListener('click', IniciarOuPausar)

function IniciarOuPausar() {
    if (intervaloID) {
        icone.setAttribute('src', `./imagens/play_arrow.png`)
        audioPausa.play()
        zerar()
        return
    }
    icone.setAttribute('src', `./imagens/pause.png`)
    audioStart.play()
    intervaloID = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBtn.textContent = 'Pausar'
}

function zerar() {
    clearInterval(intervaloID)
    iniciarOuPausarBtn.textContent = 'Começar'
    intervaloID = null
}