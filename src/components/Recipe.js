import { nanoid } from "nanoid";
import React from "react";
import Card from "react-bootstrap/Card";

const Recipe = ({ title, calories, img, ingredients }) => {
  return (
    <div className="recipe col-lg-4 col-xl-4 col-md-5 col-sm-12">
      <Card className="recipe-card w-100 bg-dark text-white h-100">
        <Card.Img src={img} className="recipe-image" />
        <div className="recipe-text">
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>Calories: {calories}</Card.Text>
            <ul
              style={{ listStyleType: "square" }}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              {ingredients.map((ingredient) => (
                <li key={"ingredient-" + nanoid()}>{ingredient.text}</li>
              ))}
            </ul>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default Recipe;
