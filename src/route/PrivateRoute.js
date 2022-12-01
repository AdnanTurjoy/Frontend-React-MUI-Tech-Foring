import { Navigate } from "react-router-dom";

function PrivateRoute({ token, children }) {
  console.log(token);
  return !token ? <Navigate to="/login" /> : children;
}

export default PrivateRoute;
