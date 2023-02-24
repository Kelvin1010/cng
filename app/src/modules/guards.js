import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const useAuth = () => {
  const currentUser = JSON.parse(localStorage.getItem('usk')); //useSelector(state => state.auth.currentUser)
  return currentUser ? currentUser.token : null;
}

const ProtectedRoute = ({ children }) => {
  const token = useAuth();
  const currentUser = useSelector(state => state.auth.currentUser);
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
