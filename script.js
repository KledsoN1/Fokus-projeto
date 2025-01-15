const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.getElementById('alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const tempoNaTela = document.querySelector('#timer')
const musica = new Audio('./sons/luna-rise-part-one.mp3')
const musicaTempoFinalizado = new Audio('./sons/beep.mp3')
const musicaPause = new Audio ('./sons/pause.mp3')
const musicaPlay = new Audio ('./sons/play.wav')
musica.loop = true
const startPauseBt = document.getElementById('start-pause')

musicaFocoInput.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
} )

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

focoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 1500
   alterarContexto('foco')
   focoBt.classList.add('active')
})

curtoBt.addEventListener('click', ()=> {
    tempoDecorridoEmSegundos =  300
   alterarContexto('descanso-curto')
   curtoBt.classList.add('active')
})

longoBt.addEventListener('click', ()=> {
    tempoDecorridoEmSegundos = 900
   alterarContexto('descanso-longo')
   longoBt.classList.add('active')
})

function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)   
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `<h1 class="app__title">
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
                `
                
            break;

        case 'descanso-curto': 
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta! </strong>`
            break
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa</strong>`
            break
    
        default:
            break;
    }
}

const contagemRegressiva = ()=>{
    if(tempoDecorridoEmSegundos <= 0){
        musicaTempoFinalizado.play()
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

const fotoPlay = document.querySelector('.app__card-primary-butto-icon')
const fotoPause = document.querySelector('.app__card-primary-butto-icon')
function iniciarOuPausar (){
    if(intervaloId){
        musicaPause.play()  
        zerar()
        return
    }
    musicaPlay.play()
    fotoPlay.setAttribute('src', `./imagens/pause.png`)
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = 'Pausar'

}

function zerar (){
    clearInterval (intervaloId)
    
    iniciarOuPausarBt.textContent = 'Começar'
    fotoPause.setAttribute('src', './imagens/play_arrow.png')
    intervaloId = null
}

function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br',{minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo()