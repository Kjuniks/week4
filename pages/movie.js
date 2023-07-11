const genresList = document.querySelector(".genres__list");
const movieId = localStorage.getItem("movieId");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWM4YmVmNTcxZmYxMDBiMGU4YTU4ZmIyN2Y3Zjg4YiIsInN1YiI6IjY0YTk2NTBkOWM5N2JkMDExYzU4MzRhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.84P1AzFd8vu9tq2Lu_zSyT7QDQIXGdgPCvKu84pH0fY",
  },
};

function fetchMovie(id) {
  document.querySelector(".movie__container").innerHTML = loadSkeleton();
  fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
    .then((response) => response.json())
    .then(
      (response) =>
        (document.querySelector(".movie__container").innerHTML =
          movieToHTML(response))
    )
    .catch((err) => console.error(err));
}
fetchMovie(movieId);

function movieToHTML({ poster_path, original_title, overview, vote_average }) {
  return `<figure class="movie__img--wrapper">
    <img src="https://image.tmdb.org/t/p/w780/${poster_path}" alt="" class="movie__img">
</figure>
<div class="movie__desc">
    <h1 class="movie__title">${original_title}</h1>
    <p class="movie__para">${overview}</p>
    <p class="movie__vote">${vote_average}/10 <i class="fa-solid fa-thumbs-up"></i></p>
</div>`;
}

function fetchByGenreId(id) {
  localStorage.setItem("searchBy", "genre");
  localStorage.setItem("genreId", id);
  window.location.href = "./browse.html";
}

function searchMovies(event) {
  event.preventDefault();
  const searchTerm = document.querySelector(".browse__input").value;
  localStorage.setItem("searchBy", "name");
  localStorage.setItem("searchTerm", searchTerm);
  window.location.href = "./browse.html";
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
  return `<div class="skeleton">
  <div class="skeleton__img"></div>
  <div class="skeleton__desc">
    <div class="skeleton__title"></div>
    <div class="skeleton__para"></div>
    <div class="skeleton__vote"></div>
  </div>
  </div>`;
}
