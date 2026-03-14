import './index.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import NavBar from './components/utils/NavBar';
import { RecipeProvider } from './context/RecipeProvider';
import HomePage from './pages/HomePage';
import MyRecipesPage from './pages/MyRecipesPage';
import RecipePage from './pages/RecipePage';

function Layout() {
  return (
    <div className="min-h-screen bg-bg text-text font-body">
      <NavBar />
      <main className="pt-[73px]">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RecipeProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/loading" element={<HomePage />} />
            <Route path="/recipe" element={<RecipePage />} />
            <Route path="/my-recipes" element={<MyRecipesPage />} />
          </Route>
        </Routes>
      </RecipeProvider>
    </BrowserRouter>
  );
}
