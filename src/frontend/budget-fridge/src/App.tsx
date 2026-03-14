import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/'/>
          <Route path='loading' />
          <Route path='recipe' />
          <Route path='my-recipes' />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
