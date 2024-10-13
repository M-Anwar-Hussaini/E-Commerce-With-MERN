import { useEffect, useState } from 'react';
import MetaData from '../layouts/MetaData';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../redux/api/userApi';
import Loader from '../layouts/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import AdminLayout from '../layouts/AdminLayout';

export default function UpdateUser() {
  const { id } = useParams();

  const navigate = useNavigate();
  const {
    data,
    isLoading: userLoading,
    error: userError,
  } = useGetUserDetailsQuery(id);
  const [user, setUser] = useState({ name: '', email: '', role: '' });
  const [updateUser, { isSuccess, error, isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (data?.user) {
      const { name, email, role } = data.user;
      setUser({ name, email, role });
    }
    if (userError) {
      toast.error(userError?.data?.message);
    }
  }, [data, userError]);

  useEffect(() => {
    if (isSuccess) {
      navigate('/admin/users');
      toast.success('User updated successfully');
    }
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, error]);

  const handleUpdateUser = (e) => {
    e.preventDefault();
    updateUser({ id, body: user });
  };
  const hanldeChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  if (isLoading || userLoading) {
    return <Loader />;
  }
  return (
    <AdminLayout>
      <MetaData title="Update User" />
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form className="shadow-lg" onSubmit={handleUpdateUser}>
            <h2 className="mb-4">Update User</h2>

            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={user?.name}
                onChange={hanldeChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email_field" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={user?.email}
                onChange={hanldeChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="role_field" className="form-label">
                Role
              </label>
              <select
                id="role_field"
                className="form-select"
                value={user?.role}
                onChange={hanldeChange}
                name="role"
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>

            <button type="submit" className="btn update-btn w-100 py-2">
              Update
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
