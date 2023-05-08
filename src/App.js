import { Container } from '@mui/material';
import './App.css';
import ButtonAppBar from './components/navigation/Navbar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Projets from './components/Projets';
import Home from './components/Home';
import Devs from './components/Devs';
import DetailsProjet from './components/DetailsProjet';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Container>
        <ButtonAppBar />
      </Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projets" element={<Projets />} />
        <Route path="/devs" element={<Devs />} />
        <Route path="/detailsProjet" element={<DetailsProjet />} />
      </Routes>
    </Router>
  );
}

export default App;
