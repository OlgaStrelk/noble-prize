import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, ListPage, CountryPage, PersonPage, NotFound404, LoginPage } from './pages';
import {ProtectedRouteElement} from "./components/protected-route";
import {ProvideAuth} from "./services/auth";

export default function App() {
  return (
    <ProvideAuth>
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
    </ProvideAuth>
  );
}