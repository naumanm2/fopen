import React, { useEffect, useState } from "react";

import { useQuery, useLazyQuery } from "@apollo/client";
import { USER, ALL_BOOKS } from "../queries";

const Recommended = ({ show }) => {
  const [getUser, user] = useLazyQuery(USER);
  const [setFBooks, fBooks] = useLazyQuery(ALL_BOOKS);
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    if (show) {
      getUser();
    }
  }, [getUser, show]);

  console.log(fBooks);

  useEffect(() => {
    if (user.data) {
      setFilter(user.data.me.favoriteGenre);
    }
  }, [user]);

  useEffect(() => {
    if (filter) {
      setFBooks({ variables: { genre: filter } });
    }
  }, [setFBooks, filter]);

  useEffect(() => {
    if (fBooks.data) {
      setBooks(fBooks.data.allBooks);
    }
  }, [fBooks]);

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>
      <h3>books by your favourite genre</h3>
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
    </div>
  );
};

export default Recommended;
