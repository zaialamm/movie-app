const API_KEY = "bcf8f764e2c04fa8db743babdc5283c6"; // please don't be a jerk and use your own API key
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopulerMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}

export const searchMovies = async (query) => {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
}