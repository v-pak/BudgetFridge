import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

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