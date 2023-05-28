
let modal = document.getElementById("myModal");

let images = document.querySelectorAll(".card-list .movie-card img");

let modalMovieId = document.getElementById("modalMovieId");

function openModal(event) {
  event.preventDefault();

  let card = event.target.closest(".movie-card");
  let movieId = card.getAttribute("id");

  modalMovieId.textContent = "Movie ID: " + movieId;

  modal.style.display = "block";
}

images.forEach(function(image) {
  image.addEventListener("click", openModal);
});

let span = document.getElementsByClassName("close")[0];

function closeModal() {
  modal.style.display = "none";
}

span.addEventListener("click", closeModal);

window.addEventListener("click", function(event) {
  if (event.target == modal) {
    closeModal();
  }
});

let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("search-btn");

function handleSearch(event) {
  event.preventDefault();

  let searchQuery = searchInput.value.trim();

  searchInput.value = "";

  filterMovies(searchQuery);
}

function filterMovies(searchQuery) {
  let movieCards = document.querySelectorAll(".movie-card");

  movieCards.forEach(function(card) {
    let title = card.querySelector("h3").textContent;
    let cardId = card.id;

    if (title.toLowerCase().includes(searchQuery.toLowerCase())) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

searchButton.addEventListener("click", handleSearch);