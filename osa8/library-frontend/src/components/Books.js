import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const initBooks = useQuery(ALL_BOOKS);
  const [filterBooks, setFilterBooks] = useLazyQuery(ALL_BOOKS);
  const [genres, setGenres] = useState([]);
  const [filter, setFilter] = useState(null);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (initBooks.data) {
      setBooks(initBooks.data.allBooks);
      initBooks.data.allBooks.map((book) =>
        setGenres((g) =>
          g.concat(book.genres).filter((v, i, a) => a.indexOf(v) === i)
        )
      );
    }
  }, [initBooks]);

  const filteredBooks = (filter) => {
    filterBooks({
      variables: { genre: filter },
    });
  };

  useEffect(() => {
    if (setFilterBooks.data) {
      setBooks(setFilterBooks.data.allBooks);
    }
  }, [setFilterBooks]);

  let msg = "";
  if (!props.show) {
    return null;
  }

  if (books.loading) {
    return <div>loading...</div>;
  }

  // books = books.filter(x => x.genres.indexOf(props.filter)>-1)

  return (
    <div>
      <h2>books</h2>
      <h3>books by genre {filter}</h3>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => {
            filteredBooks(`${genre}`);
            setFilter(`${genre}`);
          }}
        >
          {genre}
        </button>
      ))}
      <button
        onClick={() => {
          filteredBooks(null);
          setFilter(null);
        }}
      >
        all books
      </button>
    </div>
  );
};

export default Books;
