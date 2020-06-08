
//Função responsável por listar estados
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    })
}

populateUFs()


//Função responsável por chamar as cidades de acordo com o estado escolhido
function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {  

        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);



// Itens de Coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){

    item.addEventListener("click", handleSelectedItem)

}

    const collectedItems = document.querySelector("[name=items]")

let selectedItems = []

function handleSelectedItem(event){

    const item = event.target

    // adicionar ou remover uma classe em javascript
    item.classList.toggle("selected")

    const itemId = event.target.dataset.id


    //verificar se existem itens selecionados


    //se sim - pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => item == itemId)

    
    //se já estiver - tirar da seleção
    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item =>item != itemId)

        selectedItems = filteredItems
    } else{
        // se não - adicionar a seleção

        selectedItems.push(itemId)
    }

    console.log(itemId)

    //atualizar o input escondido com os itens selecionados
    collectedItems.value = selectedItems

    
}