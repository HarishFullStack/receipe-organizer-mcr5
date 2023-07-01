import { v4 as uuid } from "uuid";
import { useContext, useReducer, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { RecipeContext } from "../../context/RecipeContext";

export function Home(){

    const navigate = useNavigate();

    const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
    const {recipes, setRecipes} = useContext(RecipeContext);

    const reducer = (state, action) => {
        switch(action.type){
        case "name":
            return {...state, recipeName: action.value}

        case "type":
            return {...state, cuisineType: action.value}

        case "ingredients":
            return {...state, ingredients: action.value}

        case "instructions":
            return {...state, instructions: action.value}

        case "add":
            console.log(state);
            setRecipes([...recipes, {id: uuid(), recipeName: state.recipeName, cuisineType: state.cuisineType, ingredients: state.ingredients, instructions: state.instructions}])
            return state;

        case "clear":
            return {...state, recipeName: "", cuisineType: "", ingredients: "", instructions: ""}

            default:
            return state;
        }


        }

    const [state, dispatch] = useReducer(reducer, {
        filterType: "",
        searchText: "",
        recipeName: "",
        cuisineType: "",
        ingredients: "",
        instructions: "",
        recipes: []
    })

    const handleDisabled = () => {
        return state.recipeName === "" || state.cuisineType === "" || state.ingredients === "" || state.instructions === "";
    }

    return (
        <div className="row">
        {
            recipes.map((recipe) => {
            return(
                <div key={recipe.id} className="card" style={{width: "18rem"}}>
                    {/* <img src="..." className="card-img-top" alt="..."></img> */}
                    <div className="card-body">
                        <h5 className="card-title">{recipe.recipeName}</h5>
                        <div>
                        <p className="card-text"><b>Cuisine Type: </b><span>{recipe.cuisineType}</span></p>
                        <p className="card-text"><b>Ingredients: </b><span className='cursor-pointer align-self-end' onClick={() => navigate(`/recipe/${recipe.id}`)}>See Recipe <i className="fa fa-chevron-right" aria-hidden="true"></i></span></p>
                        <p className="card-text"><b>Instructions: </b><span className='cursor-pointer align-self-end'>See Recipe <i className="fa fa-chevron-right" aria-hidden="true"></i></span></p>
                        </div>
                    </div>
                </div>
            )
            })
            
        }
        <div className="card cursor-pointer" style={{width: "18rem"}} onClick={() => setShowAddRecipeModal(true)}>
            <div className="card-body">
                <i className="add-button fa fa-plus-circle fa-2x" style={{margin: "auto", opacity: "25%"}} aria-hidden="true" ></i>
            </div>
        </div>

        <Modal show={showAddRecipeModal} onHide={() => setShowAddRecipeModal(false)}  size="lg">
                <Modal.Header>
                    <Modal.Title>
                        Add Receipe
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                    <div className='row col-md-12'>
                        <div className='col-md-6'>
                        <input type='text' className='form-control' id="name" name="name" placeholder='Receipe Name'  onChange={(event) => dispatch({type: "name", value: event.target.value})}/>
                        </div>
                        <div className='col-md-6'>
                        <select className='form-control' onClick={(event) => dispatch({type: "type", value: event.target.value})}>
                            <option value="">Select Cuisine...</option>
                            <option value="Italian">Italian</option>
                            <option value="Chinese">Chinese</option>
                            <option value="American">American</option>
                        </select>
                        </div>
                    </div>
                    <div className='row col-md-12'>
                        <div className='col-md-12'>
                            <textarea  className='form-control' rows={2} id="ingredients" name="ingredients" placeholder='Ingredients' onChange={(event) => dispatch({type: "ingredients", value: event.target.value})}/>
                        </div>
                    </div>
                    <div className='row col-md-12'>
                        <div className='col-md-12'>
                            <textarea  className='form-control' rows={10} id="instructions" name="instructions" placeholder='Cooking Instructions' onChange={(event) => dispatch({type: "instructions", value: event.target.value})}/>
                        </div>
                    </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowAddRecipeModal(false)}>Close</button>
                    <button type="button" className="btn btn-primary" disabled={handleDisabled()} onClick={() => [dispatch({type: "add"}), setShowAddRecipeModal(false), dispatch({type:"clear"})]}>Add</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
    }