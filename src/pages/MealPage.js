import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import CameraSpinner from "../components/CameraSpinner";

const MealPage = () => {
  const { mealId } = useParams();

  const [meal, setMeal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((response) => {
        setMeal(response.data.meals[0]);
        console.log(response.data.meals[0]);
        ingredientHandler(response.data.meals[0]);
        measurementHandler(response.data.meals[0]);
      });
    setLoading(false);
  }, [mealId]);

  const ingredientHandler = (meal) => {
    let tempIngredientsArr = [];
    for (let i = 1; i < 21; i++) {
      if (meal[`strIngredient${i}`] !== "") {
        tempIngredientsArr.push(meal[`strIngredient${i}`]);
      }
    }
    setIngredients(tempIngredientsArr);
  };

  const measurementHandler = (meal) => {
    let tempMeasurementsArr = [];
    for (let i = 1; i < 21; i++) {
      if (meal[`strMeasure${i}`] !== "") {
        tempMeasurementsArr.push(meal[`strMeasure${i}`]);
      }
    }
    setMeasurements(tempMeasurementsArr);
  };

  return (
    <div>
      <Header />
      {loading ? (
        <CameraSpinner />
      ) : (
        <div>
          <h1>{meal.strMeal}</h1>
          <img src={meal.strMealThumb} alt={meal.strMeal} height={200} />
          <h3>Origin: {meal.strArea}</h3>
          <h3>Category: {meal.strCategory}</h3>

          <details>
            <summary>Ingredients</summary>
            <div>
              <ul>
                {ingredients.map((ingredient) => {
                  return (
                    <li key={ingredient}>
                      <p>Ingredient: {ingredient}</p>
                      <p>
                        Amount: {measurements[ingredients.indexOf(ingredient)]}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </details>
        </div>
      )}
    </div>
  );
};

export default MealPage;
