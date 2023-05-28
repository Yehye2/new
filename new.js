let modal = document.getElementById("myModal");
let images = document.querySelectorAll(".card-list .movie-card img");
let modalMovieId = document.getElementById("modalMovieId");
let span = document.getElementsByClassName("close")[0];
let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("search-btn");

const openModal = (event) => {
  event.preventDefault();

  let card = event.target.closest(".movie-card");
  let movieId = card.getAttribute("id");

  modalMovieId.textContent = "Movie ID: " + movieId;

  modal.style.display = "block";
};

const closeModal = () => {
  modal.style.display = "none";
};

images.forEach((image) => {
  image.addEventListener("click", openModal);
});

span.addEventListener("click", closeModal);

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    closeModal();
  }
});

searchButton.addEventListener("click", (event) => {
  event.preventDefault();

  let searchQuery = searchInput.value.trim();

  searchInput.value = "";

  let movieCards = document.querySelectorAll(".movie-card");

  movieCards.forEach((card) => {
    let title = card.querySelector("h3").textContent;
    let cardId = card.id;

    if (title.toLowerCase().includes(searchQuery.toLowerCase())) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});