import { useState, useEffect } from 'react';
import { searchMovies, getPopulerMovies } from '../services/api';   
import MovieCard from "../components/MovieCard";
import "../styles/Home.css";


function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const populerMovies = await getPopulerMovies();
                setMovies(populerMovies);
            } catch (err) {
                console.error(err);
                setError("Failed to load movies");
            } finally {
                setLoading(false);
            }
        }

        loadPopularMovies();

    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        if (loading) return;


        setLoading(true)
        
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch (err) {
            console.error(err)
            setError("Failed to search movies")
        } finally { 
            setLoading(false)
        }

        setSearchQuery('');
    }
    
    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text" 
                    placeholder="Search for a movie..." 
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading"> 🔃 Loading... </div> 
            ) : (
                <div className="movies-grid">
                {movies.map(
                    (movie) => 
                      (
                        <MovieCard movie={movie} key={movie.id}/>
                      )
                )}
                </div>
            )}
        </div>
    );

}

export default Home;