import Recipe from "./Recipe";
import { nanoid } from "nanoid";

const Recipes = ({ recipes }) => {
  return (
    <div className="content container">
      <div className="row d-flex justify-content-center">
        {recipes.map((recipe) => (
          <Recipe
            key={"recipe-" + nanoid()}
            title={recipe.recipe.label}
            calories={Math.round(recipe.recipe.calories)}
            img={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
