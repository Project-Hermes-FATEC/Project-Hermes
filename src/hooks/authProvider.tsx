import { ReactNode, createContext, useContext, useState } from "react";
import toastHandle from "../components/toast";
import api from "../pages/helpers/axios";

interface Props {
    children: ReactNode
}

interface AuthUser {
    name: string
    email: string
    type: string
    userId: string
    profile: string
}

interface AuthProps {
    setTokenEx(): void
    isExpired: boolean
    refreshToken(): void
    saveUser(data: AuthUser): void
    getUser(): AuthUser | undefined
    removeUser(): void
    logOut(): void
}

const AuthContext = createContext<AuthProps | null>(null);

function AuthProvider({ children }: Props) {
    const [isExpired, setExpired] = useState(false);
    const toast = toastHandle();

    function save(data: AuthUser) {
        localStorage.setItem('email', data.email)
        localStorage.setItem('name', data.name)
        localStorage.setItem('type', data.type)
        localStorage.setItem('userId', data.userId)
    }

    function get() {
        if (!localStorage.getItem('email') || !localStorage.getItem('name') || !localStorage.getItem('type') || !localStorage.getItem('userId')) return undefined;

        const user: AuthUser = {
            name: localStorage.getItem('name') || '',
            email: localStorage.getItem('email') || '',
            type: localStorage.getItem('type') || '',
            userId: localStorage.getItem('userId') || '',
            profile: localStorage.getItem('profile') || ''
        }

        return user;
    }

    function remove() {
        localStorage.clear();
    }

    async function logOut() {
        setExpired(false);

        await api.get("/auth/logout", { withCredentials: true }).then(res => {
            if (res.status === 204) {
                toast({ title: "Você saiu da sua conta", status: "info" });
            }
        }).catch((e) => {
            toast({ title: "Você saiu da sua conta", status: "info" });
            console.log(e);
        });

        remove();
    }

    async function refresh() {
        await api.get('/auth/refresh', { withCredentials: true }).then(res => {
            if (res.status == 200) {
                toast({title: 'Autentição renovada', status: 'info'});
                setTokenExpired();
                window.location.reload();
            }
        }).catch(e => {
            toast({title: 'Problema ao renovar autenticação', status: 'error'});
            console.log(e);
        })
    }

    async function setTokenExpired() {
        await setExpired(!isExpired);
    }

    return (
        <AuthContext.Provider value={{
            setTokenEx: setTokenExpired,
            isExpired: isExpired,
            refreshToken: refresh,
            saveUser: save,
            getUser: get,
            removeUser: remove,
            logOut: logOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export function useAuth() {
    return useContext(AuthContext);
}