import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import { RecipeProvider } from './context/RecipeProvider';
import RecipePage from './pages/RecipePage';

function Layout() {
  return (
    <>
      <NavBar />
      <main className="pt-18.25"> {/* offset for the fixed nav height */}
        <Outlet />
      </main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RecipeProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" />
            <Route path="/loading" />
            <Route path="/recipe" element={<RecipePage />} />
            <Route path="/my-recipes" />
          </Route>
        </Routes>
      </RecipeProvider>
    </BrowserRouter>
  );
}
