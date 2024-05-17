import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import NotFound from "./pages/404";
import Home from "./pages/home";
import Sobre from "./pages/Sobre";
import VerificaProduto from "./pages/sales/product-verify";
import ListaVendas from "./pages/sales/sales-list";

const router = createBrowserRouter([
    { path: '/', element: <Navigate to='/login' />, errorElement: <NotFound />},
    { path: '/login', element: <Login />},
    { path: '/home' , element: <Home />},
    { path: '/sobre', element: <Sobre />},
    { path: '/produto', children:[{ path: 'verificarEntrada', element: <VerificaProduto /> }, { path: 'listaVendas', element: <ListaVendas/> }] }
])

export default router