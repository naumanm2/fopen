import React, { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommended from './components/Recommended'

import { useQuery, useApolloClient, useLazyQuery } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, USER } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");

  const client = useApolloClient();

  const authors = useQuery(ALL_AUTHORS);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button
          onClick={() => {
            setPage("books");
          }}
        >
          books
        </button>
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && <button onClick={() => setPage("add")}>add</button>}
        {token && (
          <button
            onClick={() => {
              setPage("recommended");
            }}
          >
            recommended
          </button>
        )}
        {token && <button onClick={() => logout()}>logout</button>}
      </div>
      <Authors show={page === "authors"} authors={authors} />
      <Books show={page === "books"} />
      <Recommended show={page === "recommended"} />
      <NewBook show={page === "add"} />
      <LoginForm
        show={page === "login"}
        setPage={setPage}
        setError={setError}
        setToken={setToken}
      />
    </div>
  );
};

export default App;
