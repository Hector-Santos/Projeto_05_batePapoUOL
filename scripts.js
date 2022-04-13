let name = {
    name: null
}

function askName(){
    name.name =  prompt("Qual o seu nome")
    let promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', name)
    promisse.then(nomeSucesso)
    promisse.catch(nomeFalha)   

}

function nomeSucesso(sucesso){
    if(sucesso.status === 200)
    alert("Seu nome é " + name.name)
    
}


function nomeFalha(falha){
    if(falha.response.status === 400){
    name.name = prompt("Este nome já esta em uso, selecione outro ")
    let promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', name)
    promisse.then(nomeSucesso)
    promisse.catch(nomeFalha)  
    }
}


askName()