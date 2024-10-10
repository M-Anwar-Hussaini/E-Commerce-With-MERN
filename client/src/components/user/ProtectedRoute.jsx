import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from '../layouts/Loader';
import PropTypes from 'prop-types';
const ProtectedRoute = ({ admin, children }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  if (loading) return <Loader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (admin && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node,
  admin: PropTypes.bool,
};

export default ProtectedRoute;
