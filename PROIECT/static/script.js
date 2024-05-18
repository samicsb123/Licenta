const API_KEY = '&api_key=0a1f889833a064b9203aead4fd549e03';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const popularMovies = BASE_URL + '/movie/popular?language=en-US&page=1' + API_KEY;
const popularSeries = BASE_URL + '/tv/popular?language=en-US&page=1' + API_KEY;
const main = document.getElementById('main');
const API_URL_Movies = BASE_URL + '/discover/movie?sort_by_popularity.desc&' + API_KEY
const API_URL_Series = BASE_URL + '/discover/tv?sort_by_popularity.desc&' + API_KEY
const searchURLmovies = BASE_URL + '/search/movie?'+API_KEY;
const searchURLseries = BASE_URL + '/search/tv?'+API_KEY;

const genresSeries = [
  {
    "id": 10759,
    "name": "Action & Adventure"
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
    "id": 10762,
    "name": "Kids"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10763,
    "name": "News"
  },
  {
    "id": 10764,
    "name": "Reality"
  },
  {
    "id": 10765,
    "name": "Sci-Fi & Fantasy"
  },
  {
    "id": 10766,
    "name": "Soap"
  },
  {
    "id": 10767,
    "name": "Talk"
  },
  {
    "id": 10768,
    "name": "War & Politics"
  },
  {
    "id": 37,
    "name": "Western"
  }
]
const genresMovies = [
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

  const carsObject = [
    {
      "img": "https://images.pexels.com/photos/9784188/pexels-photo-9784188.jpeg?cs=srgb&dl=pexels-mathias-reding-9784188.jpg&fm=jpg",
      "model" : "FERRARI 296 GTS",
      "type" : "coupe"
    },
    {
      "img": "https://images.pexels.com/photos/10292234/pexels-photo-10292234.jpeg?cs=srgb&dl=pexels-yoshi-10292234.jpg&fm=jpg",
      "model" : "FERRARI SF90",
      "type" : "coupe"
    },
    {
      "img": "https://images.pexels.com/photos/11202306/pexels-photo-11202306.jpeg?cs=srgb&dl=pexels-prat-clement-11202306.jpg&fm=jpg",
      "model" : "FERRARI F60 America",
      "type" : "coupe"
    },
    {
      "img": "https://images.pexels.com/photos/8171898/pexels-photo-8171898.jpeg?cs=srgb&dl=pexels-eriks-abzinovs-8171898.jpg&fm=jpg",
      "model" : "FERRARI F8",
      "type" : "hatchback"
    },
    {
      "img": "https://images.pexels.com/photos/10292234/pexels-photo-10292234.jpeg?cs=srgb&dl=pexels-yoshi-10292234.jpg&fm=jpg",
      "model" : "FERRARI SF90",
      "type" : "coupe"
    },
    {
      "img": "https://images.pexels.com/photos/8171898/pexels-photo-8171898.jpeg?cs=srgb&dl=pexels-eriks-abzinovs-8171898.jpg&fm=jpg",
      "model" : "FERRARI F8",
      "type" : "hatchback"
    },
    {
      "img": "https://images.pexels.com/photos/9784188/pexels-photo-9784188.jpeg?cs=srgb&dl=pexels-mathias-reding-9784188.jpg&fm=jpg",
      "model" : "FERRARI 296 GTS",
      "type" : "coupe"
    },
    {
      "img": "https://images.pexels.com/photos/8171898/pexels-photo-8171898.jpeg?cs=srgb&dl=pexels-eriks-abzinovs-8171898.jpg&fm=jpg",
      "model" : "FERRARI F8",
      "type" : "hatchback"
    }
  ];

var selectedGenre = []

const form =  document.getElementById('form');
const search = document.getElementById('search');
const tagsEl = document.getElementById('tags');
const slider = document.querySelector(".slider");


if (document.title === 'OASIS - Movies' ){
  setGenre();
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    selectedGenre=[];
    setGenre();
    if(searchTerm) {
        getData(searchURLmovies+'&query='+searchTerm)
    }else{
        getData(popularMovies);
    }
    search.value = '';
    

})}
else if(document.title === 'OASIS - Series'){
  setGenre();
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    selectedGenre=[];
    setGenre();
    if(searchTerm) {
        getData(searchURLseries+'&query='+searchTerm)
    }else{
        getData(popularSeries);
    }
    search.value = '';
})
}
else if(document.title === 'OASIS - Home'){
  window.addEventListener("load", initializeSlider());

function initializeSlider(){
  let cars = "";
  for(let car in carsObject){
    cars += `<div class="slide">
              <img src="${carsObject[car].img}"
                alt="image">
              <br><br>
              <!--<div>
                <h3>${carsObject[car].model}</h3>
                <p>${carsObject[car].type}</p>
              </div>-->
            </div>`
  }
  slider.innerHTML = cars;
}

const tnslider = tns({
  container: '.slider',
  autoWidth:true,
  gutter: 15,
  slideBy: 4,
  nav: true,
  speed: 400,
  controlsContainer: '#controls',
  prevButton: '.previous',
  nextButton: '.next'
});
}
  function setGenre(){
    tagsEl.innerHTML = ''; 
    if (document.title === 'OASIS - Movies'){
      genres = genresMovies
    }
    else if (document.title === 'OASIS - Series'){
      genres = genresSeries
    }
    genres.forEach(genres => {
      const t = document.createElement('div');
      t.classList.add('tag');
      t.id=genres.id;
      t.innerText = genres.name;
      t.addEventListener('click', () => {
        if(selectedGenre.length == 0){
          selectedGenre.push(genres.id);
        }else{
          if(selectedGenre.includes(genres.id)){
            selectedGenre.forEach((id,idx) => {
              if(id == genres.id){
                selectedGenre.splice(idx, 1);
              }
            })
          }else{
            selectedGenre.push(genres.id);
          }
        }
        console.log(selectedGenre)
        if (document.title === 'OASIS - Movies'){
          getData(API_URL_Movies + '&with_genres=' + encodeURI(selectedGenre.join(',')))
          highlightSelection()
        }else if (document.title === 'OASIS - Series'){
          getData(API_URL_Series + '&with_genres=' + encodeURI(selectedGenre.join(',')))
          highlightSelection()
        }
        
      })
      tagsEl.append(t);
    })
  }

//   form.addEventListener('submit', (e) => 
//     e.preventDefault();

//     const searchTerm = search.value;
//     if(searchTerm) {
        
//         getData(searchURLmovies+'&query='+searchTerm)
//         getData(searchURLseries+'&query='+searchTerm)
    

// })


  function highlightSelection() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
      tag.classList.remove('highlight')
    })
    clearBtn()
    if(selectedGenre.length !=0){
      selectedGenre.forEach(id => {
        const hightlightedTag = document.getElementById(id);
        hightlightedTag.classList.add('highlight');

      })
    }

  }

function clearBtn(){
  let clearBtn=document.getElementById('clear');
  if(clearBtn){
    clearBtn.classList.add('highlight')
  }else{
    let clear = document.createElement('div');
    clear.classList.add('tag','highlight');
    clear.id = 'clear';
    clear.innerText = 'Clear x';
    clear.addEventListener('click', () => {
      selectedGenre = [];
      setGenre();
      if (document.title === 'OASIS - Movies'){
        getData(API_URL_Movies)
      }
      else if (document.title === 'OASIS - Series'){
        getData(API_URL_Series)
      }
    })
    tagsEl.append(clear);
  }


}


function getData(url) {
    fetch(url)
        .then(res => res.json()) 
        .then(data => {
            console.log(data);
            if(data.results.length !=0){
              showMovies(data.results);
            }else{
              main.innerHTML=`<h1 class="no-results">No Results Found</h1>`
            }
            
        })
        .catch(error => console.error('Eroare în timpul cererii fetch:', error));
}

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(item => {
        const title = item.title || item.name;
        const poster_path = item.poster_path;
        const vote_average = item.vote_average.toFixed(2);
        const id = item.id; 

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.setAttribute('data-title', title);
        movieEl.setAttribute('data-id', id);

        movieEl.innerHTML = `
            <img src="${poster_path? IMG_URL + poster_path: "http://via.placeholder.com/1080x1580"}" alt="${title}">
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
            fetchDetails(movieId);
        });
    });
}



function fetchDetails(id) {
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

