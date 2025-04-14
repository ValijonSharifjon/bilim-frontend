import { createContext, useContext, useEffect, useState } from "react";
import { getToken, setToken, removeToken } from "../utils/storage";
import api from "../features/auth/apiClient.ts";

interface User {
    id: string;
    email: string;
}

interface AuthContextProps {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = getToken();
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const { data } = await api.get("/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(data);
            } catch (error) {
                console.error("Ошибка при получении пользователя:", error);
                removeToken();
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (email: string, password: string) => {
        const { data } = await api.post("/auth/login", { email, password });
        setToken(data.accessToken);
        setUser(data.user);
    };

    const register = async (email: string, password: string) => {
        const { data } = await api.post("/auth/register", { email, password });
        setToken(data.accessToken);
        setUser(data.user);
    };

    const logout = () => {
        removeToken();
        setUser(null);
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext)!;
