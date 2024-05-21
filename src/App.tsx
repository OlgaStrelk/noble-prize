import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CountryPage, HomePage, LoginPage, PersonPage, ListPage, NotFound404 } from './pages';
import {ProtectedRouteElement} from "./components/protected-route";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRouteElement element={<HomePage />}/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/list" element={<ProtectedRouteElement element={<ListPage />}/>} />
          <Route path="/list/:country" element={<ProtectedRouteElement element={<CountryPage />}/>} />
          <Route path="/list/:country/:personId" element={<ProtectedRouteElement element={<PersonPage />}/>} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
  );
}