
    const URL = "http://localhost:3000/monsters"
    let currentPage = 1
    let dynamicURL = `${URL}/?_limit=50&_page=${currentPage}`

window.addEventListener("DOMContentLoaded", () =>{

renderForm()
renderMonsters(dynamicURL)
addListeners()

})


function fetchMonsters(url){
    return fetch(url)
    .then(resp => resp.json())
}

function renderMonsters(url){
    fetchMonsters(url)
    .then(displayMonsters)
    .catch( error => console.log(error.message))
}

function displayMonsters(monsters){
    monsters.forEach(addMonster)
}

function createElementWith(element, type, name){
    let elName = document.createElement(element)
    elName[type] = name
    return elName
}

function renderNextMonsters(monsters){
    const firstDiv = document.getElementById("create-monster")
    const bigDiv = document.getElementById("monster-container")
    bigDiv.remove()
    const newDiv = createElementWith("div", "id", "monster-container")
    firstDiv.appendChild(newDiv)
    displayMonsters(monsters)
}

function addMonster(monster){
    const monsterDiv = document.getElementById("monster-container")
    const cardDiv = createElementWith("div","className", "card")
    const nameh2 = createElementWith("h2", "innerText", monster.name)
    const ageh2 = createElementWith("h2", "innerText", monster.age)
    const cardp = createElementWith("p", "innerText", monster.description)
    cardDiv.append(nameh2, ageh2, cardp)
    monsterDiv.appendChild(cardDiv)
}


function addListeners(){
    const backButton = document.getElementById("back")
    const forwardButton = document.getElementById("forward")
    
    backButton.addEventListener('click', () => loadPage("previous"))
    forwardButton.addEventListener('click', () => loadPage("next"))

}

function loadPage(action){
    if (action === "previous" && currentPage > 0){
        --currentPage
    } else if (action === "next"){
        ++currentPage
    }
    const dynamicURL = `${URL}/?_limit=50&_page=${currentPage}`

    fetchMonsters(dynamicURL)
    .then(renderNextMonsters)
}

// rendering form

function renderForm(){
const div = document.getElementById("create-monster")
const form = createElementWith("form", "id", "create-new-monster")
const name = createElementWith("input", "type", "text")
const age = createElementWith("input", "type", "text")
const description = createElementWith("input", "type", "text")
const button = createElementWith("input", "type", "submit")
name.id = "name_field"
age.id = "age_field"
description.id = "description_field"
form.addEventListener("submit", (event) => formListener(event, name, age, description) )
form.append(name, age, description, button)
div.appendChild(form)
}

function formListener(event, name, age, description){
    event.preventDefault()
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },

        body: JSON.stringify({
            name: name.value,
            age: age.value,
            description: description.value
        })
    }

    fetch(URL, configObj)
    .then(addMonster)
}
