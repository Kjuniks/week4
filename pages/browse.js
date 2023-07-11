const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWM4YmVmNTcxZmYxMDBiMGU4YTU4ZmIyN2Y3Zjg4YiIsInN1YiI6IjY0YTk2NTBkOWM5N2JkMDExYzU4MzRhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.84P1AzFd8vu9tq2Lu_zSyT7QDQIXGdgPCvKu84pH0fY",
  },
};

const browseInput = document.querySelector(".browse__input");
const genresList = document.querySelector(".genres__list");
const searchBy = localStorage.getItem("searchBy");
const genreId = localStorage.getItem("genreId");

function searchMovies(searchTerm) {
  document.querySelector(".movies__container").innerHTML = loadSkeleton();
  browseInput.placeholder = searchTerm;
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`,
    options
  )
    .then((response) => response.json())
    .then(
      ({ results }) =>
        (document.querySelector(".movies__container").innerHTML =
          moviesToHTML(results))
    )
    .catch((err) => console.error(err));
}

function searchMoviesByGenreId(id) {
  document.querySelector(".movies__container").innerHTML = loadSkeleton();
  fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`,
    options
  )
    .then((response) => response.json())
    .then(
      ({ results }) =>
        (document.querySelector(".movies__container").innerHTML =
          moviesToHTML(results))
    )
    .catch((err) => console.error(err));
}

if (searchBy === "name") {
  searchMovies(localStorage.getItem("searchTerm"));
} else if (searchBy === "genre") {
  searchMoviesByGenreId(genreId);
}

function moviesToHTML(moviesList) {
  return moviesList.map((movie) => {
    if (movie.poster_path) {
      return `<div onclick="setMovieId(${movie.id})" class="movie">
    <figure class="movie__img--wrapper">
      <img
        src="https://image.tmdb.org/t/p/w780${movie.poster_path}"
        alt=""
        class="movie__img"
      />
    </figure>
    <div class="movie__desc">
      <h1 class="movie__title">
        ${movie.title}
      </h1>
      <p class="movie__para">
        ${movie.overview}
      </p>
      <p class="movie__vote">${movie.vote_average}/10 <i class="fa-solid fa-thumbs-up"></i></p>
    </div>
  </div>`;
    }
  });
}

function fetchByGenreId(id) {
  localStorage.setItem("searchBy", "genre");
  localStorage.setItem("genreId", id);
  window.location.href = "./browse.html";
}

function setMovieId(id) {
  localStorage.setItem("movieId", id);
  window.location.href = "./movie.html";
}

function scrollList(event) {
  const scrollDirection = event.deltaY;

  if (scrollDirection > 0) {
    genresList.scrollLeft += 50; //Scroll Right
  } else {
    genresList.scrollLeft -= 50; //Scroll Left
  }
}

function loadSkeleton() {
  return new Array(10).fill(0).map(
    () => `<div class="skeleton">
  <div class="skeleton__img"></div>
  <div class="skeleton__desc">
    <div class="skeleton__title"></div>
    <div class="skeleton__para"></div>
    <div class="skeleton__vote"></div>
  </div>
</div>`
  );
}

function searchMoviesForm(event) {
  event.preventDefault()
  const searchTerm = browseInput.value;
  console.log(searchTerm)
  document.querySelector(".movies__container").innerHTML = loadSkeleton();
  browseInput.placeholder = searchTerm;
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`,
    options
  )
    .then((response) => response.json())
    .then(
      ({ results }) =>
        (document.querySelector(".movies__container").innerHTML =
          moviesToHTML(results))
    )
    .catch((err) => console.error(err));
}
