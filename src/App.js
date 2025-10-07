import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewOfferPage from './pages/NewOfferPage';
import MyOffersPage from './pages/MyOffersPage';
import './config/reset.css';
import './config/styles.css';
import './App.css';
import logo from './config/assets/LogoMilhasPix.png';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <div className='Header-content'>
          <img src={logo} className='App-logo' alt='logo' />
          <button
            onClick={() => console.log('my balance')}
            className='My-balance'
          >
            R$ 283,12
          </button>
        </div>
      </header>
      <Router>
        <Routes>
          <Route path='/' element={<NewOfferPage />} />
          <Route path='/offers' element={<MyOffersPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
