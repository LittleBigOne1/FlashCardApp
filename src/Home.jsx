import { useState } from 'react';
import './App.css';
import Card from './components/Card';
import CreateCard from './components/CreateCard';

function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <CreateCard />
      <Card />
    </div>
  );
}

export default Home;
