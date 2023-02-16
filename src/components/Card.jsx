import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Card() {
  const [toggle, setToggle] = useState(true);
  const [cards, setCards] = useState(JSON.parse(localStorage.getItem('cards')));
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();

  useEffect(() => {
    let id = document.location.href.split('/card/').pop();
    let card = cards.find((card) => card.id === id);
    setQuestion(card['question']);
    setAnswer(card['answer']);
  }, [JSON.parse(localStorage.getItem('cards'))]);

  return (
    <div className='card'>
      {toggle ? <div className='text'>{question}</div> : <div className='text'>{answer}</div>}
      <button onClick={() => setToggle(!toggle)}>Answer</button>
      <Link to={'/allcards'}>Return</Link>
    </div>
  );
}
