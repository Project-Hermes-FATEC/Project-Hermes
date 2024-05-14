import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import NotFound from "./pages/404";
import Home from "./pages/home";

const router = createBrowserRouter([
    { path: '/', element: <Login />, errorElement: <NotFound /> },
    { path: '/Home', element: <Home />, errorElement: <NotFound />}
])

export default router