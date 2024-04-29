const API_KEY = 'api_key=0a1f889833a064b9203aead4fd549e03'
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+ API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+ API_KEY;

const main = document.getElementById('main');

getMovies(API_URL);

function getMovies(url) {
    fetch(url)
        .then(res => res.json()) // Corectat aici
        .then(data => {
            console.log(data);
            showMovies(data.results);
        })
        .catch(error => console.error('Eroare în timpul cererii fetch:', error));
}
function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => { // Corectat aici
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${IMG_URL + poster_path}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}
                </span>
            </div>

            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `

        main.appendChild(movieEl);
    });
}

function getColor(vote){
    if(vote>=8){
        return 'green'
    }
    else if(vote <=5){
        return 'orange'
    }
    else{
        return 'red'
    }
}