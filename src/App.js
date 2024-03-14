import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, ListPage, CountryPage } from './pages';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/list/:country" element={<CountryPage />} />
      </Routes>
    </BrowserRouter>
  );
}