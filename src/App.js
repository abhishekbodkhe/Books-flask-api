import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    // State variables
    const [books, setBooks] = useState([]); // State to store books
    const [genres, setGenres] = useState([]); // State to store available genres
    const [currentGenre, setCurrentGenre] = useState('all'); // State to track selected genre

    // Function to fetch all books
    const fetchAllBooks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/books');
            setBooks(response.data.books);
        } catch (error) {
            console.error('Error fetching all books:', error);
        }
    };

    // Function to fetch books by a specific genre
    const fetchBooksByGenre = async (genre) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/books/genre/${genre}`);
            setBooks(response.data.books);
        } catch (error) {
            console.error(`Error fetching books by genre ${genre}:`, error);
        }
    };

    // Function to fetch available genres
    const fetchGenres = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/genres');
            setGenres(response.data.genres);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    // Effect to fetch genres and all books when the component mounts
    useEffect(() => {
        fetchGenres();
        fetchAllBooks();
    }, []);

    // Effect to fetch books based on the selected genre
    useEffect(() => {
        if (currentGenre === 'all') {
            fetchAllBooks();
        } else {
            fetchBooksByGenre(currentGenre);
        }
    }, [currentGenre]);

    // Handle genre selection change
    const handleGenreChange = (event) => {
        setCurrentGenre(event.target.value);
    };

    return (
        <div className="App">
            <h1>Books</h1>

            {/* Dropdown menu to select a genre */}
            <label htmlFor="genre-select">Select Genre: </label>
            <select id="genre-select" onChange={handleGenreChange} value={currentGenre}>
                {/* Option for viewing all genres */}
                <option value="all">All Genres</option>
                {/* Display options for each available genre */}
                {genres.map((genre) => (
                    <option key={genre} value={genre}>{genre}</option>
                ))}
            </select>

            {/* Render the list of books based on selected genre */}
            <ul>
                {books.map((book) => (
                    <li key={book.id} className="book">
                        <h3>{book.title}</h3>
                        <p>Author: {book.author}</p>
                        <p>Genre: {book.genre}</p>
                        <p>Price: ${book.price.toFixed(2)}</p>
                        <p>{book.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
