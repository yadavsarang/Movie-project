const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query='

const main = document.getElementById('main')
const form = document.getElementById('form')
const searchInput = document.getElementById('mysearch')

// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average} = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
              <h3>${title}</h3>
              <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            
        `
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = searchInput.value

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        searchInput.value = ''
    } else {
        window.location.reload()
    }
})

function toggleSearch() {
    const searchbox = document.querySelector('.searchbox');
    searchbox.classList.toggle('active');
}

function clearSearch() {
    searchInput.value = '';
}

function filterMovies(searchTerm) {
    const movies = document.querySelectorAll('.movie');
    movies.forEach(movie => {
        const movieTitle = movie.querySelector('.movie-info h3').textContent.toLowerCase();
        if (movieTitle.includes(searchTerm.toLowerCase())) {
            movie.style.display = 'block'; 
        } else {
            movie.style.display = 'none'; 
        }
    });
}

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value;
    filterMovies(searchTerm);
});
