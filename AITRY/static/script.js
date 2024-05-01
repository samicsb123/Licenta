const API_KEY = 'api_key=0a1f889833a064b9203aead4fd549e03'
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+ API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+ API_KEY;
const popularMovies = BASE_URL + "/movie/popular?language=en-US&page=1&" + API_KEY;
const popularSeries = BASE_URL+"/tv/popular?language=en-US&page=1&" +API_KEY;

const form = document.getElementById('form');
const main = document.getElementById('main');
const search =document.getElementById('search-input');




  if (document.title === "OASIS - Movies") {
    getData(popularMovies);
} else if (document.title === "OASIS - Series") {
    getData(popularSeries);
}

function getData(url) {
    fetch(url)
        .then(res => res.json()) 
        .then(data => {
            console.log(data);
            showMovies(data.results);
        
            
        })
        .catch(error => console.error('Eroare în timpul cererii fetch:', error));
}
function showMovies(data) {
    main.innerHTML = '';

    data.forEach(item => {
        // Verificăm dacă obiectul dat este film sau serial
        const title = item.title || item.name; // Extragem titlul din "title" sau "name"
        const poster_path = item.poster_path;
        const vote_average = item.vote_average.toFixed(2);

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
            <img src="${IMG_URL + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
        `;

        main.appendChild(movieEl);
    });
}


function getColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return "orange"
    }else{
        return 'red'
    }
}


