let user = {
    name: null
}

function askName() {
    user.name = prompt("Qual o seu nome")
    console.log(user)
    let promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user)
    promisse.then(nomeSucesso)
    promisse.catch(nomeFalha)

}

function nomeSucesso(sucesso) {
    console.log("entra no if")
    if (sucesso.status === 200){
        setInterval(checkLogin, 5000)
        buscaMensagens()
        setInterval(buscaMensagens, 3000)
    console.log("terminou if")
    }

}

function checkLogin() {
    let promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", user)
    promisse.then()

}

function buscaMensagens() {
    console.log("começou buscamensagem")
    let promisse = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promisse.then(montaMensagem)
}

function montaMensagem(response) {
    let espaço = "   ."
    console.log("terminou buscamensagem")
    document.querySelector(".messages").innerHTML = "";
    for(let i = 0; i < response.data.length ; i++){
        if (response.data[i].type === "message") {
            document.querySelector(".messages").innerHTML += `<div class="message"> 
            <span class="time">(${response.data[i].time}) </span>\xa0
            <span class="from">${response.data[i].from} </span>\xa0 para\xa0
            <span class="to">${response.data[i].to}\xa0 </span> : \xa0
            <span class="text">${response.data[i].text} </span>\xa0
            </div>`
        } else if (response.data[i].type === "status") {
            document.querySelector(".messages").innerHTML += `<div class="message log"> 
            <span class="time"> (${response.data[i].time}) </span>\xa0
            <span class="from">${response.data[i].from} </span>\xa0
            <span class="text"> ${response.data[i].text} </span>\xa0
                </div>`
        }else if (response.data[i].type === "private_message" && user.name === response.data[i].to) {
            document.querySelector(".messages").innerHTML += `<div class="message privada"> 
            <span class="time">${response.data[i].time} </span>\xa0 
            <span class="from">${response.data[i].from} </span>\xa0 reservadamente\xa0para\xa0 
            <span class="to">${response.data[i].to} </span> :\xa0
            <span class="text">${response.data[i].text} </span>` 
        };

    }
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
    let promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagem)
    console.log("mesnsagem enviada")
    function apagaCampo(response){
        console.log(response)
        document.querySelector("input").value = ""
        buscaMensagens()
    }
    promisse.then(apagaCampo)
    promisse.catch(erronoenvio)
    function erronoenvio(response){
        window.location.reload()
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