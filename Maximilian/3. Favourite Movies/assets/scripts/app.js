const addModal = document.getElementById('add-modal')
const startMovieButton = document.querySelector('header button')
const backdrop = document.getElementById('backdrop')
const cancel = document.querySelector('.btn--passive')
const add = cancel.nextElementSibling
const inputs = document.querySelectorAll('input') // it selects all the inputs 

function addModalToggle(){
    addModal.classList.toggle('visible')
    backdrop.classList.toggle('visible')
}

function addMovieHandler(){
    const titleValue = inputs[0].value // it selects the value of the first input  
    const imageUrlValue = inputs[1].value
    const ratingsValue = inputs[2].value
    console.log(typeof +ratingsValue)
    if(titleValue.trim() === '' || imageUrlValue === '' || +ratingsValue === '' || +ratingsValue < 1){
        alert("please enter valid values")
    }
}

console.log(inputs)

startMovieButton.addEventListener('click', addModalToggle)
backdrop.addEventListener('click', addModalToggle)
cancel.addEventListener('click', addModalToggle)
add.addEventListener('click', addMovieHandler)