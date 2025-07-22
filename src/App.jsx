import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CardPage from './pages/CardPage'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="shop/:productKey" element={<CardPage />} /> {/* صفحه محصول */}
      </Route>
    </Routes>
  );
}

export default App;
