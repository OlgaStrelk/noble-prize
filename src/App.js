import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, ListPage, CountryPage, PersonPage, NotFound404, LoginPage } from './pages';
import {ProvideAuth} from "./services/auth";

export default function App() {
  return (
    <ProvideAuth>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/list/:country" element={<CountryPage />} />
        <Route path="/list/:country/:personId" element={<PersonPage />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
    </ProvideAuth>
  );
}