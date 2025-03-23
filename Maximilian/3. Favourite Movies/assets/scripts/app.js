const addModal = document.getElementById('add-modal')
const startMovieButton = document.querySelector('header button')
const backdrop = document.getElementById('backdrop')
const cancel = document.querySelector('.btn--passive')
const add = cancel.nextElementSibling
const inputs = document.querySelectorAll('input') // it selects all the inputs 
const entryTextSection = document.getElementById('entry-text')
const deleteMovieModal = document.getElementById('delete-modal')


const movies = []

// Your personal movie database!
// movie indengil aa box hide cheyan vendi 
const updateUI = () => {
    if(movies.length === 0){
        entryTextSection.style.display = 'block'
    }else{
        entryTextSection.style.display = 'none'
    }
}

const deleteMovie = (movieId) =>{
    let movieIndex = 0
    for(const movie of movies){
        if(movie.id === movieId){
            break;
        }
        movieIndex++
    }
    movies.splice(movieIndex, 1)
    const listRoot = document.getElementById('movie-list')
    listRoot.children[movieIndex].remove()
    cancelMovieDeletion()
}

const cancelMovieDeletion = () =>{
    deleteMovieModal.classList.remove('visible')
    return 
}

function deleteMovieHandler(movieId){
    deleteMovieModal.classList.add('visible')

    const cancelDeletionButton = document.querySelector('.btn--passive')
    const confirmDeletionButton = document.querySelector('.btn--danger')

    

    cancelDeletionButton.addEventListener("click",cancelMovieDeletion) 
    confirmDeletionButton.addEventListener("click", ()=>deleteMovie(movieId))
}



const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li')
    newMovieElement.className = 'movie-element'
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}" />
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
        </div>
    `
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id))
    const listRoot = document.getElementById('movie-list')
    listRoot.append(newMovieElement)
}


function addModalToggle(){
    addModal.classList.toggle('visible')
    backdrop.classList.toggle('visible')
}

const clearMovieInput = () =>{
    for(const input of inputs){
        input.value = ''
    }
}

function addMovieHandler(){
    const titleValue = inputs[0].value // it selects the value of the first input  
    const imageUrlValue = inputs[1].value
    const ratingsValue = inputs[2].value

    if(titleValue.trim() === '' || imageUrlValue === '' || +ratingsValue === '' || +ratingsValue < 1){
        alert("please enter valid values")
    }

    const newMovie = {
        id : Math.random().toString(),
        title : titleValue,
        image : imageUrlValue,
        rating : ratingsValue
    }

    movies.push(newMovie)
    
    addModalToggle()
    clearMovieInput()
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating)
    updateUI()
}

startMovieButton.addEventListener('click', addModalToggle)
backdrop.addEventListener('click', addModalToggle)
cancel.addEventListener('click', addModalToggle)
add.addEventListener('click', addMovieHandler)