import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { isLoggedIn } = useAuthStore();

    return isLoggedIn ? children : <Navigate to="/auth" replace />;
}