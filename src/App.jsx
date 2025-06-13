import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import CityList from "./components/CityList";
import CountyList from "./components/CountyList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import { CitiesProvider } from "./contexts/CitesContexts";
import { AuthProvider } from "./contexts/FakeAuthContext";
// import Homepage from "./pages/Homepage";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayuot from "./pages/AppLayuot";
// import Login from "./pages/Login";
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayuot = lazy(() => import("./pages/AppLayuot"));
const Login = lazy(() => import("./pages/Login"));
function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />}></Route>
              <Route path="/product" element={<Product />}></Route>
              <Route path="/pricing" element={<Pricing />}></Route>
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppLayuot />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountyList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
