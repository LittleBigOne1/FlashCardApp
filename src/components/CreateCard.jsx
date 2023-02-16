import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function CreateCard() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const Qref = useRef();
  const Aref = useRef();

  const navigate = useNavigate();
  const handleQuestionChange = () => {
    setQuestion(Qref.current.value);
  };

  const handleAnswerChange = () => {
    setAnswer(Aref.current.value);
  };
  const handleForm = (e) => {
    e.preventDefault();
    if (Qref.current.value !== '' && Aref.current.value !== '') {
      setQuestion(Qref.current.value);
      setAnswer(Aref.current.value);
      let newCard = { id: uuidv4(), question: question, answer: answer };
      let cards;
      if (localStorage.getItem('cards') !== null) {
        cards = JSON.parse(localStorage.getItem('cards'));
      } else {
        cards = [];
      }
      cards.push(newCard);
      localStorage.setItem('cards', JSON.stringify(cards));
      navigate('/allcards');
    }
  };
  return (
    <div className="new-card">
      <h3>New card</h3>
      <form onSubmit={handleForm}>
        <label htmlFor="question">Question</label>
        <input
          type="text"
          name="question"
          ref={Qref}
          id="question"
          onChange={handleQuestionChange}
        />
        <label htmlFor="answer">Answer</label>
        <input
          type="text"
          name="answer"
          ref={Aref}
          id="answer"
          onChange={handleAnswerChange}
        />
        <button type="submit">Add</button>
      </form>
      <Link to={'/allcards'} aria-label="Return to all cards">
        Return
      </Link>
    </div>
  );
}
