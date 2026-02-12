const TMDB_KEY = "YOUR_TMDB_API_KEY"; // Replace this

const cardsGrid = document.getElementById("cardsGrid");
const playerFrame = document.getElementById("playerFrame");

// Search by name
async function searchMovie() {
    const query = document.getElementById("searchInput").value.trim();
    if (!query) return;

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(query)}`;
    loadMovies(url);
}

// Load categories
function loadCategory(type) {
    let url = "";

    if (type === "trending") {
        url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_KEY}`;
    }
    if (type === "popular") {
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_KEY}`;
    }
    if (type === "top_rated") {
        url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_KEY}`;
    }
    if (type === "now_playing") {
        url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_KEY}`;
    }

    loadMovies(url);
}

// Create cards
async function loadMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    cardsGrid.innerHTML = "";

    data.results.forEach(movie => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <div class="card-thumb" style="background-image:url('https://image.tmdb.org/t/p/w500${movie.poster_path}')"></div>
            <div class="card-body">
                <h3>${movie.title}</h3>
            </div>
        `;

        card.addEventListener("click", () => {
            playerFrame.src = `https://vidsrc.me/embed/movie/${movie.id}`;
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        });

        cardsGrid.appendChild(card);
    });
}
