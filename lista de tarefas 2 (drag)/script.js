// preciso de uma função para renderizar a lista na tela, separada das funçoes de cadastrar ou excluir elementos.

//inicialmente, preciso pegar o input do usuario, adicionar o valor em um array, e devolver a tarefa com um botão de excluir do lado e uma checkbox
let inputTarefa = document.querySelector('.inputTarefa')
let ul = document.querySelector('.lista')
let botao = document.querySelector('.botao')
botao.addEventListener('click', cadastrar)
let arrayTarefas = JSON.parse(localStorage.getItem('@teste')) || []
renderizarTarefas()
let agora = new Date()
let horas = agora.getHours()
let minutos = agora.getMinutes()
let body = document.querySelector('body')
let titulo = document.querySelector('h1')



function arrumarMinutos(n) {
    if (n < 10) {
        return `0` + n
    } else {
        return n
    }
}


let telaHoras = document.createElement('span')
telaHoras.classList.add('horas')
telaHoras.innerHTML = `Agora são ${horas}:${arrumarMinutos(minutos)} horas`
body.appendChild(telaHoras)

if (horas > 5 && horas < 12) {
    body.style.backgroundColor = '#e4d6b6'
    telaHoras.style.color = '#000000'
} else if (horas < 18) {
    body.style.backgroundColor = '#f54b0391'
    telaHoras.style.color = '#000000'
} else {
    body.style.backgroundColor = '#020028'
    titulo.style.color = '#FFFFFF'
    telaHoras.style.color = '#FFFFFF'
}


function enter(event) {
    if (event.key == 'Enter') {
        cadastrar()
    }
}

inputTarefa.addEventListener('keydown', enter)

function renderizarTarefas() {
    ul.innerHTML = ''
    for (let i = 0; i < arrayTarefas.length; i++) {
        let tarefaNaTela = document.createElement('li')
        ul.appendChild(tarefaNaTela)
        tarefaNaTela.innerHTML = `<input type = "checkbox" class = "check"><span class = "textoTarefa">${arrayTarefas[i]}</span> <a href = "#" data-index = "${i}" class = "botaoExcluir">Excluir</a>`
        let botaoExcluir = tarefaNaTela.querySelector('.botaoExcluir')
        botaoExcluir.addEventListener('click', excluir)
        let checkbox = tarefaNaTela.querySelector('.check')
        checkbox.addEventListener('change', function () {
            let spanTextoTarefa = tarefaNaTela.querySelector('.textoTarefa')
            if (checkbox.checked) {
                spanTextoTarefa.classList.add('riscado')
            } else {
                spanTextoTarefa.classList.remove('riscado')
            }
        })
    }
}



function cadastrar() {
    let inputValor = inputTarefa.value.trim()
    if (inputValor == 0) {
        window.alert('[ERRO] Digite uma tarefa para cadastrar.')
        return
    } else {
        arrayTarefas.push(inputValor)
        renderizarTarefas()
        armazenarDados()
    }
    inputTarefa.value = ''
    inputTarefa.focus()

}

function excluir(event) {
    if (event.target.classList.contains('botaoExcluir')) {
        let index = event.target.getAttribute('data-index')
        arrayTarefas.splice(index, 1)
        event.target.parentElement.remove()
        renderizarTarefas()
        armazenarDados()
    }
}

function armazenarDados() {
    localStorage.setItem('@teste', JSON.stringify(arrayTarefas))
}