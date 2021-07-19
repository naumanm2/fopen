import React, { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommended from "./components/Recommended";

import { useQuery, useMutation, useApolloClient, useSubscription } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, USER, ADD_BOOK } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");

  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log(subscriptionData);
      window.alert(`${addedBook.title} was added to database`)
      updateCacheWith(addedBook)
    },
  });

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      set.map(p => p.id).includes(object.id)

    }
    const dataInStore = client.readQuery({query: ALL_BOOKS})
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: {allBooks: dataInStore.allBooks.concat(addedBook)}
      })
    }
  }

  const [addBook] = useMutation(ADD_BOOK, {
    options: {
      refetchQueries: [{ query: ALL_BOOKS, query: ALL_AUTHORS }],
    },
    onError: (error) => {
      console.log(error);
    },
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_BOOKS });
      store.writeQuery({
        query: ALL_BOOKS,
        data: {
          ...dataInStore,
          allBooks: [...dataInStore.allBooks, response.data.addBook],
        },
      });
    },
  });

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && (
          <div>
            <button onClick={() => setPage("add")}>add</button>
            <button onClick={() => setPage("recommended")}>recommended</button>
            <button onClick={() => logout()}>logout</button>
          </div>
        )}
      </div>
      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <Recommended show={page === "recommended"} />
      <NewBook show={page === "add"} addBook={addBook}/>
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
