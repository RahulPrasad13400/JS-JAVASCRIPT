const addMovieBtn = document.getElementById('add-movie-btn')
const searchBtn = document.getElementById('search-btn')

const movies = []

const renderMovies = (filter = '') => {
    console.log("filter", filter)
    const movieList = document.getElementById('movie-list')
    if(movies.length === 0){
        movieList.classList.remove('visible')
    }else{
        movieList.classList.add('visible')
    }
    movieList.innerHTML = ''

    const filteredMovies = filter === '' 
    ? movies 
    : movies.filter(movie => movie.info.title.toLowerCase().includes(filter.toLowerCase()));

    filteredMovies.forEach((movie)=>{
        const movieEl = document.createElement('li')
        const { info, ...otherProps } = movie
        const {getFormattedTitle} = movie 
        const {title : movieTitle} = info 
        let text = movie.getFormattedTitle() + '-'
        for(const key in info){
            if(key !== 'title'){
                text = text + `${key} : ${info[key]}`
            }
        }
        movieEl.textContent = text
        movieList.append(movieEl)
    })
}

const addMovieHandler = () => {
    const title = document.getElementById('title').value
    const extraName = document.getElementById('extra-name').value
    const extraValue = document.getElementById('extra-value').value
    if(title.trim() === '' || extraName.trim() === "" || extraValue.trim() === ""){
        return;
    }
    const newMovie = {
        info : {
            title, 
            // square brackets are used to assign dynamic  value's
            [extraName] : extraValue
        },
        id : Math.random().toString(),
        getFormattedTitle(){
            return this.info.title.toUpperCase()
        }
    }

    movies.push(newMovie)
    renderMovies()
}

const searchMovieHandler = () => {
    const filterTerm = document.getElementById('filter-title').value
    renderMovies(filterTerm)
}

addMovieBtn.addEventListener('click', addMovieHandler)
searchBtn.addEventListener('click', searchMovieHandler)

