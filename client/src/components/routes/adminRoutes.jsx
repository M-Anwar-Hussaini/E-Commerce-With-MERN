import { Route } from "react-router-dom";
import ProtectedRoute from "../user/ProtectedRoute";
import Dashboard from "../admin/Dashboard";
import ListProducts from "../admin/ListProducts";

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
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute admin={true}>
            <ListProducts />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default adminROutes;
