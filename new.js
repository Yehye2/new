const options = {
  method: 'GET',
  headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDQ0MmVjYjlmN2FjMTk0N2ZlNzU1NmY5ZDJjZGMzMyIsInN1YiI6IjY0NzA5MDY4YzVhZGE1MDExODY1YzkxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tQuF_edRIF88w9U_6YLugkZ_hB2a9aU9WFhFXvqYADA'
  }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(data => {
      const movies = data.results;
      const movieData = movies.map(movie => {
          return {
              id: movie.id,
              title: movie.title,
              overview: movie.overview,
              vote_average: movie.vote_average,
              poster_path: movie.poster_path
          };
      });
      createMovieCards(movieData);
  })
  .catch(err => console.error(err));

function createMovieCards(movieData) {
  const cardList = document.querySelector('.card-list');
  cardList.innerHTML = '';

  movieData.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.className = 'movie-card';
      movieCard.id = movie.id;

      const image = document.createElement('img');
      image.src = getMoviePosterUrl(movie.poster_path);
      image.alt = movie.title;
      image.addEventListener('click', () => openModal(movie.id));

      const id = document.createElement('p');
      id.textContent = `ID: ${movie.id}`;
      id.id = `modalId_${movie.id}`;

      const title = document.createElement('h3');
      title.textContent = movie.title;

      const description = document.createElement('p');
      description.textContent = movie.overview;

      const rating = document.createElement('p');
      rating.textContent = `평점: ${movie.vote_average}`;

      movieCard.appendChild(image);
      movieCard.appendChild(title);
      movieCard.appendChild(description);
      movieCard.appendChild(rating);

      cardList.appendChild(movieCard);
  });
}

function getMoviePosterUrl(posterPath) {
  const baseUrl = 'https://image.tmdb.org/t/p/w500';
  return `${baseUrl}${posterPath}`;
}

function openModal(movieId) {
  const modal = document.querySelector('.modal');
  const modalId = document.getElementById('modalId');

  modal.style.display = 'block';
  modalId.textContent = `ID: ${movieId}`;

  const closeBtn = document.querySelector('.close');
  closeBtn.addEventListener('click', () => closeModal());
}

function closeModal() {
  const modal = document.querySelector('.modal');
  modal.style.display = 'none';
}
