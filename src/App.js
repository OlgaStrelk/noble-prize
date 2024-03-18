import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  ListPage,
  CountryPage,
  PersonPage,
  NotFound404,
  LoginPage,
} from "./pages";
import { ProvideAuth } from "./services/auth";
import { ProtectedRouteElement } from "./components/protected-route";

export default function App() {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/list"
            element={
              <ProtectedRouteElement>
                <ListPage />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/list"
            element={
              <ProtectedRouteElement>
                <CountryPage />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/list"
            element={
              <ProtectedRouteElement>
                <PersonPage />
              </ProtectedRouteElement>
            }
          />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
    </ProvideAuth>
  );
}
