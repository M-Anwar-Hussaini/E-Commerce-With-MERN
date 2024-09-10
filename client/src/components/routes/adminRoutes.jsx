import { Route } from "react-router-dom";
import ProtectedRoute from "../user/ProtectedRoute";
import Dashboard from "../admin/Dashboard";

const adminROutes = () => {
  return (
    <>
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute admin={true}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default adminROutes;
