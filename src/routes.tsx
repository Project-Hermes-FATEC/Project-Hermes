import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import NotFound from "./pages/404";
import Home from "./pages/home";
import About from "./pages/about/us";
import VerificaProduto from "./pages/sales/product-generate";
import ListaVendas from "./pages/sales/sales-list";
import ListaUser from "./pages/admin/userControl";
import BeginVerify from "./pages/sales/product-verify/begin-verify";
import EndVerify from "./pages/sales/product-verify/end-verify";
import Produto from "./pages/product";
import { useAuth } from "./hooks/authProvider";
import Checklist from "./pages/checklist";
import Mission from "./pages/about/mission";
import api from "./pages/helpers/axios";
import ChangePass from "./pages/user/changePass";

function ProtectedRoutes() {
    const auth = useAuth();

    api.interceptors.response.use(
        response => response,
        error => {
            if (!error.response.data.error.match('inválida') && error.response && [401, 403].includes(error.response.status)) {
                console.log('Não autenticado', error);
                auth?.setTokenEx();
            } else {
                if(error.response) return Promise.reject(error);
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
                { path: 'user', children: [ 
                    { path: 'changePass', element: <ChangePass /> }
                 ]},
                { path: 'home', element: <Home /> },
                { path: 'sobre', element: <About /> },
                { path: 'missao', element: <Mission /> },
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