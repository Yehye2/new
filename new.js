// API 호출을 위한 옵션 설정
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDQ0MmVjYjlmN2FjMTk0N2ZlNzU1NmY5ZDJjZGMzMyIsInN1YiI6IjY0NzA5MDY4YzVhZGE1MDExODY1YzkxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tQuF_edRIF88w9U_6YLugkZ_hB2a9aU9WFhFXvqYADA'
  }
};

// API를 호출하여 영화 목록 가져오기, 배열
fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    const movies = data.results;
    const movieData = movies.map(function (movie) {
      return {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        vote_average: movie.vote_average,
        poster_path: movie.poster_path
      };
    });
    createMovieCards(movieData); // 영화 카드 생성 함수 호출
  })
  .catch(function (err) {
    console.error(err);
  });

// 영화 카드 생성 함수
function createMovieCards(movieData) {
  const cardList = document.querySelector('.card-list');
  cardList.innerHTML = '';

  movieData.forEach(function (movie) {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    movieCard.id = movie.id;

    const image = document.createElement('img');
    image.src = getMoviePosterUrl(movie.poster_path);
    image.alt = movie.title;
    image.addEventListener('click', function () {
      openModal(movie.id);
    }); // 이미지 클릭 시 모달 열기 함수 호출

    const id = document.createElement('p');
    id.textContent = 'ID: ' + movie.id;
    id.id = 'modalId_' + movie.id;

    const title = document.createElement('h3');
    title.textContent = movie.title;

    const description = document.createElement('p');
    description.textContent = movie.overview;

    const rating = document.createElement('p');
    rating.textContent = '평점: ' + movie.vote_average;

    movieCard.appendChild(image);
    movieCard.appendChild(title);
    movieCard.appendChild(description);
    movieCard.appendChild(rating);

    cardList.appendChild(movieCard);
  });
}

// 영화 포스터 URL 생성 함수
function getMoviePosterUrl(posterPath) {
  const baseUrl = 'https://image.tmdb.org/t/p/w500';
  return baseUrl + posterPath;
}

// 모달 열기 함수
function openModal(movieId) {
  const modal = document.querySelector('.modal');
  const modalId = document.getElementById('modalId');

  modal.style.display = 'block';
  modalId.textContent = 'ID: ' + movieId;

  const closeBtn = document.querySelector('.close');
  closeBtn.addEventListener('click', function () {
    closeModal();
  }); // 닫기 버튼 클릭 시 모달 닫기 함수 호출
}

// 모달 닫기 함수
function closeModal() {
  const modal = document.querySelector('.modal');
  modal.style.display = 'none';
}

// 검색 기능 처리 함수
function handleSearch(event) {
  event.preventDefault(); // 폼 기본 동작 방지

  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value.trim();

  if (searchTerm !== '') {
    // 검색어가 비어있지 않은 경우에만 검색 수행
    const searchUrl = `https://api.themoviedb.org/3/search/movie?language=en-US&page=1&query=${searchTerm}`;

    fetch(searchUrl, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const movies = data.results;
        const movieData = movies.map(function (movie) {
          return {
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            vote_average: movie.vote_average,
            poster_path: movie.poster_path
          };
        });
        createMovieCards(movieData); // 검색 결과에 맞는 영화 카드 생성
      })
      .catch(function (err) {
        console.error(err);
      });
  }
}

// 검색 폼에 이벤트 리스너 등록
const searchForm = document.querySelector('.search');
searchForm.addEventListener('submit', handleSearch);
