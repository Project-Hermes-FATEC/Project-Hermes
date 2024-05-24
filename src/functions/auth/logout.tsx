import api from "../../pages/helpers/axios";

export function handleLogout() {
    localStorage.clear();

    api.get("/auth/logout", { withCredentials: true }).then((res) => {
        if (res.status === 204) {
            window.location.assign('/')
            
        }
    }).catch(() => {
        window.location.assign('/')

    });
}