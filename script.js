const API_KEY = 'd2b91c2';
const BASE_URL = 'https://www.omdbapi.com/';
const SEARCH_API = `${BASE_URL}?apikey=${API_KEY}&s=`;
const MOVIE_DETAILS_API = `${BASE_URL}?apikey=${API_KEY}&i=`;
const POSTER_API = `http://img.omdbapi.com/?apikey=${API_KEY}&i=`;

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

// Function to fetch movies and display them
function fetchMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.Response === "True") {
        displayMovies(data.Search); // Display the fetched movies
      } else {
        main.innerHTML = `<h3>${data.Error}</h3>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
      main.innerHTML = `<h3>Error fetching data</h3>`;
    });
}

// Function to display a list of movies
function displayMovies(movies) {
  main.innerHTML = ""; // Clear previous content

  movies.forEach((movie) => {
    const div_row = document.createElement('div');
    div_row.setAttribute('class', 'row'); // Row container

    const div_column = document.createElement('div');
    div_column.setAttribute('class', 'column'); // Column container

    const div_card = document.createElement('div');
    div_card.setAttribute('class', 'card');

    const image = document.createElement('img');
    image.setAttribute('class', 'thumbnail');
    image.src = movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg';

    const title = document.createElement('h3');
    title.innerText = `${movie.Title} (${movie.Year})`;

    div_card.appendChild(image);
    div_card.appendChild(title);

   

    main.appendChild(div_card);

    // Append the card to the column
    div_column.appendChild(div_card);

    // Append the column to the row
    div_row.appendChild(div_column);
    // Add event listener to fetch detailed info on click
    div_card.addEventListener('click', () => getMovieDetails(movie.imdbID));
    // Append the row to the main container
    main.appendChild(div_row);
    
    
  });
}

// Function to fetch movie details by IMDb ID
function getMovieDetails(imdbID) {
  fetch(`${MOVIE_DETAILS_API}${imdbID}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.Response === "True") {
        displayMovieDetails(data); // Function to show movie details
      } else {
        console.error("Error:", data.Error);
      }
    })
    .catch((error) => {
      console.error("Error fetching movie details:", error);
    });
}

// Function to display detailed movie info (Example)
function displayMovieDetails(movie) {
    main.innerHTML = `
      <style>
        .movie-details {
          display: flex;
          align-items: flex-start;
          background: #222; /* Dark background */
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
          color: white; /* White text */
          margin: 20px auto;
          max-width: 800px;
          gap: 20px;
        }

        .movie-details img {
          width: 300px;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .details-text {
          flex: 1;
        }

        .details-text h2 {
          font-size: 24px;
          margin-bottom: 10px;
        }

        .details-text p {
          margin: 10px 0;
          font-size: 16px;
          line-height: 1.5;
        }

        .details-text button {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          background-color: #007bff; /* Blue background */
          color: white;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
        }

        .details-text button:hover {
          background-color: #0056b3; /* Darker blue */
          transform: scale(1.05); /* Slightly enlarges */
        }

        .details-text button:active {
          transform: scale(1); /* Reset scale */
        }
      </style>

      <div class="movie-details">
        <img src="${movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
        <div class="details-text">
          <h2>${movie.Title} (${movie.Year})</h2>
          <p><strong>Director:</strong> ${movie.Director}</p>
          <p><strong>Actors:</strong> ${movie.Actors}</p>
          <p><strong>Plot:</strong> ${movie.Plot}</p>
          <button onclick="location.reload()">Back</button>
        </div>
      </div>
    `;
;
}

// Fetch some random movies on page load
document.addEventListener('DOMContentLoaded', () => {
  const randomSearch = "marvel"; // You can change this keyword for variety
  fetchMovies(SEARCH_API + randomSearch);
});

// Search functionality
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchItem = search.value;
  if (searchItem) {
    fetchMovies(SEARCH_API + searchItem);
    search.value = ""; // Clear search box
  }
});
