import { useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import CameraSpinner from "./components/CameraSpinner";
import { Link } from "react-router-dom";

function App() {
  const [menuSearch, setMenuSearch] = useState("");
  const [searched, setSearched] = useState(false);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();

    setMenuSearch(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    await axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${menuSearch}`)
      .then((response) => {
        console.log(response.data.meals);
        setMeals(response.data.meals);
      })
      .catch((error) => {
        console.log(error);
      });

    if (searched === false) {
      setSearched(true);
    }
    setLoading(false);
    setMenuSearch("");
  };

  return (
    <div>
      <Header />
      <form onSubmit={submitHandler}>
        <div>
          <label>Search the menu!: </label>
          <input
            type="text"
            name="menuSearch"
            onChange={handleChange}
            value={menuSearch}
          ></input>
        </div>
        <div>
          <input type="submit"></input>
        </div>
      </form>

      {loading ? (
        <div>
          <CameraSpinner />
        </div>
      ) : (
        <div></div>
      )}

      {searched ? (
        <div>
          {meals.map((meal) => {
            return (
              <Link to={`/meals/${meal.idMeal}`}>
                <div key={meal.idMeal}>
                  <p>{meal.strMeal}</p>
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    height={200}
                  ></img>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
