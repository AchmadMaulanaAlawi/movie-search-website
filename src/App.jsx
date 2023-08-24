import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Details, { detailsLoader } from "./pages/Details.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
    >
      <Route
        index
        element={<Home />}
      />
      <Route
        path=":imdbID"
        loader={detailsLoader}
        element={<Details />}
      />
    </Route>
  )
)

function Root() {
  return (
    <div className="bg-slate-950 bg-gradient-to-br from-black min-h-screen overflow-x-hidden h-full flex flex-col">
      <Outlet />
    </div>
  )
}

function App() {
  return <RouterProvider router={router} />
}

export default App
