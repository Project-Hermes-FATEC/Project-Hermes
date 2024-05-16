import { createBrowserRouter, redirect} from "react-router-dom";
import Login from "./pages/login";
import NotFound from "./pages/404";
import Home from "./pages/home";
import Sobre from "./pages/Sobre";
import VerificaProduto from "./pages/product-verify";

const router = createBrowserRouter([
    { path: '/', errorElement: <NotFound />},
    { path: '/login', element: <Login />},
    { path: '/home' ,element: <Home />},
    { path: '/sobre', element: <Sobre />},
    { path: '/produto', children:[{ path: 'verificarEntrada', element: <VerificaProduto /> }] }
])

export default router