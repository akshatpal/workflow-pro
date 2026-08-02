import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate to="/login" />
        }
      />

      <Route
        path="/login"
        element={<h1>Login</h1>}
      />

      <Route
        path="*"
        element={
          <h1>404 Not Found</h1>
        }
      />
    </Routes>
  );
}

export default AppRoutes;