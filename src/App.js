import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import axios from "axios";
import Recipe from "./components/Recipe";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  useEffect(() => {
    const getRecipes = async () => {
      const response = await axios.post(
        "https://jk-recipe-app-backend.herokuapp.com/recipes",
        { searchQuery: query }
      );

      setRecipes(response.data.hits);
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

      <div className="content container">
        <div className="row d-flex justify-content-center">
          {recipes.map((recipe) => (
            <Recipe
              key={"recipe-" + nanoid()}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              img={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))}
        </div>
        <p>Made with React and Bootstrap 4 by Jesse Kroon</p>
      </div>
    </div>
  );
}

export default App;
