import { Navigate, Outlet, createBrowserRouter, useNavigate } from "react-router-dom";
import Login from "./pages/login";
import NotFound from "./pages/404";
import Home from "./pages/home";
import About from "./pages/about";
import VerificaProduto from "./pages/sales/product-generate";
import ListaVendas from "./pages/sales/sales-list";
import ListaUser from "./pages/admin/userControl";
import BeginVerify from "./pages/sales/product-verify/begin-verify";
import EndVerify from "./pages/sales/product-verify/end-verify";
import Produto from "./pages/product";
import { useAuth } from "./hooks/authProvider";
import Checklist from "./pages/checklist";
import api from "./pages/helpers/axios";

function ProtectedRoutes() {
    const auth = useAuth();

    api.interceptors.response.use(
        function (response) {
            return response;
        }, function (error) {
            if (error.response.status == 401) {
                console.log('Não autenticado', error);
                auth?.setTokenEx();
            } else if (error.data.error.match('Token inválido')) {
                localStorage.clear();
                window.location.href = '/'
            }
        });

    return auth?.getUser() == undefined ? <Navigate to={'autenticacao/login'} /> : <Outlet />;

}

function ProtectedAdminRoutes() {
    const auth = useAuth();

    if (!auth) return <Navigate to={'autenticacao/login'} />;

    const type = auth.getUser()?.type;

    return type == 'admin' ? <Outlet /> : <Navigate to={'/home'} />;
}

const router = createBrowserRouter([
    { path: '/', element: <Navigate to='/autenticacao/login' />, errorElement: <NotFound /> },
    { path: '/autenticacao', children: [{ path: 'login', element: <Login /> }] },
    {
        path: '/admin',
        element: <ProtectedAdminRoutes />,
        children: [{ path: 'users', element: <ListaUser /> }]
    },
    {
        element: <ProtectedRoutes />,
        children:
            [
                { path: 'home', element: <Home /> },
                { path: 'sobre', element: <About /> },
                {
                    path: 'vendas', children: [
                        { path: 'cadastrar', element: <VerificaProduto /> },
                        { path: 'listar', element: <ListaVendas /> },
                        {
                            path: 'verificar', element: <ListaVendas />, children: [
                                { path: 'saida', element: <BeginVerify /> },
                                { path: 'chegada', element: <EndVerify /> }]
                        }]
                },
                {
                    path: 'produto', children: [
                        { path: 'listar', element: <Produto /> },
                    ]
                },
                {
                    path: 'checklist', children: [
                        { path: 'listar', element: <Checklist></Checklist> }
                    ]
                }
            ]
    },

])

export default router;