import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CardPage from './pages/CardPage'; 
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="shop/:productKey" element={<CardPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path='/about' element={<AboutPage />}/>
      </Route>
    </Routes>
  );
}


export default App;
