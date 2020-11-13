import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Recipes from "./components/Recipes";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import "./App.css";

function App() {
  const [state, setState] = useState({
    recipes: [],
    search: "",
    query: "",
    status: "",
  });

  const { recipes, search, query, status } = state;

  const updateSearch = (e) => {
    setState((prevState) => ({ ...prevState, search: e.target.value }));
  };

  const getSearch = (e) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      query: search,
      status: "loading",
      search: "",
    }));
  };

  useEffect(() => {
    const getRecipes = async () => {
      const response = await axios.post(
        "https://jk-recipe-app-backend.herokuapp.com/recipes",
        { searchQuery: query }
      );
      setState((prevState) => ({
        ...prevState,
        recipes: response.data.hits,
        status: "idle",
      }));
    };

    if (query !== "") {
      getRecipes();
    }
  }, [query]);

  return (
    <div className="App container">
      <Form onSubmit={getSearch} className="search-form container">
        <Form.Group>
          <Form.Label>Search Recipe</Form.Label>
          <Form.Control
            type="text"
            className="search-bar"
            value={search}
            onChange={updateSearch}
          />
          <Form.Text>Provide an ingredient</Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit" className="search-button">
          Search
        </Button>
      </Form>
      {status === "loading" ? (
        <Spinner
          animation="border"
          variant="info"
          className="loading-spinner"
        />
      ) : (
        <Recipes recipes={recipes} />
      )}

      <p>Made with React and Bootstrap 4 by Jesse Kroon</p>
    </div>
  );
}

export default App;
