import './index.css';
import LeftPanel from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useFridgeItems } from './hooks/useFridgeItems';

function Layout() {
  const { items, addItem, removeItem } = useFridgeItems();
  const isLanding = useLocation().pathname === '/';

  return (
    <div className="min-h-screen bg-bg text-text font-body">
      <NavBar />
      <main className="pt-[73px]">
        {isLanding ? (
          <div className="grid grid-cols-2 min-h-[calc(100vh-73px)]">
            <LeftPanel onAdd={addItem} />
            <RightPanel items={items} onRemove={removeItem} />
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
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" />
          <Route path="/loading" />
          <Route path="/recipe" />
          <Route path="/my-recipes" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}