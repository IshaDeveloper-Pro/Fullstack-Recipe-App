import React, { useState, useEffect } from 'react'
import Mealcards from './Mealcards';

const Mainpage = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [msg, setMsg] = useState("");
    const [backendRecipes, setBackendRecipes] = useState([]);

useEffect(() => {
    fetch('https://localhost:7058/api/recipes')
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.text(); 
        })
        .then((text) => {
            const result = text ? JSON.parse(text) : []; 
            const formattedBackendData = result.map(recipe => ({
                idMeal: `backend-${recipe.id}`,
                strMeal: recipe.title,
                strMealThumb: recipe.imageUrl || "https://www.themealdb.com/images/media/meals/1529444830.jpg",
                strInstructions: recipe.instructions,
                isCustom: true
            }));
            setBackendRecipes(formattedBackendData);
            setData(formattedBackendData); 
        })
        .catch((err) => console.log("Error fetching backend recipes:", err));
}, []);

    const handleInput = (event) => {
        setSearch(event.target.value)
    }

  const AppFun = async () => {
    if (search.trim() === "") {
        setData(backendRecipes);
        setMsg("");
        return;
    }

    setMsg("");

    const matchedBackendRecipes = backendRecipes.filter(recipe => 
        recipe.strMeal.toLowerCase().includes(search.toLowerCase())
    );

    let mealDbResults = [];

    try {
        const get = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
        const jsonData = await get.json();
        mealDbResults = jsonData.meals || [];
    } catch (error) {
        console.log("Error fetching from MealDB:", error);
    }

    const combinedResults = [...matchedBackendRecipes, ...mealDbResults];
    
    if (combinedResults.length === 0) {
        setMsg("No recipes found!");
    }
    
    setData(combinedResults);
};

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            AppFun();
        }
    }

    return (
        <>
            <h1 className='head'>FOOD RECIPE APP</h1>
            <div className='container'>
                <div className='searchBar'>
                    <input type='text' placeholder='Enter Dish (e.g. Cake)' onChange={handleInput} onKeyDown={handleKeyDown} />
                    <button onClick={AppFun}>Search</button>
                </div>
                <h4 className='error'>{msg}</h4>
                <div>
                    <Mealcards detail={data}/>
                </div>
            </div>
        </>
    )
}

export default Mainpage;
