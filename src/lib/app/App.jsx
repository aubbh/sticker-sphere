import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './Auth.jsx';
import InventoryPage from './pages/InventoryPage.jsx';

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<Auth />} />
      <Route exact path="inventory" element={<InventoryPage />} />
    </Routes>
  </Router>
);

export default App;