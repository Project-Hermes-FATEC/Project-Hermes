import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import NotFound from "./pages/404";

const router = createBrowserRouter([
    { path: '/', element: <Login />, errorElement: <NotFound /> }
])

export default router