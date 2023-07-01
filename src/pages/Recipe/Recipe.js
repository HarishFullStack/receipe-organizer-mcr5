import { useParams } from "react-router";


export function Recipe(){

    const recipeId = useParams();

    return(
        <div>This is recipe {recipeId}</div>
    )
}