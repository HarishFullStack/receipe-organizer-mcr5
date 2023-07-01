import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { RecipeContext } from "../../context/RecipeContext";

export function Recipe(){

    const recipeId = useParams();
    const {recipes} = useContext(RecipeContext);

    const [recipe, setRecipe] = useState({});

    const getRecipe = () => {
        console.log(recipes);
        console.log(recipeId);
        setRecipe(recipes.find((x) => x.id === recipeId.recipeId));
    }


    useEffect(() => {
        getRecipe();
    }, [])


    return(
        <div className="row d-flex justify-content-center">
            <div className="d-flex justify-content-center"><h4>{recipe.recipeName}</h4></div>

            <div className="card box-shadow" style={{width: "18rem"}}>
            <div className="card-body">
                <p><b>Cuisine: </b>{recipe.cuisineType}</p>
                <p><b>Ingredients: </b>{recipe.ingredients}</p>
                <p><b>Instructions: </b>{recipe.ingredients}</p>
            </div>
        </div>
        </div>
    )
}