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
            userId: localStorage.getItem('userId') || ''
        }

        return user;
    }

    function remove() {
        localStorage.clear();
    }

    async function logOut() {
        await api.get("/auth/logout", { withCredentials: true }).then(res => {
            if (res.status === 204) {
                toast({ title: "Você saiu da sua conta", status: "info" });
            }
        }).catch((e) => {
            toast({ title: "Erro ao sair da conta", status: "error" });
        });

        setExpired(false);
        remove();
    }

    async function refresh() {
        await api.post('/refresh', { withCredentials: true }).then(res => {
            if (res.status == 200) {
                toast({})
            }
        })
    }

    function setTokenExpired() {
        setExpired(!isExpired);
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