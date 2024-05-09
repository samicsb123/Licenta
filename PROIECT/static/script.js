const API_KEY = '&api_key=0a1f889833a064b9203aead4fd549e03';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const popularMovies = BASE_URL + '/movie/popular?language=en-US&page=1' + API_KEY;
const popularSeries = BASE_URL + '/tv/popular?language=en-US&page=1' + API_KEY;
const main = document.getElementById('main');


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
        const title = item.title || item.name;
        const poster_path = item.poster_path;
        const vote_average = item.vote_average.toFixed(2);
        const id = item.id; // Extragem id-ul filmului

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.setAttribute('data-title', title);
        movieEl.setAttribute('data-id', id);

        movieEl.innerHTML = `
            <img src="${IMG_URL + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
        `;

        main.appendChild(movieEl);
    });

    // Adăugăm un event listener pentru fiecare element .movie
    document.querySelectorAll('.movie').forEach(movieElement => {
        movieElement.addEventListener('click', function() {
            const movieId = this.getAttribute('data-id');
            fetchMovieDetails(movieId);
        });
    });
}

function fetchMovieDetails(id) {
    const movieDetailsURL = BASE_URL + '/movie/' + id + '?language=en-US&' + API_KEY;
    const seriesDetailsURL = BASE_URL + '/tv/' + id + '?language=en-US&' + API_KEY;
    if(document.title === 'OASIS - Movies'){

        fetch(movieDetailsURL)
            .then(response => response.json())
            .then(movieData => {
                console.log(movieData);

            })
            .catch(error => console.error('Eroare în timpul cererii fetch pentru detalii film:', error));
    }
    else if(document.title==='OASIS - Series'){
        fetch(seriesDetailsURL)
        .then(response => response.json())
        .then(movieData => {
            console.log(movieData);

        })
        .catch(error => console.error('Eroare în timpul cererii fetch pentru detalii film:', error));
        
    }
}

function getColor(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

if (document.title === 'OASIS - Movies') {
    getData(popularMovies);
} else if (document.title === 'OASIS - Series') {
    getData(popularSeries);
}

const searchInput = document.getElementById('search-input');
// document.addEventListener('DOMContentLoaded', function() {
//     // Selectăm inputul de căutare după ce întregul document a fost încărcat
//     const searchInput = document.querySelector('.search-input');

//     // Adăugăm ascultătorul de evenimente doar dacă inputul de căutare există
//     if (searchInput) {
//         searchInput.addEventListener('keydown', function(event) {
//             if (event.keyCode === 13) {
//                 const searchTerm = searchInput.value.trim();
//                 const formattedSearchTerm = searchTerm.split(' ').join('%20');
//                 const searchURL = BASE_URL + "/search/multi?query=" + formattedSearchTerm + '&' + API_KEY;
//                 getData(searchURL);
//             }}
//         }
       
//     }