import './index.css';
import LeftPanel from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import { RecipeProvider } from './context/RecipeProvider';
import MyRecipesPage from './RecipesPage';
import RecipePage from './pages/RecipePage';
import LoadingPage from './pages/LoadingPage';

function Layout() {
  const isLanding = useLocation().pathname === '/';

  return (
    <div className="min-h-screen bg-bg text-text font-body">
      <NavBar />
      <main className="pt-[73px]">
        {isLanding ? (
          <div className="grid grid-cols-2 min-h-[calc(100vh-73px)]">
            <LeftPanel />
            <RightPanel />
          </div>
        ) : (
          <Outlet />
        )}
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
            <Route path="/" />
            <Route path="/loading" element={<LoadingPage />} />
            <Route path="/recipe" element={<RecipePage />} />
            <Route path="/my-recipes" element={<MyRecipesPage />} />
          </Route>
        </Routes>
      </RecipeProvider>
    </BrowserRouter>
  );
}
