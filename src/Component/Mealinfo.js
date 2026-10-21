import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

const Mealinfo = () => {
    const { mealid } = useParams();
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getInfo = async () => {
            setLoading(true);
            try {
                if (mealid && mealid.startsWith('backend-')) {
                    const actualId = mealid.replace('backend-', '');
                    
                    // Local Backend se single recipe fetch
                    const response = await fetch(`https://localhost:7058/api/recipes/${actualId}`);
                    
                    if (!response.ok) {
                        throw new Error("Backend response not ok");
                    }
                    
                    const recipe = await response.json();
                    
                    setInfo({
                        strMeal: recipe.title,
                        strMealThumb: recipe.imageUrl || "https://www.themealdb.com/images/media/meals/1529444830.jpg",
                        strInstructions: recipe.instructions
                    });
                } else if (mealid) {
                    // TheMealDB API se fetch
                    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`);
                    const jsonData = await response.json();
                    if (jsonData.meals && jsonData.meals.length > 0) {
                        setInfo(jsonData.meals[0]);
                    } else {
                        setInfo(null);
                    }
                }
            } catch (error) {
                console.log("Error fetching recipe details:", error);
                setInfo(null);
            } finally {
                setLoading(false);
            }
        };

        if (mealid) {
            getInfo();
        }
    }, [mealid]);

    if (loading) {
        return <h2>Loading Recipe Details...</h2>;
    }

    return (
        <div>
            {!info ? (
                <div>
                    <h2>Data Not Found</h2>
                    <NavLink to="/"><button className='backBtn'>Go Back</button></NavLink>
                </div>
            ) : (
                <div className='mealInfo'>
                    <img src={info.strMealThumb} alt={info.strMeal}/>
                    <div className='info'>
                        <h1>Recipe Details</h1>
                        <button className='dishBtn'>{info.strMeal}</button>
                        <h3>Instructions</h3>
                        <p>{info.strInstructions}</p>
                        
                        <div className='bottomBtnContainer'>
                            <NavLink to="/">
                                <button className='backBtn'>Go Back</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Mealinfo;