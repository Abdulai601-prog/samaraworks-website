import { Navigate, useLocation } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";

type Role = Exclude<UserRole, null>;

export default function ProtectedRoute({
  children,
  allow,
}: {
  children: JSX.Element;
  allow: Role[];
}) {
  const { isAuthenticated, user, hasRole } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (!hasRole(allow)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
