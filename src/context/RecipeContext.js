import { createContext, useState } from "react";

export const RecipeContext = createContext();

export function RecipeProvider({children}){

    const [recipes, setRecipes] = useState([]); 

    return(
        <RecipeContext.Provider value={{recipes, setRecipes}}>
            {children}
        </RecipeContext.Provider>
    )
}