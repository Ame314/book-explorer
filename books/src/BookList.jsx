import React, { useState, useEffect } from 'react';
import './BookList.css'; // Importing CSS for styling
import axios from 'axios';

// BookList component to fetch and display a list of books from Open Library API
const BookList = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

// Fetch books from Open Library API when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          'https://openlibrary.org/search.json?q=*&limit=99'
        );
        setBooks(response.data.docs);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

// Render the book list or loading/error messages
  return (
    <div className="container">
      <h1 className="title">Book Explorer</h1>
      {isLoading && !isError && <p className="info">Loading...</p>}
      {!isLoading && isError && (
        <p className="error"> Error: Could not fetch books.</p>
      )}
      {!isLoading && !isError && (
        <div className="grid">
          {books.map((book) => (
            <div key={book.key} className="card">
              {book.cover_i ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                  className="image"
                />
              ) : (
                <div className="noImage">No Image</div>
              )}
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author_name?.join(', ') || 'Unknown'}</p>
              <p><strong>First Published:</strong> {book.first_publish_year || 'Unknown'}</p>
              <p><strong>Languages:</strong> {book.language?.join(', ') || 'N/A'}</p>
              <p><strong>Editions:</strong> {book.edition_count || 1}</p>
              <p><strong>Ebook Access:</strong> {book.ebook_access || 'N/A'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
