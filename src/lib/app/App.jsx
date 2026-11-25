import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './Auth.jsx';

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<Auth />} />
    </Routes>
  </Router>
);

export default App;