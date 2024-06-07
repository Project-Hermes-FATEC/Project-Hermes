import { Navigate, createBrowserRouter, redirect } from "react-router-dom";
import Login from "./pages/login";
import NotFound from "./pages/404";
import Home from "./pages/home";
import About from "./pages/about";
import VerificaProduto from "./pages/sales/product-generate";
import ListaVendas from "./pages/sales/sales-list";
import api from "./pages/helpers/axios";
import ListaUser from "./pages/admin/userControl";
import BeginVerify from "./pages/sales/product-verify/begin-verify";
import EndVerify from "./pages/sales/product-verify/end-verify";

const ProtectedRoutes = async () => {
    let auth;

    await api.get("/auth/verify", { withCredentials: true }).then(() => {
        auth = true;
    }).catch((e) => {
        auth = false;
        console.log(e);
        localStorage.clear();
    });

    return auth ? null : redirect("/");
}

const ProtectedAdminRoutes = async () => {
    let auth = false;

    await api.get("/auth/verify", { withCredentials: true }).then((res) => {
        if (res.data === 'admin') return auth = true;
    }).catch((e) => {
        auth = false;
        console.log(e);
        localStorage.clear();
    });

    return auth ? null : redirect("/home");
}

const router = createBrowserRouter([
    { path: '/', element: <Navigate to='/autenticacao/login' />, errorElement: <NotFound /> },
    { path: '/autenticacao', children: [{ path: 'login', element: <Login /> }, { path: 'logout', }] },
    {
        path: '/admin',
        loader: ProtectedAdminRoutes,
        children: [{ path: 'users', element: <ListaUser /> }]
    },
    {
        path: '/',
        loader: ProtectedRoutes,
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
                { path: 'produto', children: [
                    { path: 'listar', element: <></> },
                ]},
                { path: 'checklist', children: [
                    { path: 'listar', element: <></> }
                ]}
            ]
    },

])

export default router