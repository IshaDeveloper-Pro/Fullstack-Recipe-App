import React from 'react';
import { NavLink } from 'react-router-dom';

const Mealcards = ({ detail }) => {
  console.log(detail);
  return (
    <div className='meals'>
      {!detail ? "" : detail.map((curItem) => {
        const itemId = curItem.id || curItem.idMeal;
        const itemTitle = curItem.title || curItem.strMeal;
        const itemImage = curItem.imageUrl || curItem.strMealThumb;

        return (
          <div className='mealImg' key={itemId}>
            <img src={itemImage} alt={itemTitle} />
            <p>{itemTitle}</p>
            <NavLink to={`/${itemId}`}><button>Recipe</button></NavLink>
          </div>
        );
      })}
    </div>
  );
}

export default Mealcards;
