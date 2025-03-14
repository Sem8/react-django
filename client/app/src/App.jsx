import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/");
      const data = await response.json();
      // console.log(data)
      setBooks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addBook = async () => {
    const bookData = {
      title,
      release_year: releaseYear
    }

    try {
      const respponse = await fetch('http://127.0.0.1:8000/api/books/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData)
      });
      const data = await respponse.json();     
      // console.log(data); 
      setBooks(prev => [...prev, data])
    } catch (err) {
      console.error(err)
      
    }

  }

  return (
    <>
      <h1>Book Website</h1>
      <div>
        <input type="text" placeholder="Book Title...." onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Release date...." onChange={(e) => setReleaseYear(e.target.value)} />
        <button onClick={addBook}>Add Book</button>
      </div>
      {books.map((book) => (
        <div key={book.id}>
          <p>Title: {book.title}</p>
          <p>Release Year: {book.release_year} </p>
          <input type="text" placeholder="New Title..." />
          <button> Change Title</button>
        </div>
      ))}
    </>
  );
}

export default App;
