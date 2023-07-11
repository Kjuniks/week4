function browse(id) {
  localStorage.setItem("searchBy", "genre")
  localStorage.setItem("genreId", id);
  window.location.href = "./pages/browse.html";
}

function searchMovies(event) {
  event.preventDefault();
  const searchTerm = document.querySelector(".landing__input").value;
  localStorage.setItem("searchBy", "name")
  localStorage.setItem("searchTerm", searchTerm);
  window.location.href =  "./pages/browse.html"
}