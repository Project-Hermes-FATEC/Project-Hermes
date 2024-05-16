import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import NotFound from "./pages/404";
import Home from "./pages/home";
import Sobre from "./pages/Sobre";

const router = createBrowserRouter([
    { path: '/', element: <Login />, errorElement: <NotFound /> },
    { path: '/Home', element: <Home />},
    { path: '/Sobre', element: <Sobre/>}
])

export default router