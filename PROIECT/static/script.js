const API_KEY = 'api_key=0a1f889833a064b9203aead4fd549e03';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const popularMovies = BASE_URL + '/movie/popular?language=en-US&page=1&' + API_KEY;
const popularSeries = BASE_URL + '/tv/popular?language=en-US&page=1&' + API_KEY;
const main = document.getElementById('main');



// Funcția principală care obține datele și le afișează pe pagină
function getData(url) {
    fetch(url)
        .then(res => res.json()) 
        .then(data => {
            console.log(data);
            showMovies(data.results);
        })
        .catch(error => console.error('Eroare în timpul cererii fetch:', error));
}

// Funcția care afișează filmele pe pagină
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

// Funcția pentru a obține detalii despre un film
function fetchMovieDetails(id) {
    const movieDetailsURL = BASE_URL + '/movie/' + id + '?language=en-US&' + API_KEY;

    fetch(movieDetailsURL)
        .then(response => response.json())
        .then(movieData => {
            console.log(movieData);
            // Aici poți face orice cu datele obținute despre film (de exemplu, afișarea lor pe o pagină separată)
            // În acest exemplu, afișăm doar detaliile filmului în consolă
        })
        .catch(error => console.error('Eroare în timpul cererii fetch pentru detalii film:', error));
}

// Funcția care returnează culoarea corespunzătoare pentru scorul de evaluare
function getColor(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

// La început, afișăm lista principală de filme populare
if (document.title === 'OASIS - Movies') {
    getData(popularMovies);
} else if (document.title === 'OASIS - Series') {
    getData(popularSeries);
}
