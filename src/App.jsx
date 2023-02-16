import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AllCards from './components/AllCards';
import CreateCard from './components/CreateCard';
import Card from './components/Card';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AllCards />} />
        <Route path="/allcards" element={<AllCards />} />
        <Route path="/card/:id" element={<Card />} />
        <Route path="/createcard" element={<CreateCard />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
