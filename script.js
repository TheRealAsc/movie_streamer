const cardsGrid = document.getElementById("cardsGrid");
const playerFrame = document.getElementById("playerFrame");

// Load movies from VidSrc endpoint
async function loadMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    cardsGrid.innerHTML = "";

    data.result.forEach(movie => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <div class="card-thumb" style="background-image:url('${movie.poster}')"></div>
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

// Search
function searchMovie() {
    const q = document.getElementById("searchInput").value.trim();
    if (!q) return;
    loadMovies(`https://vidsrc.me/movies/search/${encodeURIComponent(q)}`);
}

// Categories
function loadCategory(type) {
    if (type === "trending") loadMovies("https://vidsrc.me/movies/trending");
    if (type === "popular") loadMovies("https://vidsrc.me/movies/popular");
    if (type === "top_rated") loadMovies("https://vidsrc.me/movies/top-rated");
    if (type === "now_playing") loadMovies("https://vidsrc.me/movies/in-theaters");
}
