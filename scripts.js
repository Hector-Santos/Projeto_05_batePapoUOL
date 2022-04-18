let user = {
    name: null
}

function askName() {
    user.name = prompt("Qual o seu nome")
    let promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user)
    promisse.then(nomeSucesso)
    promisse.catch(nomeFalha)

}

function nomeSucesso(sucesso) {
    if (sucesso.status === 200)
        setInterval(checkLogin, 3000)
        setInterval(buscaMensagens, 1000)

}

function checkLogin() {
    let promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", user)
    promisse.then()

}

function buscaMensagens() {
    let promisse = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promisse.then(montaMensagem)
}

function montaMensagem(response) {

    if (response.data[response.data.length - 1].type === "message") {
        document.querySelector(".messages").innerHTML += `<div class="message"> 
        (${response.data[response.data.length - 1].time})   
        ${response.data[response.data.length - 1].from}  para 
        ${response.data[response.data.length - 1].to} :
        ${response.data[response.data.length - 1].text}
        </div>`
    } else if (response.data[response.data.length - 1].type === "status") {
        document.querySelector(".messages").innerHTML += `<div class="message log"> 
            (${response.data[response.data.length - 1].time}) ` + `   ` + `
            ${response.data[response.data.length - 1].from} ` + ` ` + `
            ${response.data[response.data.length - 1].text} ` + ` ` + `
            </div>`
    }else if (response.data[response.data.length - 1].type === "private_message" && user.name === response.data[response.data.length - 1].to) {
        document.querySelector(".messages").innerHTML += `<div class="message privada"> 
        ${response.data[response.data.length - 1].time}  
        ${response.data[response.data.length - 1].from} reservadamente para 
        ${response.data[response.data.length - 1].to} :
        ${response.data[response.data.length - 1].text}`
    };
    
    removeRepetido()
    document.querySelector(".messages").lastChild.scrollIntoView()
    
   
}


function nomeFalha(falha) {
    if (falha.response.status === 400) {
        user.name = prompt("Este nome já esta em uso, selecione outro ")
        let promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user)
        promisse.then(nomeSucesso)
        promisse.catch(nomeFalha)
    }
}

function enviaMensagem() {
    let texto = document.querySelector("input").value
    let mensagem = {
    from: user.name,
	to: "todos",
	text: texto,
	type: "message"
    }
    let deu = false
    let promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagem)
    function apagaCampo(){
        document.querySelector("input").value = ""
        deu = true
    }
    promisse.then(apagaCampo())
   
    if(!deu)
    promisse.catch(window.location.reload())
    
    }

function removeRepetido() {
    let messages = document.querySelectorAll(".message")
    let message = messages[messages.length - 1]
    if(messages.length > 1){
    if (messages[messages.length - 1].innerHTML === messages[messages.length - 2].innerHTML) {
        message.parentElement.removeChild(message)
    }
}
}

function pressEnter(){
    let inputfield = document.getElementById("inputField")
    inputfield.addEventListener("keyup", function (event)
    { if (event.key === "Enter")
        document.getElementById("btnEnvia").click() 
     })
}
    askName()
    pressEnter()