const API_KEY = '&api_key=0a1f889833a064b9203aead4fd549e03';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const popularMovies = BASE_URL + '/movie/popular?language=en-US&page=1' + API_KEY;
const popularSeries = BASE_URL + '/tv/popular?language=en-US&page=1' + API_KEY;
const main = document.getElementById('main');

const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]


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

