import './App.css';
import {Routes, Route} from "react-router-dom";
import { Home } from './pages/Home/Home';
import { Recipe } from './pages/Recipe/Recipe';

function App() {
return(
  <div className='App'>
    <Routes>
      <Route path="/" element={<Home/>}>Home</Route>
      <Route path="/recipe/:recipeId" element={<Recipe/>}>Home</Route>

    </Routes>
  </div>)
}

export default App;
