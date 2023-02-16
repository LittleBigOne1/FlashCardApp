import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AllCards() {
  const [cards, setCards] = useState(JSON.parse(localStorage.getItem('cards')));
  const navigate = useNavigate();
  // console.log(cards);
  return (
    <div className='createcard'>
      <Link to={'/createcard'}>Create a card</Link>
      {cards !== null ?
        cards.map((card) => {
          return (
            <div
              className="cards"
              onClick={() => navigate(`/card/${card['id']}`)}
            >
              <div>{card['question']}</div>
            </div>
          );
        }): <div>Create your first card !</div>}
    </div>
  );
}
